import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import { createApp } from 'vue';
import store from '@/vuex/store'
import App from './App.vue';

const app = createApp(App);
app.use(store);
app.mount('#app');
