<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { store as modulos } from '../stores/modulos.js';
import { store as libros } from '../stores/libros.js';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute();

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
});
const id = route.params.id;


onMounted(async () => {
    await modulos.allModulos();
    await libros.allLibros();
    if(id){
        const libroFinal = await libros.oneLibro(id);
        if(libroFinal){
            Object.assign(libro, libroFinal);
            libros.setLibroEnEdicio(libroFinal);
        }
    }


});


const esEdicion = computed(() => libros.state.libroEnEdicion !== null);





const resetearFormulario = () => {
    Object.assign(libro,{
        id: null,
        idModule: '',
        publisher: '',
        price: 0,
        pages: 0,
        status: 'new',
        comments: '',
        photo: '',
        soldDate: ''
    });
    libros.limpiarLibroEnEdicion();
    router.push('/')
}
const generarId = () => {
    if (libros.state.libros.length === 0) return 1;
    const maxId = Math.max(...libros.state.libros.map(l => l.id || 0));
    return maxId + 1;
}


const crearLibro = async () => {
    if (esEdicion.value) {
        await libros.updateLibro(libro);
        libros.limpiarLibroEnEdicion();
    } else {
        libro.id = String(generarId());
        await libros.addLibro(libro);
    }

    resetearFormulario();
}


</script>

<template>
    <div class="formularioLibro" id="formularioLibro">
        <h2 v-if="!esEdicion">Agregar Nuevo Libro</h2>
        <h2 v-else>Actualizar Libro</h2>
        <form @submit.prevent="crearLibro">
            <div>
                <h4>ID:</h4>
                <input placeholder="ID del libro" v-model="libro.id" readonly>
            </div>
            <div>
                <h4>Module:</h4>
                <select v-model="libro.idModule" required>
                    <option value="">Selecciona un módulo</option>
                    <option v-for="modulo in modulos.state.modulos" :key="modulo.id" :value="modulo.code">
                        {{ modulo.cliteral }}
                    </option>
                </select>

            </div>
            <div>
                <h4>Editorial:</h4>
                <input type="text" name="editorial" id="editorial" placeholder="Ingrese la editorial (libro)" required
                    v-model="libro.publisher">
            </div>
            <div>
                <h4>Precio:</h4>
                <input type="number" name="precio" id="precio" min="0" step="0.01" placeholder="Precio del libro"
                    v-model="libro.price" required>
            </div>
            <div>
                <h4>Páginas</h4>
                <input type="number" name="paginas" id="paginas" min="1" placeholder="Número de páginas"
                    v-model="libro.pages" required>

            </div>
            <div>
                <h4>Estado</h4>
                <label><input type="radio" value="new" v-model="libro.status">Nuevo</label>
                <label><input type="radio" value="good" v-model="libro.status">Bueno</label>
                <label><input type="radio" value="bad" v-model="libro.status">Malo</label>
                <label><input type="radio" value="digital" v-model="libro.status">Digital</label>
            </div>
            <div>
                <h4 for="comentario">Comentarios</h4>
                <textarea v-model="libro.comments" rows="4" cols="50"
                    placeholder="Escribe tu comentario aquí..."></textarea>
            </div>
            <div>
                <button type="submit" v-if="esEdicion">Actualizar</button>
                <button type="submit" v-else>Guardar</button>
                <button type="reset" @click="resetearFormulario">Reset</button>

            </div>

        </form>
    </div>
</template>
