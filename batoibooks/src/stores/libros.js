import { defineStore } from "pinia";
import api from "../services/api.js";

export const useLibrosStore = defineStore('libros', {
  state: () => ({
    debug: true,
    libros: [],
    libroEnEdicion: null,
    mensajes: []
  }),

  actions: {
    async allLibros() {
      try {
        if (this.debug) console.log("allLibros triggered");
        this.libros = await api.libros.getAll();
      } catch (error) {
        this.agregarMensaje("Error en allLibros: " + error, "error");
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
        this.libros.push(nuevoLibro);
      } catch (error) {
        this.agregarMensaje("Error al añadir libro: " + error, "error");
      }
    },

    async removeLibro(idLibro) {
      try {
        if (this.debug) console.log("removeLibro triggered with id", idLibro);
        await api.libros.delete(idLibro);
        this.libros = this.libros.filter(l => Number(l.id) !== Number(idLibro));
      } catch (error) {
        this.agregarMensaje(`Error al eliminar libro con id ${idLibro}: ${error}`, "error");
      }
    },

    async updateLibro(libro) {
      try {
        if (this.debug) console.log("updateLibro triggered", libro);
        const actualizado = await api.libros.modify(libro);
        const index = this.libros.findIndex(l => l.id === libro.id);
        if (index !== -1) this.libros[index] = actualizado;
      } catch (error) {
        this.agregarMensaje("Error al actualizar libro: " + error, "error");
      }
    },

    setLibroEnEdicion(libro) {
      if (this.debug) console.log("setLibroEnEdicion", libro);
      this.libroEnEdicion = { ...libro };
    },

    limpiarLibroEnEdicion() {
      this.libroEnEdicion = null;
    },

    agregarMensaje(texto, tipo) {
      const mensaje = {
        id: Date.now(),
        texto,
        tipo
      };
      this.mensajes.push(mensaje);

      setTimeout(() => {
        this.mensajes = this.mensajes.filter(m => m.id !== mensaje.id);
      }, 10000);
    }
  }
});
