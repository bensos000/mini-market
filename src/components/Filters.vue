<template>
  <div class="join join-vertical w-full">
    <div class="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-3" :checked="true" />
      <div class="collapse-title text-xl font-medium">Price Filter</div>
      <div class="collapse-content">
        <div v-for="range in ranges" :key="range.lbl">
          <label :for="range.lbl">
            <input
              :id="range.lbl"
              type="radio"
              :value="{ min: range.min, max: range.max }"
              name="price"
              v-model="selectPrice"
              class="custom-control-input"
              @change="filterByPriceOrCategory"
            />
            {{ range.lbl }}</label
          >
        </div>
        <div class="mt-3">
          <button class="btn btn-primary" @click="resetAllFilters">
            Reset All
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-3" />
    <div class="collapse-title text-xl font-medium">Category Filter</div>
    <div class="collapse-content">
      <div v-for="category in uniqueCategories" :key="category">
        <label :for="category">
          <input
            :id="category"
            type="radio"
            :value="category"
            name="category"
            v-model="selectCategory"
            class="custom-control-input"
            @change="filterByPriceOrCategory"
          />
          {{ category }}</label
        >
      </div>
      <div class="mt-3">
        <button class="btn btn-primary" @click="resetAllFilters">
          Reset All
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useProductStore } from "../store/product";

const productStore = useProductStore();

const uniqueCategories = computed(() => productStore.categoriesList);

const selectPrice = ref({ min: 0, max: 1000000 });
const selectCategory = ref("");
const ranges = ref([
  { lbl: "All", min: 0, max: 1000000 },
  { lbl: "<=10", min: 0, max: 10 },
  { lbl: "10 - 100", min: 10, max: 100 },
  { lbl: "100 - 500", min: 100, max: 500 },
  { lbl: ">=500", min: 500, max: 1000000 },
]);

const filterByPriceOrCategory = () => {
  productStore.filterAll(selectCategory.value, selectPrice.value);
};

const resetAllFilters = () => {
  selectCategory.value = ''
  selectPrice.value = { min: 0, max: 1000000 }
  productStore.filterAll("", { min: 0, max: 1000000 });
  productStore.filtering = false
};
</script>
