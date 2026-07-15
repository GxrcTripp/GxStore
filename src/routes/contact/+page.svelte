<script lang="ts">
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');

	let status = $state<'idle' | 'sending' | 'sent'>('idle');

	let mouseX = $state(0);
	let mouseY = $state(0);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		status = 'sending';

		setTimeout(() => {
			status = 'sent';
			setTimeout(() => {
				status = 'idle';
				firstName = '';
				lastName = '';
				email = '';
				phone = '';
				message = '';
			}, 3000);
		}, 1500);
	}

	function handleMouseMove(e: MouseEvent) {
		mouseX = (e.clientX / window.innerWidth) - 0.5;
		mouseY = (e.clientY / window.innerHeight) - 0.5;
	}
</script>

<style>
	.glass-panel {
		background: rgba(30, 11, 54, 0.4);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(221, 183, 255, 0.1);
		transition: border-color 0.5s ease, box-shadow 0.5s ease;
	}
	.neon-glow {
		box-shadow: 0 0 15px rgba(221, 183, 255, 0.3);
	}
	.neon-glow:hover {
		box-shadow: 0 0 25px rgba(221, 183, 255, 0.5);
	}
	.contact-input:focus {
		box-shadow: 0 0 0 2px rgba(221, 183, 255, 0.2);
		border-color: #ddb7ff;
	}
</style>

<svelte:window onmousemove={handleMouseMove} />

<main class="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen max-w-container-max mx-auto relative bg-background text-on-background">
	<div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-section-gap items-center">
		
		<div class="flex flex-col gap-stack-lg">
			<div>
				<h1 class="font-headline-xl text-headline-xl text-primary mb-stack-sm">Get in Touch</h1>
				<p class="text-on-surface-variant font-body-lg max-w-md">
					Have a question about our elite digital hub? Our team of specialists is ready to provide the high-performance support you need.
				</p>
			</div>
			
			<div class="flex flex-col gap-stack-md mt-stack-lg">
				<div class="glass-panel p-stack-md rounded-xl flex items-start gap-stack-md hover:border-primary/40" style="transform: perspective(1000px) rotateY({mouseX * 2}deg) rotateX({-mouseY * 2}deg)">
					<div class="bg-primary-container/20 p-3 rounded-lg text-primary">
						<span class="material-symbols-outlined">location_on</span>
					</div>
					<div>
						<h3 class="font-label-md text-primary uppercase tracking-widest">Address</h3>
						<p class="text-on-surface mt-1">1280 Digital Plaza, Suite 404<br/>Silicon Valley, CA 94025</p>
					</div>
				</div>

				<div class="glass-panel p-stack-md rounded-xl flex items-start gap-stack-md hover:border-primary/40" style="transform: perspective(1000px) rotateY({mouseX * 2}deg) rotateX({-mouseY * 2}deg)">
					<div class="bg-primary-container/20 p-3 rounded-lg text-primary">
						<span class="material-symbols-outlined">call</span>
					</div>
					<div>
						<h3 class="font-label-md text-primary uppercase tracking-widest">Phone</h3>
						<p class="text-on-surface mt-1">+1 (555) 010-NEON</p>
					</div>
				</div>

				<div class="glass-panel p-stack-md rounded-xl flex items-start gap-stack-md hover:border-primary/40" style="transform: perspective(1000px) rotateY({mouseX * 2}deg) rotateX({-mouseY * 2}deg)">
					<div class="bg-primary-container/20 p-3 rounded-lg text-primary">
						<span class="material-symbols-outlined">mail</span>
					</div>
					<div>
						<h3 class="font-label-md text-primary uppercase tracking-widest">Email</h3>
						<p class="text-on-surface mt-1">hq@neoncore.digital</p>
					</div>
				</div>
			</div>

			<div class="mt-stack-lg overflow-hidden rounded-xl border border-white/5 h-48 relative">
				<img class="w-full h-full object-cover opacity-60" alt="Futuristic high-tech command center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCNZO7R5R3MjhDnzd3iHDNOjpvkAoO28bQ3T_TLPNl_2Uv-bPTmaYNl7kuVbz_IQnk8ciSAjLAZjwvwA84qMy-8vAeYbQbuWKEoNAiwFZJmhaTwk3iIFK89FiouShspeq9zCH0P2LR9Kp-VBQsXb62QgN613TyxKfYnaJSrNk3reWP9DRtHyJgIVGWWlsXknkaMlRLPSebrEzRJMQysY6226qNHJGtNejTlbOihDTeiYUqCCc9vWxW4_BV8kTJNzWEuiEc_G6rzuU"/>
				<div class="absolute inset-0 bg-linear-to-t from-[#0F0716] to-transparent"></div>
			</div>
		</div>

		<div class="glass-panel p-stack-lg rounded-xl border border-primary/10 shadow-2xl relative overflow-hidden" style="transform: perspective(1000px) rotateY({mouseX * 2}deg) rotateX({-mouseY * 2}deg)">
			<div class="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full"></div>
			
			<form onsubmit={handleSubmit} class="flex flex-col gap-stack-md relative z-10">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
					<div class="flex flex-col gap-1">
						<label class="text-label-md text-on-surface-variant ml-1" for="firstName">First Name</label>
						<input id="firstName" bind:value={firstName} required class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:ring-0 focus:outline-none focus:border-primary contact-input transition-all" placeholder="John" type="text"/>
					</div>
					<div class="flex flex-col gap-1">
						<label class="text-label-md text-on-surface-variant ml-1" for="lastName">Last Name</label>
						<input id="lastName" bind:value={lastName} required class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:ring-0 focus:outline-none focus:border-primary contact-input transition-all" placeholder="Doe" type="text"/>
					</div>
				</div>
				
				<div class="flex flex-col gap-1">
					<label class="text-label-md text-on-surface-variant ml-1" for="email">Email Address</label>
					<input id="email" bind:value={email} required class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:ring-0 focus:outline-none focus:border-primary contact-input transition-all" placeholder="john.doe@example.com" type="email"/>
				</div>
				
				<div class="flex flex-col gap-1">
					<label class="text-label-md text-on-surface-variant ml-1" for="phone">Phone Number</label>
					<input id="phone" bind:value={phone} required class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:ring-0 focus:outline-none focus:border-primary contact-input transition-all" placeholder="+1 (555) 000-0000" type="tel"/>
				</div>
				
				<div class="flex flex-col gap-1">
					<label class="text-label-md text-on-surface-variant ml-1" for="message">Message (Optional)</label>
					<textarea id="message" bind:value={message} class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:ring-0 focus:outline-none focus:border-primary contact-input transition-all resize-none" placeholder="How can we help you reach your core potential?" rows="4"></textarea>
				</div>
				
				<div class="mt-stack-sm">
					{#if status === 'idle'}
						<button class="w-full bg-primary text-on-primary font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all neon-glow" type="submit">
							<span>Send Message</span>
							<span class="material-symbols-outlined">send</span>
						</button>
					{:else if status === 'sending'}
						<button disabled class="w-full bg-primary text-on-primary font-bold py-4 rounded-lg flex items-center justify-center gap-2 opacity-80 cursor-not-allowed">
							<span class="material-symbols-outlined animate-spin">progress_activity</span>
							<span>Sending...</span>
						</button>
					{:else if status === 'sent'}
						<button disabled class="w-full bg-green-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300">
							<span class="material-symbols-outlined">check_circle</span>
							<span>Sent Successfully</span>
						</button>
					{/if}
				</div>
				
				<p class="text-center text-label-md text-on-surface-variant mt-stack-sm">
					By submitting, you agree to our <a class="text-primary hover:underline" href="/privacy">Privacy Policy</a>.
				</p>
			</form>
		</div>
	</div>
</main>
