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
            ];
            # `pnpm pdf` needs a Chromium. nixpkgs only builds `chromium` for Linux; on macOS, Playwright's
            # prebuilt Chrome for Testing is the free alternative (dev only, CI runs on Linux).
            # aarch64-darwin is the only Darwin system above, hence chrome-mac-arm64.
            env =
              lib.optionalAttrs pkgs.stdenv.hostPlatform.isLinux {
                CHROMIUM_PATH = lib.getExe pkgs.chromium;
              }
              // lib.optionalAttrs pkgs.stdenv.hostPlatform.isDarwin {
                CHROMIUM_PATH =
                  let
                    inherit (pkgs.playwright-driver) browsers-chromium browsersJSON;
                  in
                  "${browsers-chromium}/chromium-${browsersJSON.chromium.revision}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
              };
          };
        }
      );

      formatter = forAllSystems (system: (pkgsFor system).nixfmt-tree);
    };
}
