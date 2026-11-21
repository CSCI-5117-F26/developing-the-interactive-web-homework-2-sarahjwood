<script lang="ts">
	import { authClient } from '#lib/auth.client.ts';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const session = authClient.useSession();

	let email = $state('');
	let pass = $state('');
	let remember_me = $state(false);
</script>

<div>
	{#if $session.data}
		<div>
			<p>{$session.data.user.name}</p>
			<button
				onclick={async () => {
					await authClient.signOut();
					await goto(resolve('/'), { invalidateAll: true });
				}}
			>
				Sign Out
			</button>
		</div>
	{:else}
		<h1>Sign in</h1>
		<input bind:value={email} placeholder="email" />
		<input bind:value={pass} placeholder="password" type="password" />
		<input type="checkbox" bind:checked={remember_me} />
		<button
			onclick={async () => {
				const { error } = await authClient.signIn.email({
					email,
					password: pass,
					rememberMe: remember_me
				});
				if (!error) {
					await goto(resolve('/todos'), { invalidateAll: true });
				}
			}}
		>
			Log in
		</button>
		<p>Don't have an account? <a href={resolve('/account/register')}>Sign up</a></p>
	{/if}
</div>
      