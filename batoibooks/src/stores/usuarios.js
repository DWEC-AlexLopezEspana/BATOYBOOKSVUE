import { reactive } from "vue";
import api from "../services/api.js";

export const store = {
    debug: true,
    state: reactive({
        usuarios: [],
    }),

    async allUsuarios() {
        if (this.debug) console.log("allUsuarios triggered");
        this.state.usuarios = await api.usuarios.getAll();
    },
    async oneUsuario(idUsuario) {
        if (this.debug) console.log("oneUsuario triggered", idUsuario);
       return await api.usuarios.getOne(idUsuario);
    },
    async addUsuario(usuario) {
        if (this.debug) console.log("addUsuario triggered with ", usuario);
        const nuevoUsuario = await api.usuarios.create(usuario);
        this.state.usuarios.push(nuevoUsuario);
    },
    async removeUsuario(idUsuario) {
        if (this.debug)
            console.log("removeUsuario triggered with id ", idUsuario);

        await api.usuarios.delete(idUsuario);
        this.state.usuarios = this.state.usuarios.filter(l => l.id !== idUsuario);
    },
    async updateUsuario(usuario) {
        if (this.debug) console.log("updateUsuario triggered");

        const actualizado = await api.usuarios.modify(usuario);
        const index = this.state.usuarios.findIndex(l => l.id === usuario.id);
        if (index !== -1) this.state.usuarios[index] = actualizado;
    }


}