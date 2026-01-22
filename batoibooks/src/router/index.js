import App from '@/App.vue'
import BookForm from '@/components/BookForm.vue'
import AppAbout from '@/views/AppAbout.vue'
import BooksList from '@/views/BooksList.vue'
import CarritoBook from '@/views/CarritoBook.vue'
import PathNotFound from '@/views/PathNotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'libros',
      component: BooksList

    },
    {
      path: '/nuevoLibro',
      name: 'nuevo',
      component: BookForm
    },
    {
      path: '/edit/:id',
      name: 'editar',
      component: BookForm,

    },
    {
      path: '/carrito',
      name: 'carrito',
      component: CarritoBook
    },

    {
      path: '/about',
      name: 'about',
      component: AppAbout
    },
    {
      path: '/:pathMatch(.*)*',
      component: PathNotFound
    },
  ],
})

export default router
