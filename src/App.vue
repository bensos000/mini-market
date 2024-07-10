<script setup lang="ts">
import { computed } from 'vue'
import Nav from './components/Nav.vue'
import { useCartStore } from './store/cart'
import { useProductStore } from './store/product'
import { baseUrl } from './routes'

const productStore = useProductStore()
const cartStore = useCartStore()

productStore.fetchAll()

const count = computed(() => cartStore.count)

</script>

<template>
  <div class="drawer">
    <input id="drawer-input" type="checkbox" class="drawer-toggle">
    <div class="bg-base-100 text-base-content min-h-screen drawer-content">
      <Nav />
      <router-view />
    </div>
    <div class="drawer-side">
      <label for="drawer-input" class="drawer-overlay" />
      <ul class="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">
        <li>
          <router-link :to="`${baseUrl}`">
            Home
          </router-link>
        </li>
        <li>
          <router-link :to="`${baseUrl}cart`">
            Cart
            <div class="badge ml-2 badge-outline" v-text="count" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>