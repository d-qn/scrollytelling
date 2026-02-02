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

	// Because we added an empty section at the start for the spacer,
	// the actual content index is index - 1.
	$: activeStepIndex = Math.max(0, index - 1);
	$: currentStep = steps[activeStepIndex] || steps[0];

	// Extract unique Datawrapper Chart IDs to preload
	$: uniqueDwCharts = [
		...new Set(
			steps
				.filter((s) => s.vizType === 'datawrapper' && s.vizProps.chartId)
				.map((s) => s.vizProps.chartId as string)
		)
	];
</script>

<div class="relative w-full overflow-x-hidden interactivity-fix">
	<Scroller top={0} bottom={0} bind:index bind:offset bind:progress>
		<div slot="background" class="h-screen w-full relative z-0">
			<div
				class="absolute inset-0 {format === 'embed'
					? ''
					: 'md:left-auto md:right-0 md:w-[60%]'} h-full bg-theme-bg"
			>
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
						class:z-10={currentStep.vizType === 'datawrapper' &&
							currentStep.vizProps.chartId === chartId}
					>
						<DatawrapperChart {chartId} />
					</div>
				{/each}

				{#if currentStep && currentStep.vizType !== 'datawrapper'}
					<div class="absolute inset-0 w-full h-full z-20">
						<VizContainer step={currentStep} />
					</div>
				{/if}
			</div>
		</div>

		<div slot="foreground" class="relative z-10 pointer-events-none w-full">
			<!-- 
        Direct children of foreground slot are counted by Scroller. 
        1. Spacer section 
      -->
			<section class="min-h-screen"></section>

			<!-- 2. Content sections -->
			{#each steps as step, i}
				<section
					class="min-h-screen flex items-center justify-center {format === 'embed'
						? ''
						: 'md:justify-start md:pl-8'}"
				>
					<div
						class="
                w-[90%] md:w-[80%] max-w-lg
                bg-white/70 backdrop-blur-md
                shadow-sm border border-theme-border rounded-sm
                p-5 text-lg font-light leading-relaxed text-theme-text
                transition-opacity duration-500
                pointer-events-auto
                {index === i + 1 ? 'opacity-100' : 'opacity-30'}
              "
					>
						{@html step.content}
					</div>
				</section>
			{/each}
		</div>
	</Scroller>
</div>

<style>
	/* 
     This is the secret sauce for interaction: 
     The scroller's background slot is often wrapped in a div by the library.
     We ensure pointer-events are allowed on the background container.
  */
	:global(.interactivity-fix [slot='background']) {
		pointer-events: auto !important;
	}
	:global(.interactivity-fix [slot='foreground']) {
		pointer-events: none !important;
	}
</style>
