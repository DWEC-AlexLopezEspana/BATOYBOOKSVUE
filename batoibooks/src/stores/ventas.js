import { reactive } from "vue";
import api from "../services/api.js";

export const store = {
    debug: true,
    state: reactive({
        ventas: [],
    }),

    async allVentas() {
        if (this.debug) console.log("allVentas triggered");
        this.state.ventas = await api.ventas.getAll();
    },
    async oneVenta(idVenta) {
        if (this.debug) console.log("oneVenta triggered", idVenta);
       return await api.ventas.getOne(idVenta);
    },
    async addVenta(venta) {
        if (this.debug) console.log("addVenta triggered with ", venta);
        const nuevoVenta = await api.ventas.create(venta);
        this.state.ventas.push(nuevoVenta);
    },
    async removeVenta(idVenta) {
        if (this.debug)
            console.log("removeVenta triggered with id ", idVenta);

        await api.ventas.delete(idVenta);
        this.state.ventas = this.state.ventas.filter(l => l.id !== idVenta);
    },
    async updateVenta(venta) {
        if (this.debug) console.log("updateVenta triggered");

        const actualizado = await api.ventas.modify(venta);
        const index = this.state.ventas.findIndex(l => l.id === venta.id);
        if (index !== -1) this.state.ventas[index] = actualizado;
    }


}