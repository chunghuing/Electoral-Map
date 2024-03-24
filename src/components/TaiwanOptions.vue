<script setup lang="ts">
import { useAreaStore } from '../stores/area'

const store = useAreaStore()

const clearSelected = () => {
  store.$patch({
    selectedCity: '',
    selectedDistrict: '',
    selectedVillage: '',
  })
}

const changeSelected = (type: string) => {
  store.selectedVillage = ''
  if (type === 'city') {
    store.selectedDistrict = ''
  }
}
</script>

<template>
  <div class="p-6 pb-5 p-lg-0">
    <ul class="nav nav-underline mb-5">
      <li class="nav-item">
        <a class="nav-link active navTitle" aria-current="page" href="#"
          >第15任 總統副總統大選</a
        >
      </li>
    </ul>
    <div class="d-flex mb-lg-10">
      <div class="row g-0">
        <div class="col-6 col-lg-4 pe-2 mb-2 mb-lg-0">
          <select
            class="form-select me-5"
            v-model="store.selectedCity"
            @change="changeSelected('city')"
          >
            <option :value="''" selected disabled>請選擇</option>
            <option
              v-for="item in store.cityList"
              :key="item.city"
              :value="item.city"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="col-6 col-lg-4 pe-2">
          <select
            class="form-select me-5"
            v-model="store.selectedDistrict"
            :disabled="!store.districtList.length"
            @change="changeSelected('district')"
          >
            <option :value="''" selected disabled>請選擇</option>
            <option
              v-for="item in store.districtList"
              :key="item.district"
              :value="`${item.district}`"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="col-12 col-lg-4 pe-2">
          <select
            class="form-select me-5"
            v-model="store.selectedVillage"
            :disabled="!store.villageList.length"
          >
            <option :value="''" selected disabled>請選擇</option>
            <option
              v-for="item in store.villageList"
              :key="item.village"
              :value="`${item.village}`"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      <button
        class="btn btn-primary text-nowrap d-flex align-items-center"
        @click="clearSelected"
      >
        <span class="d-none d-lg-inline me-2">清除</span>
        <i class="bi bi-arrow-clockwise"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 576px) {
  .navTitle {
    font-size: 1rem;
  }
}
@media (max-width: 376px) {
  .navTitle {
    font-size: 0.9rem;
  }
}
</style>
