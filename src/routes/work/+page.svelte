<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { getProjects } from '$lib/content/projects.js';

	const projects = getProjects();
	const siteUrl = 'https://luissevillano.net';
	const pageUrl = `${siteUrl}/work/`;
	const ogImage = `${siteUrl}/assets/og/site-default.jpg`;
	const title = 'Work | Luis Sevillano';
	const description =
		'Archive of visual journalism, cartography, interactive stories, and tooling projects by Luis Sevillano.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={pageUrl} />
	<meta property="og:site_name" content="Luis Sevillano" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<main class="work-wrap">
	<section class="section-head section-head-lined section-head-block">
		<h2>Work</h2>
		<div class="section-rule"></div>
	</section>
	<div class="project-grid project-grid-dense">
		{#each projects as project}
			<ProjectCard {project} compact={true} />
		{/each}
	</div>
</main>
