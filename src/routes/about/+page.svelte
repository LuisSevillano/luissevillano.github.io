<script>
	const siteUrl = 'https://luissevillano.net';
	const pageUrl = `${siteUrl}/about/`;
	const ogImage = `${siteUrl}/assets/og/site-default.jpg`;
	const title = 'About | Luis Sevillano';
	const description =
		'About Luis Sevillano, visual journalist and developer focused on cartography, data reporting, and newsroom graphics workflows.';
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

<main class="about-wrap">
	<section class="section-head section-head-lined section-head-block about-head">
		<h2>About Me</h2>
	</section>

	<div class="about-grid">
		<article>
			<p>
				I am Luis Sevillano, a visual journalist and developer in the Visual Narratives team at EL
				PAIS, where I work on map-led and data-driven stories across both fast-turnaround coverage
				and in-depth projects.
			</p>
			<p>
				My journey into visual journalism began over a decade ago through D3.js and data
				visualization. Today, my work often starts in early reporting stages, helping define the
				visual angle and the format that will be most useful for readers.
			</p>
			<p>
				Depending on the story, I move between static graphics, interactive maps, and mixed visual
				packages for web and mobile, always aiming for clarity under newsroom deadlines.
			</p>
			<p>
				I studied History at Universidad Autonoma de Madrid and later completed a Master's degree in
				Ancient History. That background still shapes how I work: start from evidence, build context
				carefully, and keep narrative structure clear.
			</p>
			<p>
				Outside of my professional work, I was a musician for many years and I still maintain a deep
				interest in music. I also spend as much time as possible outdoors, usually hiking and
				exploring the landscapes near the small city where I live, not far from Madrid.
			</p>
			<p>
				This portfolio is a curated archive of published work, experiments, and practical tools
				developed through newsroom production.
			</p>
		</article>

		<aside class="about-aside">
			<h2>What I usually work on</h2>
			<ul>
				<li>I produce maps for both quick newsroom coverage and enterprise stories.</li>
				<li>
					I build interactive maps and data graphics with a strong focus on mobile readability.
				</li>
				<li>I create practical tools and reusable components for newsroom workflows.</li>
				<li>I identify repetitive tasks and turn them into automation whenever possible.</li>
			</ul>

			<h2>Contact</h2>
			<p>
				If you want to share references, ideas, corrections, or technical notes, write to
				luissevillanopires at gmail.
			</p>
		</aside>
	</div>
</main>
