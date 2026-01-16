import { reactive } from "vue";
import api from "../services/api.js";

export const store = {
    debug: true,
    state: reactive({
        familias: [],
    }),

    async allFamilias() {
        if (this.debug) console.log("allFamilias triggered");
        this.state.familias = await api.familias.getAll();
    },
    async oneFamilia(idFamilia) {
        if (this.debug) console.log("oneFamilia triggered", idFamilia);
       return await api.familias.getOne(idFamilia);
    },
    async addFamilia(familia) {
        if (this.debug) console.log("addFamilia triggered with ", familia);
        const nuevoFamilia = await api.familias.create(familia);
        this.state.familias.push(nuevoFamilia);
    },
    async removeFamilia(idFamilia) {
        if (this.debug)
            console.log("removeFamilia triggered with id ", idFamilia);

        await api.familias.delete(idFamilia);
        this.state.familias = this.state.familias.filter(l => l.id !== idFamilia);
    },
    async updateFamilia(familia) {
        if (this.debug) console.log("updateFamilia triggered");

        const actualizado = await api.familias.modify(familia);
        const index = this.state.familias.findIndex(l => l.id === familia.id);
        if (index !== -1) this.state.familias[index] = actualizado;
    }


}