import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Product from './pages/Product.vue'
import Cart from './pages/Cart.vue'

export const baseUrl = process.env.NODE_ENV === 'production' ? '/mini-market/' : '/'

const routes = [
  { path: `${baseUrl}`, component: Home },
  { path: `${baseUrl}product/:productId`, component: Product },
  { path: `${baseUrl}cart`, component: Cart },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})