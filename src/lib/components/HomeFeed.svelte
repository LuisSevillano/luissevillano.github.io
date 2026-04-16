<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { getProjects } from '$lib/content/projects.js';
	import { siteTagline } from '$lib/content/site.js';

	let {
		heroTitle = 'Maps, data, and visual stories from my daily work',
		heroCopy = 'Here I collect newsroom stories, independent projects, and open-source tools and experiments.'
	} = $props();

	const titleTailPattern = /\s*from my daily work$/i;
	let heroTitleLead = $derived(heroTitle.replace(titleTailPattern, '').trim());
	let heroTitleTail = $derived(titleTailPattern.test(heroTitle) ? 'from my daily work' : '');

	const projects = getProjects();
	const selectedWorkSlugs = [
		'from-war-to-your-home',
		'four-years-of-war-in-ukraine-a-front-that-barely-moves',
		'paiporta-simulation',
		'antarctica-glaciers',
		'what-happened-at-the-melilla-border-the-step-by-step-of-the-tragedy'
	];

	const recentWorkSlugs = [
		'what-has-happened-in-iran-a-week-of-war-on-the-map',
		'hormuz-under-threat-tanker-traffic-chokepoints-and-regional-impact',
		'aragon-election-results-street-by-street',
		'358000-hectares-in-15-days-spains-wildfire-peak',
		'paiporta-under-water',
		'how-the-war-fronts-in-ukraine-have-changed-since-the-start-of-the-kursk-offensive'
	];

	const toolsAndTeachingSlugs = [
		'relievo',
		'cheesy-shadow-picker-v2',
		'mapbox-inset-map',
		'inset-map-creator',
		'scaling-artboards-for-ai2html',
		'qgis-for-journalists'
	];

	const toolsAndTeachingSet = new Set(toolsAndTeachingSlugs);

	const toolsAndTeachingProjects = toolsAndTeachingSlugs
		.map((slug) => projects.find((project) => project.slug === slug))
		.filter(Boolean);
	const selectedProjects = selectedWorkSlugs
		.map((slug) => projects.find((project) => project.slug === slug))
		.filter(Boolean);
	const selectedSlugs = new Set(selectedProjects.map((project) => project.slug));
	const latestProjects = recentWorkSlugs
		.map((slug) => projects.find((project) => project.slug === slug))
		.filter(Boolean)
		.filter((project) => !toolsAndTeachingSet.has(project.slug))
		.filter((project) => !selectedSlugs.has(project.slug));
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
