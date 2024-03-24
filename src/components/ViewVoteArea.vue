<script setup lang="ts">
import { computed } from 'vue'
import { useAreaStore } from '../stores/area'
import { useVoteDataStore } from '../stores/voteData'
import candidate from '../assets/json/candidate.json'

type VoteDataStoreType = ReturnType<typeof useVoteDataStore>

const areaStore = useAreaStore()
const votedataStore = useVoteDataStore()

const selectedCityName = computed(() => {
  const city = areaStore.cityList.find((item: { city: string; }) => {
    return item.city === areaStore.selectedCity
  })
  return city?.name
})
const selectedCityData = computed(() => {
  return votedataStore.voteDataList.filter((item: { city: string; district: number; village: number }) => {
    return (
      item.city === areaStore.selectedCity && item.district === 0 && item.village === 0
    )
  })
})

const selectedDistName = computed(() => {
  const dist = areaStore.districtList.find((item: { district: number }) => {
    return `${item.district}` === areaStore.selectedDistrict
  })
  return dist?.name
})
const selectedDistData = computed(() => {
  return votedataStore.voteDataList.filter((item: { city: string; district: number; village: number }) => {
    return (
      item.city === areaStore.selectedCity &&
      `${item.district}` === areaStore.selectedDistrict &&
      item.village === 0
    )
  })
})

const selectedVilName = computed(() => {
  const vil = areaStore.villageList.find((item: { village: any }) => {
    return `${item.village}` === areaStore.selectedVillage
  })
  return vil?.name
})
const selectedVilData = computed(() => {
  return votedataStore.voteDataList.filter((item: { city: string; district: number; village: number }) => {
    return (
      item.city === areaStore.selectedCity &&
      `${item.district}` === areaStore.selectedDistrict &&
      `${item.village}` === areaStore.selectedVillage
    )
  })
})

// 組合 candidate 與 votedata
const filterVotedata = (data: VoteDataStoreType['voteDataList']) => {
  const sortedData = data.sort((a, b) => b.candiDate - a.candiDate)
  return candidate.map((item, index) => {
    return {
      ...item,
      percentage: sortedData[index].percentage,
      quantity: sortedData[index].quantity,
    }
  })
}

// 篩選出當選的號碼
const filterElectedNum = (data: VoteDataStoreType['voteDataList']) => {
  console.log('data', data.sort((a, b) => b.percentage - a.percentage)[0])
  return data.sort((a, b) => b.percentage - a.percentage)[0].candiDate
}

const filterClass = (num: number) => {
  switch (num) {
    case 3:
      return 'green'
    case 2:
      return 'blue'
    case 1:
      return 'brown'
  }
}
</script>

<template>
  <div
    class="result-wrap d-flex flex-lg-column align-items-lg-end p-6 pt-0 p-lg-0 my-5 m-lg-0"
  >
    <div
      class="result border border-2 rounded px-5 py-3 me-5 me-lg-0 mb-lg-5"
      :class="`border-${filterClass(
        filterElectedNum(selectedCityData)
      )} bg-${filterClass(filterElectedNum(selectedCityData))}Bg`"
      v-if="areaStore.selectedCity"
    >
      <h4 class="fw-bold mb-3">{{ selectedCityName }}</h4>
      <table>
        <tr v-for="item in filterVotedata(selectedCityData)" :key="item.number">
          <td class="pb-2">
            <div
              class="numCircle rounded-circle d-flex justify-content-center align-items-center text-white"
              :class="`bg-${filterClass(item.number)}`"
            >
              {{ item.number }}
            </div>
          </td>
          <td class="pb-2">
            <div class="px-4 text-nowrap">
              <p class="fw-bold">{{ item.politycalParty }}</p>
              <p class="fs-4">{{ item.president }}｜{{ item.vicePresident }}</p>
            </div>
          </td>
          <td class="pb-2">
            <div
              class="ps-4 border-start border-green border-2 text-nowrap"
              :class="`border-${filterClass(item.number)}`"
            >
              <p class="fw-bold">{{ item.percentage }} %</p>
              <p class="fs-4">{{ item.quantity.toLocaleString() }} 票</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div
      class="result border border-2 rounded px-5 py-3 me-5 me-lg-0 mb-lg-5"
      :class="`border-${filterClass(
        filterElectedNum(selectedDistData)
      )} bg-${filterClass(filterElectedNum(selectedDistData))}Bg`"
      v-if="areaStore.selectedDistrict"
    >
      <h4 class="fw-bold mb-3">{{ selectedDistName }}</h4>
      <table>
        <tr v-for="item in filterVotedata(selectedDistData)" :key="item.number">
          <td class="pb-2">
            <div
              class="numCircle rounded-circle d-flex justify-content-center align-items-center text-white"
              :class="`bg-${filterClass(item.number)}`"
            >
              {{ item.number }}
            </div>
          </td>
          <td class="pb-2">
            <div class="px-4 text-nowrap">
              <p class="fw-bold">{{ item.politycalParty }}</p>
              <p class="fs-4">{{ item.president }}｜{{ item.vicePresident }}</p>
            </div>
          </td>
          <td class="pb-2">
            <div
              class="ps-4 border-start border-green border-2 text-nowrap"
              :class="`border-${filterClass(item.number)}`"
            >
              <p class="fw-bold">{{ item.percentage }} %</p>
              <p class="fs-4">{{ item.quantity.toLocaleString() }} 票</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div
      class="result border border-2 rounded px-5 py-3"
      :class="`border-${filterClass(
        filterElectedNum(selectedVilData)
      )} bg-${filterClass(filterElectedNum(selectedVilData))}Bg`"
      v-if="areaStore.selectedVillage"
    >
      <h4 class="fw-bold mb-3">{{ selectedVilName }}</h4>
      <table>
        <tr v-for="item in filterVotedata(selectedVilData)" :key="item.number">
          <td class="pb-2">
            <div
              class="numCircle rounded-circle d-flex justify-content-center align-items-center text-white"
              :class="`bg-${filterClass(item.number)}`"
            >
              {{ item.number }}
            </div>
          </td>
          <td class="pb-2">
            <div class="px-4 text-nowrap">
              <p class="fw-bold">{{ item.politycalParty }}</p>
              <p class="fs-4">{{ item.president }}｜{{ item.vicePresident }}</p>
            </div>
          </td>
          <td class="pb-2">
            <div
              class="ps-4 border-start border-green border-2 text-nowrap"
              :class="`border-${filterClass(item.number)}`"
            >
              <p class="fw-bold">{{ item.percentage }} %</p>
              <p class="fs-4">{{ item.quantity.toLocaleString() }} 票</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .result-wrap {
    overflow-x: scroll;
  }
}
.result {
  width: 260px;
}
.numCircle {
  width: 24px;
  height: 24px;
}
</style>
