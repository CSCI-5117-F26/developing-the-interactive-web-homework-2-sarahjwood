<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if data.user}
	<nav>
		<a href={resolve('/todos')}>Todos</a> |
		<a href={resolve('/done')}>Completed</a> |
		<a href={resolve('/account')}>Account</a>
	</nav>
{/if}
<main>
{@render children()}
</main>

<style>
main {
	display: flex;
	justify-content: center;
}
</style>