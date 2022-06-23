<template>
    <div class="flex flex-column container-personagens">
        <div class="flex flex-column lg:flex-row justify-content-between align-items-center p-2 sticky top-0 bg-white z-1">
            Quantidade de personagens: {{ info.count }}
            <Paginator @page="page" :first="1" :rows="info.count / info.pages" :totalRecords="info.count"></Paginator>
            <span class="p-float-label p-input-icon-right">
                <i class="pi pi-search"></i>
                <InputText id="pesquisar" type="text" v-model="searchValue" />
                <label for="pesquisar">Pesquisar</label>
            </span>
        </div>
        <div>
            <div class="grid" v-if="personagens && personagens.length > 0">
                <div class="col-12 lg:col-4" v-for="(personagem, index) in personagens" :key="index">
                    <Card class="p-2 surface-700 text-white">
                        <template #title>
                            {{ personagem.name }}
                        </template>
                        <template #content>
                            <div class="grid">
                                <div class="col-12 lg:col-4">
                                    <img width="100" :src="personagem.image" :alt="personagem.name">
                                </div>
                                <div class="col-12 lg:col-8">
                                    <ul>
                                        <li>Espécie: <span class="font-bold">{{ personagem.species }}</span></li>
                                        <li v-if="personagem.type">Tipo: <span class="font-bold">{{ personagem.type }}</span></li>
                                        <li>Gênero: <span class="font-bold">{{ personagem.gender }}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                        <template #footer>
                            <div class="flex justify-content-between align-items-center">
                                <span>Quantidade de episodios: {{ personagem.episode.length }}</span>
                                <font-awesome-icon v-if="personagem.status == 'Alive'" icon="fa-solid fa-heart" />
                                <font-awesome-icon v-if="personagem.status == 'Dead'" icon="fa-solid fa-skull" />
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
            <div v-else>
                <div class="flex justify-content-center align-items-center">
                    <h1 class="text-4xl">Não foi encontrando nenhum personagem</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

var debounce = null;

export default {    
    name: 'Personagens',

    data() {
        return {
            personagens: [],
            searchValue: '',
            info: {
                count: 0,
                pages: 0,
                next: '',
                prev: null,
            },
            baseUrl: 'https://rickandmortyapi.com/api/character'
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
                this.personagens = response.data.results;
                this.info = response.data.info;
            }).catch(error => {
                this.personagens = [];
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
    .container-personagens {
        min-width: calc(100vw - 1rem);
    }
</style>