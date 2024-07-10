<script setup lang="ts">
import { computed, ref } from "vue"
import ProductCard from "../components/ProductCard.vue"
import Filters from "../components/Filters.vue"
import ProductCardSkeleton from "../components/ProductCardSkeleton.vue"
import { useProductStore } from "../store/product"

const productStore = useProductStore()
const priceFilter = ref()
const categoryFilter = ref()

const products = computed(() => productStore.list)

const filteredProducts = computed(() => {
  let productsList = products.value
  if (priceFilter.value) {
    productsList = productsList.filter(product => {
      return product.price >= priceFilter.value.min && product.price <= priceFilter.value.max
    })
  }

  if (categoryFilter.value) {
    productsList = productsList.filter(product => product.category === categoryFilter.value)
  }

  return productsList
})

const filterByPrice = (price: { min: number, max: number }) => {
  priceFilter.value = price
}

const filterByCategory = (category: string) => {
  categoryFilter.value = category
}

</script>

<template>
  <div class="flex flex-row">
    <aside class="w-full p-6 sm:w-60 md:w-80 lg:w-96 dark:bg-gray-50 dark:text-gray-800">
      <nav class="space-y-8 text-sm">
        <div class="space-y-2">
          <Filters @filter-by-price="filterByPrice" @filter-by-category="filterByCategory" />
        </div>
      </nav>
    </aside>
    <div class="p-4 max-w-7xl mx-auto">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ProductCardSkeleton v-for="n in 10" v-show="!productStore.loaded" :key="n" />
        <ProductCard v-if="!filteredProducts.length" v-for="product in products" :key="product.id" :product="product" />
        <ProductCard v-if="filteredProducts.length" v-for="product in filteredProducts" :key="product.id"
          :product="product" />
      </div>
    </div>
  </div>

</template>
