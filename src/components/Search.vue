<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "../store/product";
import { baseUrl } from "../routes";

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
        type="text"
        placeholder="Search a product name..."
        class="input input-ghost"
        :disabled="!productStore.loaded"
      />
    </div>
    <ul
      v-if="searchResults.length > 0"
      class="shadow menu dropdown-content bg-base-100 rounded-box w-64 text-base-content overflow-y-scroll"
      style="max-height: 50vh; z-index: 1"
    >
      <li v-for="product in searchResults" :key="product.id">
        <a
          href="#"
          @click.prevent="navigate(product.id)"
          v-text="product.title"
        />
      </li>
    </ul>
  </div>
</template>
