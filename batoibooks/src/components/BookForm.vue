<script setup>
import { computed, reactive, watch } from 'vue'
import { useModulosStore } from '../stores/modulos.js'
import { useLibrosStore } from '../stores/libros.js'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const modulosStore = useModulosStore()
const librosStore = useLibrosStore()

// Formulario reactivo
const libro = reactive({
  id: null,
  idModule: '',
  publisher: '',
  price: 0,
  pages: 0,
  status: 'new',
  comments: '',
  photo: '',
  soldDate: ''
})

// Computed del id de la ruta
const id = computed(() => route.params.id)

// Watch sobre el id de la ruta
watch(
  id,
  async (nuevoId) => {
    if (nuevoId) {
      // Editando libro
      const libroFinal = await librosStore.oneLibro(nuevoId)
      if (libroFinal) {
        librosStore.setLibroEnEdicion(libroFinal)
      }
    } else {
      // Nuevo libro
      librosStore.limpiarLibroEnEdicion()
    }
  },
  { immediate: true }
)

// Watch sobre libroEnEdicion para sincronizar el formulario
watch(
  () => librosStore.libroEnEdicion,
  (nuevo) => {
    if (!nuevo) {
      // Limpiar formulario
      Object.assign(libro, {
        id: null,
        idModule: '',
        publisher: '',
        price: 0,
        pages: 0,
        status: 'new',
        comments: '',
        photo: '',
        soldDate: ''
      })
    } else {
      // Llenar formulario con libro a editar
      Object.assign(libro, nuevo)
    }
  },
  { immediate: true }
)

// Computed para saber si es edición
const esEdicion = computed(() => librosStore.libroEnEdicion !== null)

// Generar nuevo ID
const generarId = () => {
  if (librosStore.libros.length === 0) return 1
  const maxId = Math.max(...librosStore.libros.map(l => Number(l.id) || 0))
  return maxId + 1
}

// Guardar o actualizar libro
const crearLibro = async () => {
  if (esEdicion.value) {
    await librosStore.updateLibro(libro)
    librosStore.limpiarLibroEnEdicion()
  } else {
    libro.id = String(generarId())
    await librosStore.addLibro(libro)
  }
  resetearFormulario()
}

// Reset del formulario
const resetearFormulario = () => {
  Object.assign(libro, {
    id: null,
    idModule: '',
    publisher: '',
    price: 0,
    pages: 0,
    status: 'new',
    comments: '',
    photo: '',
    soldDate: ''
  })
  librosStore.limpiarLibroEnEdicion()
  router.push('/')
}
</script>

<template>
  <div class="formularioLibro" id="formularioLibro">
    <h2 v-if="!esEdicion">Agregar Nuevo Libro</h2>
    <h2 v-else>Actualizar Libro</h2>

    <form @submit.prevent="crearLibro">
      <div>
        <h4>ID:</h4>
        <input placeholder="ID del libro" v-model="libro.id" readonly />
      </div>

      <div>
        <h4>Module:</h4>
        <select v-model="libro.idModule" required>
          <option value="">Selecciona un módulo</option>
          <option v-for="modulo in modulosStore.modulos" :key="modulo.id" :value="modulo.code">
            {{ modulo.cliteral }}
          </option>
        </select>
      </div>

      <div>
        <h4>Editorial:</h4>
        <input type="text" placeholder="Ingrese la editorial (libro)" v-model="libro.publisher" required />
      </div>

      <div>
        <h4>Precio:</h4>
        <input type="number" min="0" step="0.01" placeholder="Precio del libro" v-model="libro.price" required />
      </div>

      <div>
        <h4>Páginas</h4>
        <input type="number" min="1" placeholder="Número de páginas" v-model="libro.pages" required />
      </div>

      <div>
        <h4>Estado</h4>
        <label><input type="radio" value="new" v-model="libro.status" /> Nuevo</label>
        <label><input type="radio" value="good" v-model="libro.status" /> Bueno</label>
        <label><input type="radio" value="bad" v-model="libro.status" /> Malo</label>
        <label><input type="radio" value="digital" v-model="libro.status" /> Digital</label>
      </div>

      <div>
        <h4>Comentarios</h4>
        <textarea v-model="libro.comments" rows="4" cols="50" placeholder="Escribe tu comentario aquí..."></textarea>
      </div>

      <div>
        <button type="submit" v-if="esEdicion">Actualizar</button>
        <button type="submit" v-else>Guardar</button>
        <button type="reset" @click="resetearFormulario">Reset</button>
      </div>
    </form>
  </div>
</template>
