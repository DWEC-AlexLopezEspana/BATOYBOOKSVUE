<script setup>

</script>

<template>
    <div class="formularioLibro" id="formularioLibro">
        <h2>Agregar Nuevo Libro</h2>
        <form action="">
            <div>
                <h4>ID:</h4>
                <input>
            </div>
            <div>
                <h4>Module:</h4>
                <select name="modulo" id="modulo" required>
                    <option value="">Seleccione un módulo</option>
                    <option value="Programación">Programación</option>
                    <option value="Base de Datos">Base de Datos</option>
                    <option value="Redes">Redes</option>
                    <option value="Sistemas">Sistemas</option>
                </select>
            </div>
            <div>
                <h4>Editorial:</h4>
                <input type="text" name="editorial" id="editorial" placeholder="Ingrese la editorial (libro)" required>
            </div>
            <div>
                <h4>Precio:</h4>
                <input type="number" name="precio" id="precio" min="0" step="0.01" placeholder="Precio del libro"
                    required>
            </div>
            <div>
                <h4>Páginas</h4>
                <input type="number" name="paginas" id="paginas" min="1" placeholder="Número de páginas" required>

            </div>
            <div>
                <h4>Estado</h4>
                <label>
                    <input type="radio" name="estado" value="Nuevo">
                    Nuevo
                </label>

                <label>
                    <input type="radio" name="estado" value="Bueno">
                    Bueno
                </label>

                <label>
                    <input type="radio" name="estado" value="Malo">
                    Malo
                </label>

                <label>
                    <input type="radio" name="estado" value="Digital">
                    Digital
                </label>
            </div>
            <div>
                <h4 for="comentario">Comentarios</h4>
                <textarea id="comentario" name="comentario" rows="4" cols="50">Escribe tu comentario aquí...
                </textarea>
            </div>
            <div>
                <button>Guardar</button>
                <button>Reset</button>

            </div>

        </form>
    </div>
</template>
