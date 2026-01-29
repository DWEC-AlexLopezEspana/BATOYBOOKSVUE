import { reactive } from "vue";
import api from "../services/api.js";
import { defineStore } from "pinia";

export const useModulosStore = defineStore('modulos', {

    state: () => ({
        modulos: [],
        debug: true,
    }),

    actions: {
        async allModulos() {
            if (this.debug) console.log("allModulos triggered");
            this.modulos = await api.modulos.getAll();
        },
        async oneModulo(idModulo) {
            if (this.debug) console.log("oneModulo triggered", idModulo);
            return await api.modulos.getOne(idModulo);
        },
        async addModulo(modulo) {
            if (this.debug) console.log("addModulo triggered with ", modulo);
            const nuevoModulo = await api.modulos.create(modulo);
            this.modulos.push(nuevoModulo);
        },
        async removeModulo(idModulo) {
            if (this.debug)
                console.log("removeModulo triggered with id ", idModulo);

            await api.modulos.delete(idModulo);
            this.modulos = this.modulos.filter(l => l.id !== idModulo);
        },
        async updateModulo(modulo) {
            if (this.debug) console.log("updateModulo triggered");

            const actualizado = await api.modulos.modify(modulo);
            const index = this.modulos.findIndex(l => l.id === modulo.id);
            if (index !== -1) this.modulos[index] = actualizado;
        }
    }
})