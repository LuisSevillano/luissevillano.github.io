<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} · Luis Sevillano</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="error-wrap" id="main">
	<p class="error-status">{page.status}</p>
	<h1 class="error-title">
		{#if page.status === 404}
			This page doesn't exist
		{:else}
			Something went wrong
		{/if}
	</h1>
	<p class="error-copy">
		{#if page.status === 404}
			The URL you tried might have moved, or never existed. Two good places to land:
		{:else}
			Try reloading. If the problem persists, the links below should get you back on track.
		{/if}
	</p>
	<div class="error-cta">
		<a class="btn primary" href="/">Go to home</a>
		<a class="btn" href="/work">Browse all work</a>
	</div>
</main>

<style>
	.error-wrap {
		max-width: 36rem;
		margin: 0 auto;
		padding: 5rem 1rem 6rem;
		text-align: center;
	}
	.error-status {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		color: var(--accent-text, var(--accent));
		margin: 0 0 0.8rem;
	}
	.error-title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 1.4rem + 3vw, 3.4rem);
		font-weight: 500;
		line-height: 1.05;
		margin: 0 0 1.2rem;
	}
	.error-copy {
		font-size: 1.05rem;
		color: var(--muted);
		margin: 0 0 1.8rem;
	}
	.error-cta {
		display: flex;
		gap: 0.7rem;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
