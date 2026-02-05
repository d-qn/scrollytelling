<script lang="ts">
	import { onMount } from 'svelte';
	import type { StoryStep } from '$lib/types';
	import VizContainer from './VizContainer.svelte';
	import DatawrapperChart from './DatawrapperChart.svelte';

	export let steps: StoryStep[] = [];
	export let format: 'standalone' | 'embed' = 'standalone';

	let activeStepIndex = 0;
	let stepElements: HTMLElement[] = [];

	$: currentStep = steps[activeStepIndex] || steps[0];

	// Unique list of charts to preload
	$: uniqueDwCharts = [
		...new Set(
			steps
				.filter((s) => s.vizType === 'datawrapper' && s.vizProps.chartId)
				.map((s) => s.vizProps.chartId as string)
		)
	];

	// Container pour l'observer
	let scrollContainer: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = Number(entry.target.getAttribute('data-index'));
						if (!isNaN(index)) activeStepIndex = index;
					}
				});
			},
			{
				// If embed, we observe the internal container, otherwise the global viewport
				root: format === 'embed' ? scrollContainer : null,
				// Active detection zone in the center
				rootMargin: '-45% 0px -45% 0px',
				threshold: 0
			}
		);

		stepElements.forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<!-- 
    ROOT CONTAINER
    We use CSS Grid to overlay the background (charts) and the foreground (text).
    In 'embed' mode: we force internal scrolling on this element.
-->
<div
	bind:this={scrollContainer}
	class="relative w-full bg-theme-bg grid grid-cols-1 grid-rows-1 {format === 'embed'
		? 'h-full overflow-y-scroll scroll-smooth hide-scrollbar overscroll-contain snap-y snap-mandatory'
		: ''}"
>
	{#if format === 'embed'}
		<div class="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
			<div
				class="h-full bg-theme-primary transition-all duration-300 ease-out"
				style:width="{((activeStepIndex + 1) / steps.length) * 100}%"
			></div>
		</div>
	{/if}

	<!-- 
		LAYER 1 : CHARTS (STICKY)
		Colle en haut du conteneur grid.
		h-screen : Prend toute la hauteur disponible (de l'écran ou de l'iframe).
	-->
	<div class="col-start-1 row-start-1 sticky top-0 w-full h-[100dvh] overflow-hidden z-0">
		<div class="relative w-full h-full">
			{#each uniqueDwCharts as chartId (chartId)}
				<div
					class="absolute inset-0 w-full h-full transition-opacity duration-500 bg-white"
					style:visibility={currentStep.vizType === 'datawrapper' &&
					currentStep.vizProps.chartId === chartId
						? 'visible'
						: 'hidden'}
					class:opacity-100={currentStep.vizType === 'datawrapper' &&
						currentStep.vizProps.chartId === chartId}
					class:opacity-0={currentStep.vizProps.chartId !== chartId}
				>
					<DatawrapperChart {chartId} />
				</div>
			{/each}

			{#if currentStep && currentStep.vizType !== 'datawrapper'}
				<div class="absolute inset-0 w-full h-full z-10 bg-theme-bg">
					<VizContainer step={currentStep} />
				</div>
			{/if}
		</div>
	</div>

	<!-- 
		LAYER 2 : TEXTE (SCROLLABLE)
		Superposé via Grid (col 1, row 1).
		z-index supérieur pour passer au-dessus.
		Pointer-events-none pour laisser passer les clics vers le chart si besoin.
	-->
	<div class="col-start-1 row-start-1 z-10 w-full pointer-events-none">
		<!-- Spacer -->
		<div class={format === 'embed' ? 'h-[80vh]' : 'h-[50vh]'}></div>

		{#each steps as step, i}
			<section
				bind:this={stepElements[i]}
				data-index={i}
				class="
					flex items-center justify-center p-4
					{format === 'embed' ? 'min-h-[150vh] snap-center' : 'min-h-screen md:justify-start md:pl-12'}
				"
			>
				<div
					class="text-box
						w-[90%] md:w-[80%] max-w-lg
						bg-white/90 backdrop-blur-sm
						shadow-lg border border-theme-border/20 rounded-lg
						p-6 md:p-8 text-lg font-light leading-relaxed text-theme-text
						pointer-events-auto
						transition-all duration-500
						{activeStepIndex === i ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}
					"
				>
					{@html step.content}
				</div>
			</section>
		{/each}

		<!-- Spacer -->
		<div class={format === 'embed' ? 'h-[80vh]' : 'h-[60vh]'}></div>
	</div>
</div>

<style>
	:global(.text-box) {
		pointer-events: auto !important;
	}

	:global(.text-box p:not(:last-child)) {
		margin-bottom: 1.25rem;
	}

	/* Ensure Grid takes full height in embed mode */
	:global(.embed-mode) {
		height: 100%;
	}

	/* Force specific height layout for embed mode */
	:global(.embed-mode html),
	:global(.embed-mode body),
	:global(.embed-mode main) {
		height: 100% !important;
		overflow: hidden !important;
		margin: 0 !important;
		padding: 0 !important;
	}

	/* Hide scrollbar for cleaner UX */
	.hide-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
