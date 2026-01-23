<script>
	import '../app.css';
	import '@fontsource/inter/300.css';
	import '@fontsource/inter/500.css';
	import { onMount } from 'svelte';
	import pym from 'pym.js';

	onMount(() => {
		new pym.Child({ polling: 500 });
	});
</script>

<slot />
