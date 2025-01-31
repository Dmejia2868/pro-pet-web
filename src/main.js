import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa scripts de Bootstrap

const app = createApp(App);
app.use(router);
app.mount('#app');
