<script>
	const siteUrl = 'https://luissevillano.net';
	const pageUrl = `${siteUrl}/about/`;
	const ogImage = `${siteUrl}/assets/og/site-default.jpg`;
	const title = 'About | Luis Sevillano';
	const description =
		'About Luis Sevillano, graphics reporter focused on geospatial storytelling, cartography, and data-driven reporting.';
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
	<section class="section-head section-head-lined section-head-block">
		<h2>About Me</h2>
		<div class="section-rule"></div>
	</section>

	<div class="about-grid">
		<article>
			<p>
				I am Luis Sevillano, a visual journalist and developer in the Visual Narratives team at EL
				PAIS.
			</p>
			<p>
				My journey into visual journalism began over a decade ago through D3.js and data
				visualization. Over time, my focus shifted toward maps and cartography, which have become my
				primary specialty and the area where I find the most creative fulfillment. I produce both
				static and interactive pieces, selecting the format that best serves the narrative.
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
				This portfolio is a personal archive of published work, experiments, and technical notes.
			</p>
		</article>

		<aside class="about-aside">
			<h2>What I usually work on</h2>
			<ul>
				<li>I produce many maps, both for quick newsroom coverage and long-form stories.</li>
				<li>
					I build interactive maps and also data graphics with Svelte when that format fits better.
				</li>
				<li>
					I like creating small tools for our newsroom team, especially practical internal
					utilities.
				</li>
				<li>I often identify repetitive tasks and turn them into automated workflows.</li>
			</ul>

			<h2>Contact</h2>
			<p>
				If you want to share references, ideas, corrections, or technical notes, write to
				luissevillanopires at gmail.
			</p>
		</aside>
	</div>
</main>
