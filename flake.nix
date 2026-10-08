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
            # `pnpm pdf` needs a Chromium; nixpkgs only builds it for Linux. On macOS the script falls
            # back to an installed Google Chrome.
            env = lib.optionalAttrs pkgs.stdenv.hostPlatform.isLinux {
              CHROMIUM_PATH = lib.getExe pkgs.chromium;
            };
          };
        }
      );

      formatter = forAllSystems (system: (pkgsFor system).nixfmt-tree);
    };
}
