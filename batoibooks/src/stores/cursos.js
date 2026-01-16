import { reactive } from "vue";
import api from "../services/api.js";

export const store = {
    debug: true,
    state: reactive({
        cursos: [],
    }),

    async allCursos() {
        if (this.debug) console.log("allCursos triggered");
        this.state.cursos = await api.cursos.getAll();
    },
    async oneCurso(idCurso) {
        if (this.debug) console.log("oneCurso triggered", idCurso);
       return await api.cursos.getOne(idCurso);
    },
    async addCurso(curso) {
        if (this.debug) console.log("addCurso triggered with ", curso);
        const nuevoCurso = await api.cursos.create(curso);
        this.state.cursos.push(nuevoCurso);
    },
    async removeCurso(idCurso) {
        if (this.debug)
            console.log("removeCurso triggered with id ", idCurso);

        await api.cursos.delete(idCurso);
        this.state.cursos = this.state.cursos.filter(l => l.id !== idCurso);
    },
    async updateCurso(curso) {
        if (this.debug) console.log("updateCurso triggered");

        const actualizado = await api.cursos.modify(curso);
        const index = this.state.cursos.findIndex(l => l.id === curso.id);
        if (index !== -1) this.state.cursos[index] = actualizado;
    }


}