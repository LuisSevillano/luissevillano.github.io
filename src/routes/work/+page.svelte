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

	let searchSyncTimer;
	function handleSearchInput(e) {
		searchQuery = e.target.value;
		// Debounced URL sync on every keystroke. Previously only Enter committed
		// the query, so copying the URL mid-typing lost the search term.
		clearTimeout(searchSyncTimer);
		searchSyncTimer = setTimeout(updateUrl, 220);
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

<main class="work-wrap" id="main" tabindex="-1">
	<header class="archive-head">
		<p class="eyebrow">Archive · 2016–2026</p>
		<h1>Work</h1>
		<p class="lede">
			All projects: investigations, explainers, trackers and the open-source tools I make to support
			them. Filter by type, year or topic.
		</p>
	</header>

	<section class="work-filters" aria-label="Filter archive">
		<div class="toolbar">
			<div class="search">
				<label class="sr-only" for="work-search">Search the archive by title or tag</label>
				<svg
					class="search-glyph"
					viewBox="0 0 16 16"
					width="1em"
					height="1em"
					aria-hidden="true"
					focusable="false"
				>
					<circle
						cx="6.75"
						cy="6.75"
						r="4.75"
						fill="none"
						stroke="currentColor"
						stroke-width="1.4"
					/>
					<line
						x1="10.4"
						y1="10.4"
						x2="14"
						y2="14"
						stroke="currentColor"
						stroke-width="1.4"
						stroke-linecap="round"
					/>
				</svg>
				<input
					id="work-search"
					class="search-input"
					type="search"
					placeholder="Search projects, tags…"
					autocomplete="off"
					spellcheck="false"
					value={searchQuery}
					oninput={handleSearchInput}
				/>
			</div>

			<div class="facets" role="group" aria-label="Filter by facet">
				<div class="facet">
					<label class="facet-lbl" for="filter-type">Type</label>
					<div class="facet-field">
						<select
							id="filter-type"
							class="facet-select"
							bind:value={selectedType}
							onchange={handleFilterChange}
						>
							<option value="all">All</option>
							{#each typeOptions as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
						<svg class="facet-caret" viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
							<path
								d="M1 1l4 4 4-4"
								fill="none"
								stroke="currentColor"
								stroke-width="1.4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>

				<div class="facet">
					<label class="facet-lbl" for="filter-year">Year</label>
					<div class="facet-field">
						<select
							id="filter-year"
							class="facet-select"
							bind:value={selectedYear}
							onchange={handleFilterChange}
						>
							<option value="all">All</option>
							{#each yearOptions as option}
								<option value={String(option)}>{option}</option>
							{/each}
						</select>
						<svg class="facet-caret" viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
							<path
								d="M1 1l4 4 4-4"
								fill="none"
								stroke="currentColor"
								stroke-width="1.4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>

				<div class="facet facet--topic">
					<label class="facet-lbl" for="filter-tag">Topic</label>
					<div class="facet-field">
						<select
							id="filter-tag"
							class="facet-select"
							bind:value={selectedTag}
							onchange={handleFilterChange}
						>
							<option value="all">All</option>
							{#each tagOptions as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
						<svg class="facet-caret" viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
							<path
								d="M1 1l4 4 4-4"
								fill="none"
								stroke="currentColor"
								stroke-width="1.4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>

		<div class="meta">
			<p class="count" role="status" aria-live="polite">
				<span class="count-num">{filteredProjects.length}</span><span class="count-sep">/</span
				><span class="count-total">{projects.length}</span>
				<span class="count-label">projects</span>
			</p>
			{#if hasActiveFilters}
				<button type="button" class="clear" onclick={clearFilters}>
					Clear filters
					<svg class="clear-x" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
						<path
							d="M1 1l8 8M9 1l-8 8"
							fill="none"
							stroke="currentColor"
							stroke-width="1.4"
							stroke-linecap="round"
						/>
					</svg>
				</button>
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
	.archive-head {
		padding: 2.6rem 0 1.6rem;
	}
	.archive-head .eyebrow {
		margin: 0 0 0.8rem;
	}
	.archive-head h1 {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(2.2rem, 1.4rem + 3vw, 3.6rem);
		line-height: 1.05;
		margin: 0 0 0.5rem;
	}
	.archive-head .lede {
		color: var(--muted);
		max-width: 56ch;
		margin: 0;
	}

	.work-filters {
		margin: 0 0 1.6rem;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	/* Row 1 — the control bar */
	.toolbar {
		display: flex;
		align-items: stretch;
		min-height: 3rem;
	}

	/* Search: leading glyph + borderless field that grows to fill */
	.search {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		flex: 1 1 auto;
		min-width: 0;
		padding: 0.5rem 1.25rem 0.5rem 0;
		border-right: 1px solid var(--border);
	}

	.search-glyph {
		flex-shrink: 0;
		color: var(--muted);
		font-size: 0.95rem;
		transition: color 0.15s ease;
	}

	.search:focus-within .search-glyph {
		color: var(--accent-text);
	}

	.search-input {
		flex: 1 1 auto;
		min-width: 0;
		appearance: none;
		border: 0;
		background: transparent;
		color: var(--text);
		font-family: var(--font-ui);
		font-size: 0.92rem;
		font-weight: 500;
		line-height: 1.4;
		padding: 0;
		outline: none;
	}

	.search-input::placeholder {
		color: color-mix(in srgb, var(--muted) 70%, transparent);
		font-weight: 400;
	}

	.search-input::-webkit-search-cancel-button {
		appearance: none;
	}

	.search:focus-within {
		outline: 2px solid var(--accent);
		outline-offset: 3px;
	}

	/* Facets: quiet inline dropdowns, grouped right, baseline aligned */
	.facets {
		display: flex;
		align-items: stretch;
		flex-shrink: 0;
	}

	.facet {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.2rem;
		padding: 0.5rem 1.1rem;
		border-right: 1px solid var(--border);
	}

	.facet:last-child {
		border-right: 0;
		padding-right: 0;
	}

	.facet-lbl {
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
		font-size: 0.64rem;
		font-weight: 400;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--muted);
		line-height: 1;
		white-space: nowrap;
	}

	.facet-field {
		position: relative;
		display: flex;
		align-items: center;
	}

	.facet-select {
		appearance: none;
		-webkit-appearance: none;
		border: 0;
		background: transparent;
		color: var(--text);
		font-family: var(--font-ui);
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1.3;
		padding: 0 1.15rem 0 0;
		margin: 0;
		cursor: pointer;
		outline: none;
		max-width: 11rem;
		text-overflow: ellipsis;
	}

	/* Topic values run long — let this one read fully */
	.facet--topic .facet-select {
		max-width: 16rem;
	}

	/* Keep the native option popup legible across engines in dark mode */
	.facet-select option {
		background: var(--surface);
		color: var(--text);
	}

	.facet-caret {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: var(--muted);
		transition: color 0.15s ease;
	}

	.facet-field:hover .facet-caret,
	.facet-select:focus-visible + .facet-caret {
		color: var(--accent-text);
	}

	.facet-select:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 3px;
	}

	/* Row 2 — result count + clear, baseline-aligned */
	.meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.45rem 0;
		border-top: 1px solid var(--border);
	}

	.count {
		margin: 0;
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
		font-size: 0.7rem;
		letter-spacing: 0.04em;
		color: var(--muted);
		display: flex;
		align-items: baseline;
		gap: 0.32rem;
		font-variant-numeric: tabular-nums;
	}

	.count-num {
		color: var(--text);
		font-weight: 600;
	}

	.count-sep {
		color: color-mix(in srgb, var(--muted) 60%, transparent);
	}

	.count-label {
		text-transform: uppercase;
		letter-spacing: 0.14em;
		font-size: 0.62rem;
		color: var(--muted);
	}

	.clear {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		border: 0;
		background: transparent;
		padding: 0;
		cursor: pointer;
		font-family: var(--font-ui);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		color: var(--muted);
		transition: color 0.15s ease;
	}

	.clear:hover {
		color: var(--accent-text);
	}

	.clear:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 3px;
	}

	.clear-x {
		flex-shrink: 0;
	}

	.empty-state {
		margin: 1rem 0 1.2rem;
		font-family: var(--font-ui);
		font-size: 0.85rem;
		color: var(--muted);
	}

	/* Tablet: search becomes a full-width top row, facets share the row below */
	@media (max-width: 720px) {
		.toolbar {
			flex-direction: column;
			align-items: stretch;
			min-height: 0;
		}

		.search {
			border-right: 0;
			border-bottom: 1px solid var(--border);
			padding: 0.7rem 0;
		}

		.facets {
			justify-content: flex-start;
		}

		.facet {
			flex: 1 1 0;
			min-width: 0;
			padding: 0.6rem 0.9rem;
		}

		.facet:first-child {
			padding-left: 0;
		}

		.facet-select,
		.facet--topic .facet-select {
			max-width: 100%;
			width: 100%;
		}
	}

	/* Phone (~375px): facets wrap to a 2-up grid with light inter-row rules */
	@media (max-width: 440px) {
		.facets {
			flex-wrap: wrap;
		}

		.facet {
			flex: 1 1 40%;
			border-bottom: 1px solid color-mix(in srgb, var(--border) 55%, transparent);
		}

		.facet:nth-last-child(-n + 1) {
			border-bottom: 0;
		}
	}
</style>
