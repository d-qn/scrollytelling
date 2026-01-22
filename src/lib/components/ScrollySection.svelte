<script lang="ts">
	import Scroller from '@sveltejs/svelte-scroller';
	import type { StoryStep } from '$lib/types';
	import VizContainer from './VizContainer.svelte';

	export let steps: StoryStep[] = [];

	let index = 0;
	let offset = 0;
	let progress = 0;
	let width = 0;

	// Reactive derived value for the current step
	$: currentStep = steps[index] || steps[0];
</script>

<svelte:window bind:innerWidth={width} />

<div class="relative w-full">
	<Scroller top={0} bottom={0} bind:index bind:offset bind:progress>
		<div slot="background" class="h-screen w-full">
			<!-- 
          Mobile (<768px): fixed inset-0, z-0.
          Desktop (>=768px): absolute right-0 top-0 w-[60%] h-full. (Handled via container classes or sticky logic?)
          Svelte Scroller 'background' slot is usually fixed/sticky by the library. 
          We use CSS to position the inner content.
       -->
			<div
				class="absolute inset-0 md:left-auto md:right-0 md:w-[60%] h-full bg-lt-bg transition-all duration-300"
			>
				<!-- The Visualization Engine -->
				{#if currentStep}
					<VizContainer step={currentStep} />
				{/if}
			</div>
		</div>

		<div slot="foreground" class="relative z-10 w-full md:w-[40%] pointer-events-none">
			<!-- 
         Mobile: Full width, overlapping.
         Desktop: Left column.
       -->
			<div class="pb-[50vh]">
				<!-- Spacer -->
				{#each steps as step, i}
					<section
						class="
                min-h-screen
                flex items-center justify-center
                md:justify-start md:pl-8
                pointer-events-auto
            "
					>
						<!-- Text Box -->
						<div
							class="
                 w-[90%] md:w-[80%] max-w-lg
                 bg-white/90 backdrop-blur-sm
                 shadow-sm border border-lt-border rounded-sm
                 p-6 text-lg font-light leading-relaxed text-lt-text
                 transition-opacity duration-500
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
