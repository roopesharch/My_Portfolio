<script>
	import { page } from '$app/state'; 

	let { isOpen = $bindable(false) } = $props();

	const menuItems = [
		{ id: 'home', label: 'HOME', icon: 'fa-house-laptop', path: '/' },
		{ id: 'about', label: 'ABOUT', icon: 'fa-user-tie', path: '/about' },
		{ id: 'projects', label: 'PROJECTS', icon: 'fa-microchip', path: '/projects' },
		{ id: 'skills', label: 'SKILLS', icon: 'fa-screwdriver-wrench', path: '/skills' },
		{ id: 'experience', label: 'EXPERIENCE', icon: 'fa-code-branch', path: '/experience' },
		{ id: 'certificates', label: 'CERTIFICATES', icon: 'fa-shield-halved', path: '/certificates' },
		{ id: 'contact', label: 'CONTACT ME', icon: 'fa-satellite-dish', path: '/contact' }
	];

	const socials = [
		{ id: 'whatsapp', icon: 'fa-brands fa-whatsapp', link: '#' },
		{ id: 'call', icon: 'fa-solid fa-phone', link: '#' },
		{ id: 'email', icon: 'fa-solid fa-envelope', link: '#' },
		{ id: 'linkedin', icon: 'fa-brands fa-linkedin-in', link: '#' },
		{ id: 'github', icon: 'fa-brands fa-github', link: '#' }
	];
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;500;800;900&display=swap" rel="stylesheet">
</svelte:head>

<button class="mobile-hamburger {isOpen ? 'active' : ''}" onclick={() => isOpen = !isOpen}>
	<span></span><span></span><span></span>
</button>

<nav class="side-menu {isOpen ? 'mobile-open' : ''}">
	<div class="menu-logo-container">
		<img src="/img/logo.png" alt="Logo" class="menu-sidebar-logo lite-logo">
		<img src="/img/gold_logo.png" alt="Logo" class="menu-sidebar-logo dark-logo">
	</div>

	<ul class="menu-list">
		{#each menuItems as item}
			<li class="menu-item {page.url.pathname === item.path ? 'current-path' : ''}">
				<a href={item.path} onclick={() => isOpen = false}>
					<i class="fa-solid {item.icon}"></i>
					<span>{item.label}</span>
				</a>
			</li>
		{/each}
	</ul>

	<div class="resume-capsule-wrapper">
		<a href="/resume/Resume.pdf" download="Resume.pdf" class="resume-capsule">
			<i class="fa-solid fa-file-pdf"></i>
			<span class="resume-text">RESUME</span>
		</a>
	</div>

	<div class="menu-socials">
		{#each socials as social}
			<a href={social.link} target="_blank"><i class={social.icon}></i></a>
		{/each}
	</div>
</nav>

<style>
	.side-menu {
		position: fixed;
		left: 0; top: 0; width: 260px; height: 100vh;
		z-index: 50; background: #ffffff;
		border-right: 1px solid rgba(0, 0, 0, 0.05);
		display: flex; flex-direction: column;
		transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
	}

	:global(.dark) .side-menu { background: #0a0a0a; border-right: 1px solid rgba(212, 175, 55, 0.2); }

	.menu-logo-container { width: 100%; padding: 35px 0 20px 0; display: flex; justify-content: center; position: relative; }
	.menu-sidebar-logo { width: 85%; transition: opacity 0.5s; }
	.dark-logo { position: absolute; opacity: 0; }
	:global(.dark) .lite-logo { opacity: 0; }
	:global(.dark) .dark-logo { opacity: 1; }

	.menu-list { list-style: none; padding: 0; margin: 0; }
	.menu-item { padding: 14px 0 14px 40px; transition: all 0.3s ease; position: relative; }
	
	.menu-item a {
		font-family: 'Exo 2', sans-serif; display: flex; align-items: center; gap: 15px;
		font-weight: 800; font-size: 0.85rem; color: #444; text-decoration: none;
	}
	:global(.dark) .menu-item a { color: #e0e0e0; }
	
	/* Refined Darker Purple for List Icons */
	.menu-item i { width: 20px; font-size: 1.1rem; color: #4B0082; } 
	:global(.dark) .menu-item i { color: #FFD700; }

	/* Shining Gold Highlight Bar */
	.current-path { 
		background: linear-gradient(90deg, #D4AF37, #FFF2AD, #D4AF37); 
		box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
	}
	.current-path a, .current-path i { color: #ffffff !important; }

	.menu-list:hover .current-path:not(:hover) { background: transparent; box-shadow: none; }
	.menu-list:hover .current-path:not(:hover) a { color: #444; }
	:global(.dark) .menu-list:hover .current-path:not(:hover) a { color: #e0e0e0; }

	.menu-item:hover {
		background: linear-gradient(90deg, #D4AF37, #FFF2AD, #D4AF37) !important;
		transform: translateX(5px);
	}
	.menu-item:hover a, .menu-item:hover i { color: #ffffff !important; }

	/* --- RESUME CAPSULE --- */
	.resume-capsule-wrapper { margin-top: auto; padding-bottom: 30px; display: flex; justify-content: center; }
	.resume-capsule {
		display: flex; align-items: center; gap: 12px; padding: 10px 30px; border-radius: 50px; 
		border: 1.8px solid #D4AF37; transition: all 0.4s ease; text-decoration: none;
	}
	
	/* 10% More Dark Purple in Gradient */
	.resume-text { 
		font-family: 'Exo 2'; font-weight: 900; font-size: 0.85rem; letter-spacing: 1.5px;
		background: linear-gradient(90deg, #4B0082, #D4AF37); 
		-webkit-background-clip: text; -webkit-text-fill-color: transparent;
	}
	.resume-capsule i { color: #4B0082; font-size: 1.1rem; }

	/* Hover: Shining Gold (Lite Mode) */
	.resume-capsule:hover {
		background: linear-gradient(135deg, #FFF2AD 0%, #D4AF37 50%, #B38728 100%);
		transform: translateY(-3px); box-shadow: 0 8px 20px rgba(212, 175, 55, 0.5); border-color: #FFF2AD;
	}
	.resume-capsule:hover .resume-text, .resume-capsule:hover i { color: #fff !important; -webkit-text-fill-color: #fff; }
	
	/* Hover: Dark Purple (Dark Mode) */
	:global(.dark) .resume-capsule:hover { background: linear-gradient(135deg, #6A0DAD, #4B0082, #2E004F); border-color: #6A0DAD; }

	/* --- SOCIALS --- */
	.menu-socials { padding: 20px 10px; display: flex; justify-content: space-evenly; border-top: 1px solid rgba(212, 175, 55, 0.1); }
	
	.menu-socials i { 
		font-size: 1.8rem; 
		color: #4B0082; /* 10% Darker Purple */
		transition: 0.4s; 
	}
	:global(.dark) .menu-socials i { color: #D4AF37; }
	
	.menu-socials a:hover i { 
		transform: translateY(-8px) scale(1.15); 
		color: #D4AF37; /* Shining Gold on Hover */
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
	}
	:global(.dark) .menu-socials a:hover i { color: #8A2BE2; }

	/* --- MOBILE --- */
	.mobile-hamburger { display: none; }
	@media (max-width: 768px) {
		.mobile-hamburger {
			display: flex; position: fixed; top: 20px; left: 20px; z-index: 100;
			width: 40px; height: 40px; background: #ffffff; border: 1px solid #D4AF37;
			border-radius: 50%; flex-direction: column; justify-content: center; align-items: center; gap: 4px;
		}
		:global(.dark) .mobile-hamburger { background: #111; }
		.mobile-hamburger span { width: 20px; height: 2px; background: #D4AF37; transition: 0.3s; }
		.mobile-hamburger.active span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
		.mobile-hamburger.active span:nth-child(2) { opacity: 0; }
		.mobile-hamburger.active span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
		.side-menu { transform: translateX(-100%); }
		.side-menu.mobile-open { transform: translateX(0); box-shadow: 10px 0 30px rgba(0,0,0,0.2); }
	}
</style>