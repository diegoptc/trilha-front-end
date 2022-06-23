<template>
    <div class="flex flex-column container-planetas">
        <div class="flex flex-column lg:flex-row justify-content-between align-items-center p-2 sticky top-0 bg-white z-1">
            Quantidade de planetas: {{ info.count }}
            <Paginator @page="page" :first="1" :rows="info.count / info.pages" :totalRecords="info.count"></Paginator>
            <span class="p-float-label p-input-icon-right">
                <i class="pi pi-search"></i>
                <InputText id="pesquisar" type="text" v-model="searchValue" />
                <label for="pesquisar">Pesquisar</label>
            </span>
        </div>
        <div>
            <div class="grid" v-if="planetas && planetas.length > 0">
                <div class="col-12 lg:col-3" v-for="(planeta, index) in planetas" :key="index">
                    <Card class="p-2">
                        <template #title>
                            {{ planeta.name }}
                        </template>
                        <template #content>
                            <ul>
                                <li>Tipo: <span class="font-bold">{{ planeta.type }}</span></li>
                                <li>Dimensão: <span class="font-bold">{{ planeta.dimension }}</span></li>
                            </ul>
                        </template>
                        <template #footer>
                            <div class="flex justify-content-between align-items-center">
                                <span>Quantidade de habitantes: <span class="font-bold">{{ planeta.residents.length }}</span></span>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
            <div v-else>
                <div class="flex justify-content-center align-items-center">
                    <h1 class="text-4xl">Não foi encontrando nenhum planeta</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

var debounce = null;

export default {    
    name: 'Planetas',

    data() {
        return {
            planetas: [],
            searchValue: '',
            info: {
                count: 0,
                pages: 0,
                next: '',
                prev: null,
            },
            baseUrl: 'https://rickandmortyapi.com/api/location'
        }
    },

    mounted() {
        this.getPlanetas();
    },

    methods: {
        getPlanetas(page, name) {
            const url = new URL(this.baseUrl);
            if (page) url.searchParams.append('page', page);
            if (name) url.searchParams.append('name', name);  
            axios.get(url.toString()).then((response) => {
                this.planetas = response.data.results;
                this.info = response.data.info;
            }).catch(error => {
                this.planetas = [];
                this.info = {
                    count: 0,
                    pages: 0,
                    next: '',
                    prev: null,
                }
            })
        },

        page(event) {
            const page = event.page += 1;
            this.getPlanetas(page, this.searchValue);
        },

        search(event) {
            
        }
    },

    watch: {
        searchValue: function(val, oldVal) {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                if (!val) {  
                    this.getPlanetas(1, val);
                    return;
                }
                this.getPlanetas(1, val);
            }, 500)
        }
    }
}
</script>

<style>
    .container-planetas {
        min-width: calc(100vw - 1rem);
    }
</style>