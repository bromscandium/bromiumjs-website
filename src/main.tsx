import { createApp, createRouter } from 'bromium';
import { routes } from './routes.generated';
import App from './App';
import { initializeTheme } from './store/theme';
import './styles/global.css';

initializeTheme();

createRouter({
  routes,
  base: '/bromiumjs-website',
});

const app = createApp(App, {
  favicon: 'favicon.svg',
});
app.mount('#app');
