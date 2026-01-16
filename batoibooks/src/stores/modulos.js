import { reactive } from "vue";
import api from "../services/api.js";

export const store = {
    debug: true,
    state: reactive({
        modulos: [],
    }),

    async allModulos() {
        if (this.debug) console.log("allModulos triggered");
        this.state.modulos = await api.modulos.getAll();
    },
    async oneModulo(idModulo) {
        if (this.debug) console.log("oneModulo triggered", idModulo);
       return await api.modulos.getOne(idModulo);
    },
    async addModulo(modulo) {
        if (this.debug) console.log("addModulo triggered with ", modulo);
        const nuevoModulo = await api.modulos.create(modulo);
        this.state.modulos.push(nuevoModulo);
    },
    async removeModulo(idModulo) {
        if (this.debug)
            console.log("removeModulo triggered with id ", idModulo);

        await api.modulos.delete(idModulo);
        this.state.modulos = this.state.modulos.filter(l => l.id !== idModulo);
    },
    async updateModulo(modulo) {
        if (this.debug) console.log("updateModulo triggered");

        const actualizado = await api.modulos.modify(modulo);
        const index = this.state.modulos.findIndex(l => l.id === modulo.id);
        if (index !== -1) this.state.modulos[index] = actualizado;
    }


}