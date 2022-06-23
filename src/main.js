import { createApp } from 'vue'
import App from './App.vue'

// Importação biblioteca primevue
import PrimeVue from 'primevue/config'
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';

//Importação das páginas
import Home from './pages/Home.vue';
import Planetas from './pages/Planetas.vue';
import Personagens from './pages/Personagens.vue';

//Configuração da blibioteca vue-router
import * as VueRouter from 'vue-router';

const routes = [
    {
        path: '/', component: Home
    },
    {
        path: '/planetas', component: Planetas
    },
    {
        path: '/personagens', component: Personagens
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

//Criação da instância do App
const app = createApp(App);

// App use
app.use(PrimeVue);
app.use(router);

// App component
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('Paginator', Paginator);  

app.mount('#app')
