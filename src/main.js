import { renderPageShell } from './components/page/page.js';
import { initRouter } from './router.js';

const appRoot = document.getElementById('app');

async function bootstrap() {
	await renderPageShell(appRoot);
	initRouter();
}

bootstrap();
