<script lang="ts">
	import Scroller from '@sveltejs/svelte-scroller';
	import type { StoryStep } from '$lib/types';
	import VizContainer from './VizContainer.svelte';
	import DatawrapperChart from './DatawrapperChart.svelte';

	export let steps: StoryStep[] = [];
	export let format: 'standalone' | 'embed' = 'standalone';

	let index = 0;
	let offset = 0;
	let progress = 0;

	// On ajuste l'index car Scroller commence à 0 avec le spacer
	$: activeStepIndex = Math.max(0, index - 1);
	$: currentStep = steps[activeStepIndex] || steps[0];

	// Liste unique des graphiques pour le preloading (évite les duplications)
	$: uniqueDwCharts = [
		...new Set(
			steps
				.filter((s) => s.vizType === 'datawrapper' && s.vizProps.chartId)
				.map((s) => s.vizProps.chartId as string)
		)
	];
</script>

<div class="relative w-full overflow-x-hidden bg-theme-bg">
	<Scroller top={0} bottom={0} bind:index bind:offset bind:progress>
		<!-- BACKGROUND : Fixé à l'écran pendant le scroll -->
		<div slot="background" class="w-full h-screen relative z-0">
			<div
				class="absolute inset-0 {format === 'embed'
					? ''
					: 'md:left-auto md:right-0 md:w-[60%]'} h-full"
			>
				<!-- Pile de graphiques (Seul le graphique actif est visible) -->
				{#each uniqueDwCharts as chartId (chartId)}
					<div
						class="absolute inset-0 w-full h-full transition-opacity duration-500"
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

				<!-- Autres types de visualisations -->
				{#if currentStep && currentStep.vizType !== 'datawrapper'}
					<div class="absolute inset-0 w-full h-full z-10">
						<VizContainer step={currentStep} />
					</div>
				{/if}
			</div>
		</div>

		<!-- FOREGROUND : Le texte qui défile -->
		<div slot="foreground" class="relative z-10 pointer-events-none w-full">
			<!-- Spacer initial pour laisser voir le premier graphique -->
			<section class="h-[80vh]"></section>

			{#each steps as step, i}
				<section
					class="min-h-[100vh] flex items-center justify-center {format === 'embed'
						? ''
						: 'md:justify-start md:pl-8'}"
				>
					<div
						class="text-box
                w-[90%] md:w-[80%] max-w-lg
                bg-white/85 backdrop-blur-md
                shadow-xl border border-theme-border/20 rounded-lg
                p-6 md:p-8 text-lg font-light leading-relaxed text-theme-text
                transition-all duration-500
                pointer-events-auto
                {index === i + 1 ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-10'}
              "
					>
						{@html step.content}
					</div>
				</section>
			{/each}

			<!-- Spacer final -->
			<section class="h-[20vh]"></section>
		</div>
	</Scroller>
</div>

<style>
	/* 
       IMPORTANT pour les embeds CMS : 
       Le fond doit être "sticky" même dans une iframe.
    */
	:global(svelte-scroller-background) {
		z-index: 0 !important;
	}

	:global(svelte-scroller-foreground) {
		z-index: 10 !important;
		pointer-events: none !important;
	}

	.text-box {
		pointer-events: auto !important;
	}
</style>
