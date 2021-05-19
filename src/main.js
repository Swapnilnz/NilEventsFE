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
import Dialog from "primevue/dialog";
import FileUpload from "primevue/fileupload";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Message from "primevue/message";
import Password from 'primevue/password';
import Divider from "primevue/divider";
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import Calendar from 'primevue/calendar';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmPopup from 'primevue/confirmpopup';
import Textarea from "primevue/textarea";



import 'primevue/resources/themes/md-light-deeppurple/theme.css';
import 'primevue/resources/primevue.min.css';           //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);
app.use(PrimeVue, {ripple:true});
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);


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
app.component('p-dialog', Dialog);
app.component('p-file-upload', FileUpload);
app.component('p-toast', Toast);
app.component('p-message', Message);
app.component('p-password', Password);
app.component('p-divider', Divider);
app.component('p-number', InputNumber);
app.component('p-checkbox', Checkbox);
app.component('p-calender', Calendar);
app.component('p-confirm', ConfirmPopup);
app.component('p-textarea', Textarea);



app.mount('#app')
