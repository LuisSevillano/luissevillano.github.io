<script>
	import { afterNavigate } from '$app/navigation';
	import { formatDate } from '$lib/content/projects.js';
	import { highlightCodeBlocks } from '$lib/utils/highlight.js';
	import { onMount, tick } from 'svelte';

	let { data } = $props();
	const siteUrl = 'https://luissevillano.net';
	let pageUrl = $derived(`${siteUrl}/work/${data.project.slug}/`);
	let ogImage = $derived(
		`${siteUrl}${data.project.socialImage || `/assets/og/projects/${data.project.slug}.jpg`}`
	);

	onMount(() => {
		const runHighlight = async () => {
			try {
				await tick();
				await highlightCodeBlocks(document);
			} catch {
				// Keep route navigation resilient if highlighting fails.
			}
		};

		runHighlight();
		return afterNavigate(runHighlight);
	});
</script>

<svelte:head>
	<title>{data.project.seoTitle}</title>
	<meta name="description" content={data.project.seoDescription} />
	<link rel="canonical" href={pageUrl} />
	<meta property="og:site_name" content="Luis Sevillano" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.project.seoTitle} />
	<meta property="og:description" content={data.project.seoDescription} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.project.seoTitle} />
	<meta name="twitter:description" content={data.project.seoDescription} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<main class="page-wrap project-page">
	<p class="meta"><a href="/work">Back to archive</a></p>
	<h1>{data.project.title}</h1>
	<p class="meta">
		{[data.project.client, formatDate(data.project.date), data.project.duration]
			.filter(Boolean)
			.join(' · ')}
	</p>

	<div class="pill-row project-type">
		<span class="pill">{data.project.type}</span>
	</div>
	{#if data.project.tags?.length}
		<div class="stack">
			stack: [{data.project.tags.join(', ')}]
		</div>
	{/if}

	{#if data.project.content.storyHtml}
		<article class="rich-content">{@html data.project.content.storyHtml}</article>
	{:else}
		<h2>Context</h2>
		{#each data.project.content.context as paragraph}
			<p>{paragraph}</p>
		{/each}

		<h2>My role</h2>
		<ul>
			{#each data.project.role as role}
				<li>{role}</li>
			{/each}
		</ul>
		{#each data.project.content.myRole as paragraph}
			<p>{paragraph}</p>
		{/each}

		<h2>Data and methodology</h2>
		{#each data.project.content.methodology as paragraph}
			<p>{paragraph}</p>
		{/each}

		<h2>Key decisions</h2>
		<ul>
			{#each data.project.content.decisions as decision}
				<li>{decision}</li>
			{/each}
		</ul>

		<h2>Result</h2>
		{#each data.project.content.result as paragraph}
			<p>{paragraph}</p>
		{/each}

		<h2>Impact and learnings</h2>
		<ul>
			{#each data.project.content.impact as item}
				<li>{item}</li>
			{/each}
		</ul>
	{/if}

	<h2>Links</h2>
	<div class="cta-row">
		{#if data.project.liveUrl}
			<a class="btn primary" href={data.project.liveUrl} target="_blank" rel="noreferrer"
				>View live project</a
			>
		{/if}
		{#if data.project.howUrl}
			<a class="btn" href={data.project.howUrl}>How it was done</a>
		{/if}
		{#if data.project.repoUrl}
			<a class="btn" href={data.project.repoUrl} target="_blank" rel="noreferrer">Code</a>
		{/if}
		{#if data.project.toolURL}
			<a class="btn" href={data.project.toolURL} target="_blank" rel="noreferrer">Tool</a>
		{/if}
	</div>
</main>
