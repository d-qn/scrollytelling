<script lang="ts">
	import { onMount } from 'svelte';

	export let chartId: string;
	export let vizState: Record<string, any> | undefined = undefined;

	let iframe: HTMLIFrameElement;

	// Reactive: send postMessage when vizState updates
	$: if (iframe && vizState) {
		// Datawrapper typically expects generic messages or specific protocol.
		// Common pattern: sending external data or filtering.
		// Example: { "type": "filter", "column": "colName", "value": "val" }
		// Or external data update.
		// We assume vizState is the message payload or contains it.

		// Safety check for origin? Datawrapper generic logic:
		const contentWindow = iframe.contentWindow;
		if (contentWindow) {
			contentWindow.postMessage(vizState, '*');
			// Note: '*' is permissive, better validation recommended in prod if sensitive data.
		}
	}
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<iframe
		bind:this={iframe}
		title="Datawrapper Chart"
		src="https://datawrapper.dwcdn.net/{chartId}/"
		class="w-full h-full border-0"
		allowfullscreen
		scrolling="no"
	></iframe>
</div>
