import { createRouter, createWebHistory } from 'vue-router'
import NuevaCompraView from '../views/NuevaCompraView.vue'
import HistorialView from '../views/HistorialView.vue'
import EditarTransaccionView from '../views/EditarTransaccionView.vue'
import VerTransaccionView from '../views/VerTransaccionView.vue'
import NuevoClienteView from '../views/NuevoClienteView.vue'
import ClientesView from '../views/ClientesView.vue'
import EditarClienteView from '../views/EditarClienteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'nueva-compra',
    component: NuevaCompraView,
  },
  {
    path: '/historial',
    name: 'historial',
    component: HistorialView,
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: EditarTransaccionView,
  },
  {
    path: '/ver/:id',
    name: 'ver-transaccion',
    component: VerTransaccionView
  },
  {
  path: '/clientes/nuevo',
  name: 'nuevo-cliente',
  component: NuevoClienteView
},
{
  path: '/clientes',
  name: 'clientes',
  component: ClientesView
},
{
    path: '/clientes/editar/:id',
    name: 'editar-cliente',
    component: EditarClienteView
}
],
})

export default router