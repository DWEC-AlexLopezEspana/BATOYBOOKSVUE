import { reactive } from "vue";
import api from "../services/api.js";

export const store = {
    debug: true,
    state: reactive({
        libros: [],
        libroEnEdicion: null,
        mensajes: [],
    }),

    async allLibros() {
        try {
            if (this.debug) console.log("allLibros triggered");
            this.state.libros = await api.libros.getAll();
        } catch (error) {
            this.agregarMensaje("Error en allLibros:" + error, "error");
        }
    },

    async oneLibro(idLibro) {
        try {
            if (this.debug) console.log("oneLibro triggered", idLibro);
            return await api.libros.getOne(idLibro);
        } catch (error) {
            this.agregarMensaje(`Error al obtener libro con id ${idLibro}: ${error}`, "error");
            return null;
        }
    },

    async addLibro(libro) {
        try {
            if (this.debug) console.log("addLibro triggered with", libro);
            const nuevoLibro = await api.libros.create(libro);
            this.state.libros.push(nuevoLibro);
        } catch (error) {
            this.agregarMensaje("Error al añadir libro:" + error, "error");
        }
    },

    async removeLibro(idLibro) {
        try {
            if (this.debug) console.log("removeLibro triggered with id", idLibro);
            await api.libros.delete(idLibro);
            const idNum = idLibro;
            this.state.libros = this.state.libros.filter(l => Number(l.id) !== Number(idNum));
        } catch (error) {
            this.agregarMensaje(`Error al eliminar libro con id ${idLibro}:${error}`, "error");
        }
    },

    async updateLibro(libro) {
        try {
            if (this.debug) console.log("updateLibro triggered", libro);
            const actualizado = await api.libros.modify(libro);
            const index = this.state.libros.findIndex(l => l.id === libro.id);
            if (index !== -1) this.state.libros[index] = actualizado;
        } catch (error) {
            this.agregarMensaje("Error al actualizar libro:" + error, "error");
        }
    },

    setLibroEnEdicio(libro) {
        if (this.debug) console.log("setLibroEnEdicion", libro);
        this.state.libroEnEdicion = { ...libro };
    },

    limpiarLibroEnEdicion() {
        this.state.libroEnEdicion = null;
    },
    agregarMensaje(mensajeTexto, tipo) {
        const mensaje = {
            id: Date.now(),
            texto: mensajeTexto,
            tipo: tipo
        };
        this.state.mensajes.push(mensaje);

        setTimeout(() => {
            this.state.mensajes = this.state.mensajes.filter(m => m.id !== mensaje.id);
        }, 10000);
    }

}
