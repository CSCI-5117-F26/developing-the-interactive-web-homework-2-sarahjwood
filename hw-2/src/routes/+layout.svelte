<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import Button from '#lib/Button.svelte';

	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/">Home</a> | <a href="/todos">Todos</a> | <a href="/done">Completed</a>
</nav>
<main>
	<h1>Christmas List 🎄</h1>
	<p>Login to view your lists!</p>
	<Button>Login</Button>
{@render children()}
</main>

<style>
main {
	display: flex;
	justify-content: center;
}
</style>