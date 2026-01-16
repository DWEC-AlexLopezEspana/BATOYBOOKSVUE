import { reactive } from "vue";
import api from "../services/api.js";

export const store = {
    debug: true,
    state: reactive({
        libros: [],
    }),

    async allLibros() {
        if (this.debug) console.log("allLibros triggered");
        this.state.libros = await api.libros.getAll();
    },
    async oneLibro(idLibro) {
        if (this.debug) console.log("oneLibro triggered", idLibro);
       return await api.libros.getOne(idLibro);
    },
    async addLibro(libro) {
        if (this.debug) console.log("addLibro triggered with ", libro);
        const nuevoLibro = await api.libros.create(libro);
        this.state.libros.push(nuevoLibro);
    },
    async removeLibro(idLibro) {
        if (this.debug)
            console.log("removeLibro triggered with id ", idLibro);

        await api.libros.delete(idLibro);
        this.state.libros = this.state.libros.filter(l => l.id !== idLibro);
    },
    async updateLibro(libro) {
        if (this.debug) console.log("updateLibro triggered");

        const actualizado = await api.libros.modify(libro);
        const index = this.state.libros.findIndex(l => l.id === libro.id);
        if (index !== -1) this.state.libros[index] = actualizado;
    }


}