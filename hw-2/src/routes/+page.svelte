<script lang="ts">
	import Button from '#lib/Button.svelte';
	import { authClient } from '#lib/auth.client';
	import { resolve } from '$app/paths';

	async function handleSSO() {
		await authClient.signIn.social({
			provider: 'google', 
			callbackURL: '/todos'
		});
	}
</script>

<div id="home">
	<h1>Christmas List 🎄</h1>
	<p>Login to view your lists!</p>
	<Button onclick={handleSSO}>Login with Google</Button>
	<p>Or <a href={resolve('/account')}>sign in with email</a></p>
</div>