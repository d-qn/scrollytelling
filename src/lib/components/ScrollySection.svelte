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
	let width = 0;

	// Reactive derived value for the current step
	$: currentStep = steps[index] || steps[0];

	// Extract unique Datawrapper Chart IDs to preload
	$: uniqueDwCharts = [
		...new Set(
			steps
				.filter((s) => s.vizType === 'datawrapper' && s.vizProps.chartId)
				.map((s) => s.vizProps.chartId as string)
		)
	];
</script>

<svelte:window bind:innerWidth={width} />

<div class="relative w-full">
	<Scroller top={0} bottom={0} bind:index bind:offset bind:progress>
		<div slot="background" class="h-screen w-full relative z-0 pointer-events-auto">
			<!-- Background is explicitly interactive -->
			<div
				class="absolute inset-0 {format === 'embed'
					? ''
					: 'md:left-auto md:right-0 md:w-[60%]'} h-full bg-theme-bg transition-all duration-300 relative overflow-hidden"
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
					<div class="absolute inset-0 w-full h-full z-20 pointer-events-auto">
						<VizContainer step={currentStep} />
					</div>
				{/if}
			</div>
		</div>

		<div
			slot="foreground"
			class="relative z-10 {format === 'embed'
				? 'w-full'
				: 'w-full md:w-[40%]'} pointer-events-none"
		>
			<!-- 
         Foreground container is pointer-events-none to let clicks pass to the background (iframe).
         We only activate pointer-events on the text boxes themselves.
       -->
			<div class="pb-[50vh]">
				{#each steps as step, i}
					<section
						class="
                min-h-screen
                flex items-center justify-center
                {format === 'embed' ? '' : 'md:justify-start md:pl-8'}
                {i === 0 ? 'pt-[100vh]' : ''}
            "
					>
						<!-- Text Box -->
						<div
							class="
                 w-[90%] md:w-[80%] max-w-lg
                 bg-white/60 backdrop-blur-md
                 shadow-sm border border-theme-border rounded-sm
                 p-4 text-lg font-light leading-relaxed text-theme-text
                 transition-opacity duration-500
                 pointer-events-auto
                 {index === i ? 'opacity-100' : 'opacity-40'}
               "
						>
							{@html step.content}
						</div>
					</section>
				{/each}
			</div>
		</div>
	</Scroller>
</div>
