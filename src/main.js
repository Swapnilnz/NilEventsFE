import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';

import PrimeVue from 'primevue/config';
import Input from 'primevue/inputtext';

import 'primevue/resources/themes/md-light-deeppurple/theme.css'
import 'primevue/resources/primevue.min.css'           //core css
import 'primeicons/primeicons.css'                       //icons


const app = createApp(App);
app.use(PrimeVue);
app.use(router);

// COMPONENTS
app.component('p-input', Input)


app.mount('#app')
