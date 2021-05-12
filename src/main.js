import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';

import PrimeVue from 'primevue/config';
import Input from 'primevue/inputtext';
import Menubar from "primevue/menubar";
import Galleria from 'primevue/galleria';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column"
import Carousel from "primevue/carousel";


import 'primevue/resources/themes/md-light-deeppurple/theme.css';
import 'primevue/resources/primevue.min.css';           //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);
app.use(PrimeVue, {ripple:true});
app.use(router);

// COMPONENTS
app.component('p-input', Input);
app.component('p-navbar', Menubar);
app.component('p-galleria', Galleria);
app.component('p-button', Button);
app.component('p-panel', Panel);
app.component('p-dropdown', Dropdown);
app.component('p-multiselect', MultiSelect);
app.component('p-dataview', DataView);
app.component('p-dataview-layout-options', DataViewLayoutOptions);
app.component('p-card', Card);
app.component('p-table', DataTable);
app.component('p-column', Column);
app.component('p-carousel', Carousel);



app.mount('#app')
