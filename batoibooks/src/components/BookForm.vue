<script setup>
import { onMounted, reactive, ref } from 'vue';
import { store as modulos } from '../stores/modulos.js';
import { store as libros } from '../stores/libros.js';

onMounted(async () => {
    await modulos.allModulos();
    await libros.allLibros();
});

const nuevoLibro = reactive({
    id: null,
    idModule: '',
    publisher: '',
    price: 0,
    pages: 0,
    status: 'Nuevo',
    comments: '',
    photo: '',
    soldDate: ''
});



const resetearFormulario = () => {
        nuevoLibro.id= null,
        nuevoLibro.idModule= '',
        nuevoLibro.publisher= '',
        nuevoLibro.price= 0,
        nuevoLibro.pages= 0,
        nuevoLibro.status= 'Nuevo',
        nuevoLibro.comments= '',
        nuevoLibro.photo= '',
        nuevoLibro.soldDate= ''
}

const crearLibro = async () => {
    await libros.addLibro(nuevoLibro);
    resetearFormulario();
}

</script>

<template>
    <div class="formularioLibro" id="formularioLibro">
        <h2>Agregar Nuevo Libro</h2>
        <form @submit.prevent="crearLibro">
            <div>
                <h4>ID:</h4>
                <input placeholder="ID del libro">
            </div>
            <div>
                <h4>Module:</h4>
                <select v-model="nuevoLibro.idModule" required>
                    <option value="">Selecciona un módulo</option>
                    <option v-for="modulo in modulos.state.modulos" :key="modulo.id" :value="modulo.code">
                        {{ modulo.cliteral }}
                    </option>
                </select>

            </div>
            <div>
                <h4>Editorial:</h4>
                <input type="text" name="editorial" id="editorial" placeholder="Ingrese la editorial (libro)" required
                    v-model="nuevoLibro.publisher">
            </div>
            <div>
                <h4>Precio:</h4>
                <input type="number" name="precio" id="precio" min="0" step="0.01" placeholder="Precio del libro"
                    v-model="nuevoLibro.price" required>
            </div>
            <div>
                <h4>Páginas</h4>
                <input type="number" name="paginas" id="paginas" min="1" placeholder="Número de páginas"
                    v-model="nuevoLibro.pages" required>

            </div>
            <div>
                <h4>Estado</h4>
                <label><input type="radio" value="Nuevo" v-model="nuevoLibro.status">Nuevo</label>
                <label><input type="radio" value="Bueno" v-model="nuevoLibro.status">Bueno</label>
                <label><input type="radio" value="Malo" v-model="nuevoLibro.status">Malo</label>
                <label><input type="radio" value="Digital" v-model="nuevoLibro.status">Digital</label>
            </div>
            <div>
                <h4 for="comentario">Comentarios</h4>
                <textarea v-model="nuevoLibro.comments" rows="4" cols="50" placeholder="Escribe tu comentario aquí..."></textarea>
            </div>
            <div>
                <button type="submit">Guardar</button>
                <button type="reset" @click="resetearFormulario">Reset</button>

            </div>

        </form>
    </div>
</template>
