<script lang="ts">
  // Cycles system → light → dark. "system" removes the attribute so prefers-color-scheme decides;
  // the choice is a per-browser convenience, so storage failures are ignored.
  type Theme = "system" | "light" | "dark";

  interface Props {
    labels: Record<Theme, string>;
    title: string;
  }

  let { labels, title }: Props = $props();

  const order: Theme[] = ["system", "light", "dark"];
  let theme = $state<Theme>(read());

  function read(): Theme {
    if (typeof document === "undefined") return "system";
    const current = document.documentElement.dataset.theme;
    return current === "light" || current === "dark" ? current : "system";
  }

  function cycle() {
    theme = order[(order.indexOf(theme) + 1) % order.length];
    const root = document.documentElement;
    if (theme === "system") delete root.dataset.theme;
    else root.dataset.theme = theme;
    try {
      if (theme === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", theme);
    } catch {}
  }
</script>

<button type="button" onclick={cycle} {title} aria-label={`${title} (${labels[theme]})`}>
  <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
    {#if theme === "light"}
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path
          d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        />
      </g>
    {:else if theme === "dark"}
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" />
    {:else}
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
    {/if}
  </svg>
  <span>{labels[theme]}</span>
</button>

<style>
  button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font: inherit;
    color: inherit;
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  button:hover {
    color: var(--shu);
  }
</style>
