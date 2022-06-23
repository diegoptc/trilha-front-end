<script setup>
</script>

<template>
  <div class="flex flex-column">
    <Menubar :model="items">
      <template #start>
        <img src="@/assets/logo.png" alt="Rick and Morty Logo" height="50">
      </template>
    </Menubar>
    <div class="container flex mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            label: 'Principal',
            icon: 'pi pi-home',
            command: () => {
              this.$router.push('/');
            }
          },
          {
            label: 'Planetas',
            icon: 'pi pi-globe',
            command: () => {
              this.$router.push('/planetas');
            }
          },
          {
            label: 'Personagens',
            icon: 'pi pi-users',
            command: () => {
              this.$router.push('/personagens');
            }
          }
        ]
      }
    }
  }
</script>

<style>
@import 'assets/reset.css';
@import 'primevue/resources/themes/md-light-indigo/theme.css';
@import 'primevue/resources/primevue.min.css';
@import 'primeicons/primeicons.css';
@import 'primeflex/primeflex.min.css';

.container {
  min-height: calc(100vh - 87px - 1rem);
}

.grid {
  margin: 0;
  padding: 0;
}
</style>
