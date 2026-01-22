<script setup>
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue';
import BooksList from './views/BooksList.vue';
import BookForm from './components/BookForm.vue';
import AppAbout from './views/AppAbout.vue';
</script>

<template>
  <header>
  <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />

    <div class="wrapper">
      <h1>BatoiBooks</h1>
      <AppMenu />
    </div>

  </header>
  <main>

    <AppMessages />

    <router-view></router-view>
  </main>

</template>

