import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import {createPinia} from "pinia";

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
