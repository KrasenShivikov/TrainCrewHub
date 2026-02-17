import { renderPageShell } from './components/page/page.js';
import { initRouter } from './router.js';

const appRoot = document.getElementById('app');

function renderBootstrapFatalError(message) {
	if (!appRoot) {
		return;
	}

	appRoot.innerHTML = `
		<div class="container py-5">
			<div class="alert alert-danger" role="alert">
				<h4 class="alert-heading">Грешка при зареждане</h4>
				<p class="mb-2">${message}</p>
				<hr />
				<p class="mb-0">Ако това е Netlify deploy: провери Environment variables за <code>VITE_SUPABASE_URL</code> и <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> и пусни нов deploy.</p>
			</div>
		</div>
	`;
}

async function bootstrap() {
	await renderPageShell(appRoot);
	initRouter();
}

bootstrap().catch((error) => {
	const message = error instanceof Error ? error.message : String(error);
	console.error('App bootstrap failed:', error);
	renderBootstrapFatalError(message);
});
