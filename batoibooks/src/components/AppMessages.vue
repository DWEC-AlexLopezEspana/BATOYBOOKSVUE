<script setup>
import { useLibrosStore } from '../stores/libros.js'

const librosStore = useLibrosStore()

const borrarMensaje = (id) => {
  librosStore.mensajes = librosStore.mensajes.filter(m => m.id !== id)
}
</script>

<template>
  <div
    v-for="mensaje in librosStore.mensajes"
    :key="mensaje.id"
    class="mensaje"
    :class="mensaje.tipo"
  >
    <p>{{ mensaje.texto }}</p>
    <button @click="borrarMensaje(mensaje.id)">X</button>
  </div>
</template>

<style scoped>
.mensaje {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
}

.error {
  background-color: red;
}

.info {
  background-color: aquamarine;
}

.mensaje button {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #000;
  margin-left: 10px;
}
</style>
