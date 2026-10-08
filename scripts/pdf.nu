#!/usr/bin/env nu
# Prints each locale's page of the built site (dist/) to dist/rirekisho-<locale>.pdf with Chromium,
# so the PDF is the web page itself (its @media print rules), not a second layout to maintain.
#
#   pnpm build && pnpm pdf
#
# Chromium's own command-line printing, no Playwright: $CHROMIUM_PATH, Chromium's headless shell
# from the Nix dev shell (the full browser never returns from --print-to-pdf on macOS). The pages
# are served over HTTP rather than opened as files: their links are absolute (/_astro/…, under
# RIREKISHO_BASE).

def chromium []: nothing -> string {
  if ($env.CHROMIUM_PATH? | is-empty) {
    error make { msg: "no Chromium: set CHROMIUM_PATH (the Nix dev shell does)" }
  }
  $env.CHROMIUM_PATH
}

# A directory where dist/ sits under the base path, so the server answers like the real host.
# A copy rather than a symlink: the cleanup then never risks reaching into dist/ itself.
def site-root [dist: path, base: string]: nothing -> path {
  let segments = $base | split row "/" | where { is-not-empty }
  if ($segments | is-empty) { return $dist }
  let root = mktemp --directory
  let target = [$root ...$segments] | path join
  mkdir ($target | path dirname)
  cp --recursive $dist $target
  $root
}

# One page to one PDF, given two minutes: a Chromium that hangs fails the build instead of holding
# the CI runner forever. --virtual-time-budget lets fonts and images finish loading first.
def print-page [browser: string, profile: path, url: string, out: path] {
  let id = job spawn {
    (^$browser --disable-gpu --no-sandbox --no-pdf-header-footer $"--user-data-dir=($profile)"
      --virtual-time-budget=10000 $"--print-to-pdf=($out)" $url o+e> /dev/null)
  }
  for _ in 1..1200 {
    if not (job list | any { |j| $j.id == $id }) { return }
    sleep 100ms
  }
  job kill $id
  error make { msg: $"($url): Chromium did not finish within two minutes" }
}

def main [dist: path = "dist"] {
  let dist = $dist | path expand
  let base = ($env.RIREKISHO_BASE? | default "/") | str replace --regex '/?$' '/'
  let locales = $env.RIREKISHO_LOCALES? | default "fr,en" | split row "," | where { is-not-empty }
  let browser = chromium
  let root = site-root $dist $base
  let port = port
  let origin = $"http://127.0.0.1:($port)"
  # Throwaway profile: nothing written to $HOME, which the CI sandbox keeps read-only.
  let profile = mktemp --directory

  let server = job spawn {
    ^caddy file-server --root $root --listen $"127.0.0.1:($port)" --no-compress o+e> /dev/null
  }

  let result = try {
    for _ in 1..50 {
      if (try { http get --full $"($origin)($base)" | get status } catch { 0 }) != 0 { break }
      sleep 100ms
    }
    for locale in $locales {
      let url = $"($origin)($base)($locale)/"
      let status = try { http get --full --allow-errors $url | get status } catch { 0 }
      if $status != 200 { error make { msg: $"($url): HTTP ($status)" } }
      let out = [$dist $"rirekisho-($locale).pdf"] | path join
      rm --force $out
      print-page $browser $profile $url $out
      if not ($out | path exists) { error make { msg: $"($out): not written" } }
      print $out
    }
    null
  } catch { |err| $err }

  job kill $server
  rm --recursive --force $profile
  if $root != $dist { rm --recursive --force $root }
  if $result != null { error make { msg: $result.msg } }
}
