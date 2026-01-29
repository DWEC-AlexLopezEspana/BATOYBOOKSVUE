<script setup>
import BookItem from '../components/BookItem.vue'
import { computed, onMounted } from 'vue'
import { useLibrosStore } from '../stores/libros.js'
import { useModulosStore } from '../stores/modulos.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const librosStore = useLibrosStore()
const modulosStore = useModulosStore()

// Total de libros
const totalLibros = computed(() => librosStore.libros.length)

// Total importe
const totalImporte = computed(() =>
  librosStore.libros.reduce((acc, libro) => acc + (libro.price || 0), 0)
)

// Cargar libros al montar
onMounted(async () => {
  if (!librosStore.libros.length) {
    await librosStore.allLibros()
  }
  if (!modulosStore.modulos.length) {
    await modulosStore.allModulos()
  }
})

// Funciones de acciones
const borrarLibro = async (idLibro) => {
  const respuesta = confirm(`¿Desea borrar el libro con ID:${idLibro}`)
  if (respuesta) {
    await librosStore.removeLibro(idLibro)
  }
}

const editLibro = async (libro) => {
  router.push(`/edit/${String(libro.id)}`)
}

const librosConModulos = computed(() => {
  return librosStore.libros.map((libro) => {
    const modulo = modulosStore.modulos.find(m => m.code === libro.idModule)
    return {
      ...libro,
      moduloDescripcion: modulo ? modulo.cliteral : 'Desconocido'
    }
  })
})

</script>

<template>
  <div class="cardsContainer">
    <BookItem v-for="libro in librosConModulos" :key="libro.id" :libro="libro" @borrarLibro="borrarLibro"
      @edit-libro="editLibro" />
  </div>

  <p class="totalLibros">Total de libros: {{ totalLibros }}</p>
  <p class="totalImporte">Importe Total: {{ totalImporte }}€</p>
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
