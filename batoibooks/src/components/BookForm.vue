<script setup>
import { computed, reactive, watch } from 'vue'
import { useModulosStore } from '../stores/modulos.js'
import { useLibrosStore } from '../stores/libros.js'
import { useRoute, useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

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

const schema = yup.object({
  idModule: yup
    .string()
    .required('El módulo es obligatorio'),

  publisher: yup
    .string()
    .required('La editorial es obligatoria'),

  price: yup
    .number()
    .typeError('El precio debe ser un número')
    .required('El precio es obligatorio')
    .min(0, 'El precio no puede ser negativo'),

  pages: yup
    .number()
    .typeError('Las páginas deben ser un número')
    .required('El número de páginas es obligatorio')
    .integer('Las páginas deben ser un número entero')
    .min(0, 'Las páginas no pueden ser negativas'),

  status: yup
    .string()
    .required('El estado es obligatorio')
})


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

  if (!esEdicion.value) {
    const duplicado = librosStore.libros.find(
      l =>
        l.idModule === libro.idModule &&
        l.publisher === libro.publisher
    )

    if (duplicado) {
      alert('Este libro ya existe para este usuario')
      return
    }
  }

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

    <Form :validation-schema="schema" @submit="crearLibro">
      <div>
        <h4>ID:</h4>
        <input placeholder="ID del libro" v-model="libro.id" readonly />
      </div>

      <div>
        <h4>Module:</h4>
        <Field name="idModule" as="select" v-model="libro.idModule" required>
          <option value="">Selecciona un módulo</option>
          <option v-for="modulo in modulosStore.modulos" :key="modulo.id" :value="modulo.code">
            {{ modulo.cliteral }}
          </option>
        </Field>
        <ErrorMessage name="idModule" />
      </div>

      <div>
        <h4>Editorial:</h4>
        <Field name="publisher" type="text" placeholder="Ingrese la editorial (libro)" v-model="libro.publisher"
          required />
        <ErrorMessage name="publisher" />
      </div>

      <div>
        <h4>Precio:</h4>
        <Field name="price" type="number" min="0" step="0.01" placeholder="Precio del libro" v-model="libro.price"
          required />
        <ErrorMessage name="price" />
      </div>

      <div>
        <h4>Páginas</h4>
        <Field name="pages" type="number" min="1" placeholder="Número de páginas" v-model="libro.pages" required />
        <ErrorMessage name="pages" />
      </div>

      <div>
        <h4>Estado</h4>
        <label>
          <Field type="radio" name="status" value="new" v-model="libro.status" /> Nuevo
        </label>
        <label>
          <Field type="radio" name="status" value="good" v-model="libro.status" /> Bueno
        </label>
        <label>
          <Field type="radio" name="status" value="bad" v-model="libro.status" /> Malo
        </label>
        <label>
          <Field type="radio" name="status" value="digital" v-model="libro.status" /> Digital
        </label>
        <ErrorMessage name="status" />
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
    </Form>
  </div>
</template>
<style scoped>
.formularioLibro {
  max-width: 650px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.formularioLibro h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

/* Grupos */
.formularioLibro>form>div {
  margin-bottom: 1.2rem;
}

.formularioLibro h4 {
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #34495e;
}

/* Inputs */
.formularioLibro input,
.formularioLibro select,
.formularioLibro textarea {
  width: 100%;
  padding: 0.55rem 0.65rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.formularioLibro input:focus,
.formularioLibro select:focus,
.formularioLibro textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.formularioLibro input[readonly] {
  background-color: #f4f4f4;
  cursor: not-allowed;
}

/* Radios */
.formularioLibro label {
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
}

.formularioLibro input[type="radio"] {
  margin-right: 0.4rem;
}

/* Errores de validación */
.formularioLibro .error,
.formularioLibro span {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}

/* Botones */
.formularioLibro button {
  padding: 0.55rem 1.2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  margin-right: 0.5rem;
  transition: background-color 0.2s, transform 0.1s;
}

.formularioLibro button[type="submit"] {
  background-color: #42b983;
  color: white;
}

.formularioLibro button[type="submit"]:hover {
  background-color: #36a174;
  transform: translateY(-1px);
}

.formularioLibro button[type="reset"] {
  background-color: #bdc3c7;
  color: #2c3e50;
}

.formularioLibro button[type="reset"]:hover {
  background-color: #aab2b7;
}

/* Responsive */
@media (max-width: 600px) {
  .formularioLibro {
    padding: 1.5rem;
  }

  .formularioLibro label {
    display: block;
    margin-bottom: 0.4rem;
  }
}
</style>
