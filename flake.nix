{
  description = "rirekisho (履歴書, the résumé) — my résumé as a static site (Astro + Svelte) and its PDF";

  # Same branch as sekkeizu and kanna.
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-26.05-darwin";

  outputs =
    { nixpkgs, ... }:
    let
      inherit (nixpkgs) lib;
      forAllSystems = lib.genAttrs [
        "aarch64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      pkgsFor = system: nixpkgs.legacyPackages.${system};
    in
    {
      packages = forAllSystems (system: {
        default = (pkgsFor system).callPackage ./nix/package.nix { };
      });

      devShells = forAllSystems (
        system:
        let
          pkgs = pkgsFor system;
        in
        {
          default = pkgs.mkShellNoCC {
            packages = [
              pkgs.nodejs_22
              pkgs.pnpm
              # `pnpm pdf` (scripts/pdf.nu): Nushell, and Caddy to serve dist/ while Chromium prints it.
              pkgs.nushell
              pkgs.caddy
            ];
            # `pnpm pdf` prints with Chromium's headless shell, the build made for command-line printing:
            # the full browser never returns from --print-to-pdf on macOS. Prebuilt for every system
            # (Playwright's builds, patched by nixpkgs), the same engine locally and in CI. Its directory
            # and binary names differ per platform, hence the lookup rather than a fixed path.
            shellHook = ''
              export CHROMIUM_PATH=$(find ${pkgs.playwright-driver.components.chromium-headless-shell} \
                -type f \( -name chrome-headless-shell -o -name headless_shell \) | head -n 1)
            '';
            # The headless shell has no fontconfig setup of its own; the page brings its fonts anyway.
            env = lib.optionalAttrs pkgs.stdenv.hostPlatform.isLinux {
              FONTCONFIG_FILE = pkgs.makeFontsConf { fontDirectories = [ ]; };
            };
          };
        }
      );

      formatter = forAllSystems (system: (pkgsFor system).nixfmt-tree);
    };
}
