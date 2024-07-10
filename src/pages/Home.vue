<script setup lang="ts">
import { computed } from "vue";
import ProductCard from "../components/ProductCard.vue";
import Filters from "../components/Filters.vue";
import ProductCardSkeleton from "../components/ProductCardSkeleton.vue";
import { useProductStore } from "../store/product";

const productStore = useProductStore();

const products = computed(() => {
  if (productStore.filtering) return productStore.filteredList;
  return productStore.list;
});
</script>

<template>
  <div class="flex flex-row">
    <aside class="p-6 sm:w-60 dark:bg-gray-50 dark:text-gray-800">
      <nav class="space-y-8 text-sm">
        <div class="space-y-2">
          <Filters />
        </div>
      </nav>
    </aside>
    <div class="p-4 max-w-7xl mx-auto">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ProductCardSkeleton
          v-for="n in 10"
          v-show="!productStore.loaded"
          :key="n"
        />
        <div v-if="!products.length">
          <h1 class="text-xl">No item Found.</h1>
        </div>
        <ProductCard
          v-if="products.length"
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>
