<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { getProjects } from '$lib/content/projects.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	const projects = getProjects();
	const typeOptions = [...new Set(projects.map((project) => project.type).filter(Boolean))].sort();
	const yearOptions = [
		...new Set(projects.map((project) => new Date(project.date).getFullYear()))
	].sort((a, b) => b - a);
	const tagOptions = [
		...new Set(projects.flatMap((project) => project.tags || []).filter(Boolean))
	].sort((a, b) => a.localeCompare(b));

	let searchQuery = $state('');
	let selectedType = $state('all');
	let selectedYear = $state('all');
	let selectedTag = $state('all');

	onMount(() => {
		const params = page.url.searchParams;
		searchQuery = params.get('q') || '';
		selectedType = params.get('type') || 'all';
		selectedYear = params.get('year') || 'all';
		selectedTag = params.get('tag') || 'all';
	});

	function updateUrl() {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const params = new URLSearchParams();
		if (searchQuery.trim()) params.set('q', searchQuery.trim());
		if (selectedType !== 'all') params.set('type', selectedType);
		if (selectedYear !== 'all') params.set('year', selectedYear);
		if (selectedTag !== 'all') params.set('tag', selectedTag);
		const query = params.toString();
		const newUrl = query ? `/work?${query}` : '/work';
		goto(newUrl, { replaceState: true, noScroll: true });
	}

	function handleSearchInput(e) {
		searchQuery = e.target.value;
	}

	function handleSearchKeyup(e) {
		if (e.key === 'Enter' || searchQuery.length === 0) {
			updateUrl();
		}
	}

	function handleFilterChange() {
		updateUrl();
	}

	function clearFilters() {
		searchQuery = '';
		selectedType = 'all';
		selectedYear = 'all';
		selectedTag = 'all';
		updateUrl();
	}

	const filteredProjects = $derived(
		projects.filter((project) => {
			const matchesType = selectedType === 'all' || project.type === selectedType;
			const matchesYear =
				selectedYear === 'all' || new Date(project.date).getFullYear() === Number(selectedYear);
			const matchesTag = selectedTag === 'all' || (project.tags || []).includes(selectedTag);

			const haystack = [project.title, project.excerpt, ...(project.tags || [])]
				.join(' ')
				.toLowerCase();
			const matchesSearch =
				!searchQuery.trim() || haystack.includes(searchQuery.trim().toLowerCase());

			return matchesType && matchesYear && matchesTag && matchesSearch;
		})
	);

	const hasActiveFilters = $derived(
		searchQuery.trim() || selectedType !== 'all' || selectedYear !== 'all' || selectedTag !== 'all'
	);

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
	<h1 class="sr-only">Work archive</h1>

	<section class="work-filters" aria-label="Filter archive">
		<div class="filters-row">
			<label>
				<span>Search</span>
				<input
					type="search"
					placeholder="Title, excerpt, tag..."
					value={searchQuery}
					oninput={handleSearchInput}
					onkeyup={handleSearchKeyup}
				/>
			</label>

			<label>
				<span>Type</span>
				<select bind:value={selectedType} onchange={handleFilterChange}>
					<option value="all">All</option>
					{#each typeOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</label>

			<label>
				<span>Year</span>
				<select bind:value={selectedYear} onchange={handleFilterChange}>
					<option value="all">All</option>
					{#each yearOptions as option}
						<option value={String(option)}>{option}</option>
					{/each}
				</select>
			</label>

			<label>
				<span>Tag</span>
				<select bind:value={selectedTag} onchange={handleFilterChange}>
					<option value="all">All</option>
					{#each tagOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</label>
		</div>

		<div class="filters-meta">
			<p>Showing {filteredProjects.length} of {projects.length} projects</p>
			{#if hasActiveFilters}
				<button type="button" onclick={clearFilters}>Clear filters</button>
			{/if}
		</div>
	</section>

	{#if filteredProjects.length === 0}
		<p class="empty-state">No projects match the selected filters.</p>
	{/if}

	<div class="project-grid project-grid-dense">
		{#each filteredProjects as project}
			<ProjectCard {project} compact={true} />
		{/each}
	</div>
</main>

<style>
	.work-filters {
		margin: 0 0 1.3rem;
		padding: 0.9rem;
		border: 1px solid var(--border);
		background: color-mix(in srgb, var(--surface-soft) 86%, transparent);
	}

	.filters-row {
		display: grid;
		gap: 0.7rem;
		grid-template-columns: 2fr repeat(3, 1fr);
	}

	label {
		display: grid;
		gap: 0.35rem;
		font-family: var(--font-ui);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}

	input,
	select {
		width: 100%;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text);
		padding: 0.45rem 0.55rem;
		font: inherit;
		font-size: 0.8rem;
		text-transform: none;
		letter-spacing: normal;
	}

	.filters-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 0.75rem;
		gap: 0.8rem;
	}

	.filters-meta p {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 0.78rem;
		color: var(--muted);
	}

	.filters-meta button {
		border: 1px solid var(--border);
		background: transparent;
		color: var(--text);
		font-family: var(--font-ui);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.35rem 0.55rem;
		cursor: pointer;
	}

	.filters-meta button:hover {
		background: color-mix(in srgb, var(--surface-soft) 78%, transparent);
	}

	.empty-state {
		margin: 1rem 0 1.2rem;
		font-family: var(--font-ui);
		font-size: 0.85rem;
		color: var(--muted);
	}

	@media (max-width: 980px) {
		.filters-row {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 640px) {
		.work-filters {
			padding: 0.7rem;
		}

		.filters-row {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.5rem;
		}

		label {
			font-size: 0.65rem;
		}

		label span {
			margin-bottom: 0.15rem;
			display: block;
		}

		input,
		select {
			padding: 0.35rem 0.4rem;
			font-size: 0.75rem;
			min-height: 2rem;
		}

		.filters-meta {
			flex-direction: row;
			justify-content: space-between;
			margin-top: 0.6rem;
		}

		.filters-meta p {
			font-size: 0.7rem;
		}

		.filters-meta button {
			font-size: 0.65rem;
			padding: 0.25rem 0.45rem;
		}
	}
</style>
