<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <!-- <nav>
        <ul>
            <li><a href="#acerca-de">Ver Libros</a></li>
            <li><a href="#formularioLibro">Añadir Libro</a></li>
            <li><a href="#acerca-de">Acerca de...</a></li>
        </ul>
    </nav>
    -->
    <nav>
        <ul>
            <router-link to="/" name="libros">Ver Libros</router-link>
            <router-link to="/nuevoLibro" name="nuevo">Nuevo Libro</router-link>
            <router-link to="/carrito" name="carrito">Ver Carrito</router-link>
            <router-link to="/about" name="about">Acerca de...</router-link>

        </ul>
    </nav>


</template>
<style>
nav {
    background-color: #7373ff;
    padding: 10px 20px;
}

ul {
    padding: 10px;

}

a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.3s;
}

a:hover {
    background-color: #3a3a5c;
}
</style>
