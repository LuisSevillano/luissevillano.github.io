<script>
	import { afterNavigate } from '$app/navigation';
	import { highlightCodeBlocks } from '$lib/utils/highlight.js';
	import { onMount, tick } from 'svelte';

	let { data } = $props();

	let hasRichHow = $derived(Boolean(data.project.content?.howHtml));
	let hasStructuredHow = $derived(Boolean(data.project.content?.how));

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
	<title>{data.project.title} | How it was done</title>
	<meta
		name="description"
		content={`Technical breakdown of methods and implementation choices for ${data.project.title}.`}
	/>
</svelte:head>

<main class="page-wrap project-page">
	<p class="meta"><a href={`/work/${data.project.slug}`}>Back to case study</a></p>
	<h1><span class="bigger-title">How it was done</span> {data.project.title}</h1>

	{#if hasRichHow}
		<article class="rich-content">{@html data.project.content.howHtml}</article>
	{:else if hasStructuredHow}
		<p>{data.project.content.how.summary}</p>

		<h2>Stack</h2>
		<ul>
			{#each data.project.content.how.stack as item}
				<li>{item}</li>
			{/each}
		</ul>

		<h2>Pipeline overview</h2>
		<ul>
			{#each data.project.content.how.pipeline as step}
				<li>{step}</li>
			{/each}
		</ul>

		{#if data.project.content.how.sections?.length}
			{#each data.project.content.how.sections as section}
				<h2>{section.title}</h2>
				<ul>
					{#each section.points as point}
						<li>{point}</li>
					{/each}
				</ul>
			{/each}
		{/if}

		<h2>Performance and accessibility</h2>
		<ul>
			{#each data.project.content.how.performance as note}
				<li>{note}</li>
			{/each}
		</ul>
	{/if}

	<h2>Project link</h2>
	<div class="cta-row">
		<a class="btn" href={`/work/${data.project.slug}`}>View project case study</a>
		{#if data.project.liveUrl}
			<a class="btn primary" href={data.project.liveUrl} target="_blank" rel="noreferrer"
				>View live project</a
			>
		{/if}
	</div>

</main>
