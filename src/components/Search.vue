<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "../store/product";
import { baseUrl } from "../routes";
import { toCurrency } from "../utils";

const productStore = useProductStore();
const router = useRouter();
const input = ref("");

const searchResults = computed(() => {
  if (!input.value) return [];

  return productStore.list.filter((item) => {
    return item.title.toLowerCase().includes(input.value.toLowerCase());
  });
});

const navigate = (id: number) => {
  input.value = "";
  router.push(`${baseUrl}product/${id}`);
};
</script>

<template>
  <div class="dropdown dropdown-end">
    <div class="form-control">
      <input
        v-model="input"
        type="search"
        placeholder="Search a product name..."
        class="input input-ghost"
        :disabled="!productStore.loaded"
      />
    </div>
    <ul
      v-if="searchResults.length"
      class="shadow menu dropdown-content bg-base-100 rounded-box w-96 text-base-content overflow-y-scroll"
      style="max-height: 50vh; z-index: 1"
    >
      <li v-for="product in searchResults" :key="product.id">
        <a href="#" @click.prevent="navigate(product.id)">
          <div class="flex flex-row">
            <div class="flex-none w-14">
              <img
              :src="product.image"
              alt="Product Image"
              class="w-8 h-8 mr-5"
            />
            </div>
            <div class="flex-1 w-64">
              <h2 class="text-sm">{{ product.title }}</h2>
            </div>
            <div class="flex-1 w-32">
              <p class="font-bold">{{ toCurrency(product.price) }}</p>
            </div>
           
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
