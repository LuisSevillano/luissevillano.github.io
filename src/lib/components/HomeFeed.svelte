<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { getFeaturedProjects, getProjects } from '$lib/content/projects.js';
	import { siteTagline } from '$lib/content/site.js';

	let {
		heroTitle = 'Maps, data, and visual stories from my daily work',
		heroCopy = 'Here I collect newsroom stories, independent projects, and open-source tools and experiments.'
	} = $props();

	const titleTailPattern = /\s*from my daily work$/i;
	let heroTitleLead = $derived(heroTitle.replace(titleTailPattern, '').trim());
	let heroTitleTail = $derived(titleTailPattern.test(heroTitle) ? 'from my daily work' : '');

	const projects = getProjects();
	const toolsAndTeachingSlugs = [
		'ai2html-workshop',
		'QGIS-for-journalists',
		'qgis-tile-writer',
		'catastro-coruna',
		'combine-csv-headers-in-R'
	];
	const toolsAndTeachingSet = new Set(toolsAndTeachingSlugs);

	const toolsAndTeachingProjects = toolsAndTeachingSlugs
		.map((slug) => projects.find((project) => project.slug === slug))
		.filter(Boolean)
		.slice(0, 4);
	const coreProjects = projects.filter((project) => !toolsAndTeachingSet.has(project.slug));
	const featuredProjects = getFeaturedProjects().filter(
		(project) => !toolsAndTeachingSet.has(project.slug)
	);
	const selectedProjects =
		featuredProjects.length >= 5 ? featuredProjects.slice(0, 5) : coreProjects.slice(0, 5);
	const selectedSlugs = new Set(selectedProjects.map((project) => project.slug));
	const latestProjects = coreProjects
		.filter((project) => !selectedSlugs.has(project.slug))
		.filter((project) => project.type !== 'tool')
		.slice(0, 6);
</script>

<main>
	<section class="hero hero-pro">
		<p class="eyebrow">{siteTagline}</p>
		<h1 class="hero-title">
			{heroTitleLead}
			{#if heroTitleTail}
				<em>{heroTitleTail}</em>
			{/if}
		</h1>
		<p class="hero-copy">{heroCopy}</p>
	</section>

	<section id="selected-work">
		<div class="section-head section-head-lined">
			<p class="section-index">01</p>
			<h2>Selected Work</h2>
			<div class="section-rule"></div>
		</div>
		<div class="selected-grid">
			<div class="selected-top">
				{#if selectedProjects[0]}
					<ProjectCard project={selectedProjects[0]} variant="lead" eager={true} />
				{/if}
				{#if selectedProjects[1]}
					<ProjectCard project={selectedProjects[1]} variant="default" compact={true} />
				{/if}
			</div>
			<div class="selected-bottom">
				{#each selectedProjects.slice(2, 5) as project}
					<ProjectCard {project} compact={true} />
				{/each}
			</div>
		</div>
	</section>

	<section>
		<div class="section-head section-head-lined">
			<p class="section-index">02</p>
			<h2>Recent Work</h2>
			<div class="section-rule"></div>
		</div>
		<div class="project-grid project-grid-dense">
			{#each latestProjects as project}
				<ProjectCard {project} compact={true} />
			{/each}
		</div>
	</section>

	{#if toolsAndTeachingProjects.length > 0}
		<section>
			<div class="section-head section-head-lined">
				<p class="section-index">03</p>
				<h2>Tools &amp; Teaching</h2>
				<div class="section-rule"></div>
			</div>
			<div class="project-grid project-grid-dense">
				{#each toolsAndTeachingProjects as project}
					<ProjectCard {project} compact={true} />
				{/each}
			</div>
		</section>
	{/if}

	<p class="more-link"><a href="/work">Browse all work</a></p>
</main>
