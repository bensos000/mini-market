<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useCartStore } from '../store/cart'
import { useProductStore } from '../store/product'
import type { Product } from '../models/product'
import { toCurrency } from '../utils'

import CartCardSkeleton from '../components/CartCardSkeleton.vue'

const cartStore = useCartStore()
const productStore = useProductStore()

const route = useRoute()

const product = computed<Product>(
  () => productStore.items[route.params.productId as string],
)
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="!productStore.loaded">
      <CartCardSkeleton />
    </div>
    <div v-else-if="product" class="card lg:card-side bordered">
      <figure class="px-10 pt-10">
        <img
          :src="product.image"
          alt="Card Image"
          class="object-contain w-full h-64"
        >
      </figure>
      <div class="card-body">
        <h2 class="card-title" v-text="product.title" />
        <p v-text="product.description" />
        <p> 
          Category : {{ product.category }}
        </p>
        <p> 
          Rating : {{ product.rating.rate }}/5
        </p>
        <p class="mt-4 text-lg">
          {{ toCurrency(product.price) }}
        </p>
        <div class="card-actions">
          <button class="btn btn-primary" @click="cartStore.increment(product.id)">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-xl text-error">
        No product found with id {{ route.params.productId }}
      </h1>
    </div>
  </div>
</template>