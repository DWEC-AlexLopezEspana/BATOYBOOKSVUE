// stores/index.js
import { store as storeLibros } from './libros.js';
import { store as storeCursos } from './cursos.js';
import { store as storeFamilias } from './familias.js';
import { store as storeModulos } from './modulos.js';
import { store as storeUsuarios } from './usuarios.js';
import { store as storeVentas } from './ventas.js';

export const stores = {
  libros: storeLibros,
  cursos: storeCursos,
  familias: storeFamilias,
  modulos: storeModulos,
  usuarios: storeUsuarios,
  ventas: storeVentas,
};
