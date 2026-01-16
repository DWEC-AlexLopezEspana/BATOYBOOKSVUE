<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav>
        <ul>
            <li><a href="#acerca-de">Ver Libros</a></li>
            <li><a href="#formularioLibro">Añadir Libro</a></li>
            <li><a href="#acerca-de">Acerca de...</a></li>
        </ul>
    </nav>

    <RouterView />
</template>
