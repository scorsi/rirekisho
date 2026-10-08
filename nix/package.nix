# The built site (dist/), without the PDFs: printing needs a browser, which CI runs outside the
# sandbox (`pnpm pdf`, see .forgejo/workflows/build.yml). RIREKISHO_PHONE is deliberately not read
# here: a store path is world-readable.
{
  lib,
  stdenvNoCC,
  nodejs_22,
  pnpm,
  fetchPnpmDeps,
  pnpmConfigHook,
  base ? "/",
  site ? null,
}:
stdenvNoCC.mkDerivation (finalAttrs: {
  pname = "rirekisho";
  version = "0-unstable";

  src = lib.fileset.toSource {
    root = ../.;
    fileset = lib.fileset.unions [
      ../package.json
      ../pnpm-lock.yaml
      ../astro.config.mjs
      ../svelte.config.js
      ../tsconfig.json
      ../src
      ../public
    ];
  };

  pnpmDeps = fetchPnpmDeps {
    inherit (finalAttrs) pname version src;
    inherit pnpm;
    fetcherVersion = 4;
    # Refresh after any change to pnpm-lock.yaml: set to "", build, copy the hash from the error.
    hash = lib.fakeHash;
  };

  nativeBuildInputs = [
    nodejs_22
    pnpm
    pnpmConfigHook
  ];

  env = {
    RIREKISHO_BASE = base;
    ASTRO_TELEMETRY_DISABLED = "1";
  }
  // lib.optionalAttrs (site != null) { RIREKISHO_SITE = site; };

  buildPhase = ''
    runHook preBuild
    pnpm build
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    cp -r dist $out
    runHook postInstall
  '';
})
