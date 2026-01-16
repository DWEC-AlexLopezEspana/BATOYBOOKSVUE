<script setup>
import BookItem from './BookItem.vue';
import { computed, onMounted } from 'vue';
import { store as libros } from '../stores/libros.js';




const totalLibros = computed(() => libros.state.libros.length);

const totalImporte = computed(() => {
  return libros.state.libros.reduce((acc, libro) => {
    return acc + (libro.price || 0); // si no hay price, suma 0
  }, 0);
});


onMounted(async () => {
    await libros.allLibros();
});
const borrarLibro = async (idLibro) => {
    await libros.removeLibro(idLibro);
}

</script>


<template>
    <div class="cardsContainer">
        <BookItem v-for="libro in libros.state.libros" :key="libro.id" :libro="libro" @borrarLibro="borrarLibro" />
    </div>
    <p class="totalLibros">Total de libros:{{ totalLibros }}</p>
    <p class="totalImporte">Importe Total:{{totalImporte}}€</p>
</template>


<style scoped>
.cardsContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 20px;
}

.totalLibros,
.totalImporte {
    margin-top: 20px;
    font-weight: bold;
}
</style>
