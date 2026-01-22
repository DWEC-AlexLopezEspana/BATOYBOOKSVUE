<script setup>
import { computed, defineProps, onMounted } from 'vue';
import { store as modulos } from '../stores/modulos.js';






const props = defineProps({
    libro: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['borrarLibro','editLibro']);

onMounted(async () => {
    await modulos.allModulos();
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();         
    const month = date.getMonth() + 1;  
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;  
};
const nombreModulo = computed(() => {
    const mod = modulos.state.modulos.find(m => m.code === props.libro.idModule);
    return mod ? mod.cliteral : 'Módulo desconocido';
});

const delLibro = () =>{
    emit('borrarLibro', props.libro.id);
}
const editLibro = () =>{
    emit('editLibro',props.libro);
}




</script>

<template>
    <div class="cardLibro">
        <p>Libro:{{ libro.id }}</p>
        <p><strong>{{ nombreModulo }}</strong></p>
        <p><strong>{{ libro.publisher }}</strong></p>
        <p>{{ libro.pages }} páginas</p>
        <p>Estado:{{ libro.status }}</p>

        <div>
            <p v-if="libro.soldDate">Vendido el {{ formatDate(libro.soldDate) }}</p>
            <p v-else>
                No vendido aún
            </p>
        </div>

        <p v-if="libro.comments">{{ libro.comments }}</p>

        <div>
            <p>{{ libro.price }}€</p>
        </div>
        <button>🛒</button>
        <button @click="editLibro">✏️</button>
        <button @click="delLibro">🗑️</button>
    </div>

</template>

<style scoped>
.cardLibro {
    width: 250px;
    height: 400px;
    border-radius: 8px;
    background-color: #ffb6c1;
    margin: 10px;
    padding: 15px;
    box-sizing: border-box;
    box-shadow: 0 4px 6px rgb(0,0,0,0.1);
    transition: transform 0.2s;
    display: inline-block;
}
.cardLibro:hover{
    transform: translateY(-5px);
}
</style>
