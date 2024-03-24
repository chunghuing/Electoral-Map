import { defineStore } from 'pinia'
import area from '../assets/json/area.json'

export const useAreaStore = defineStore('area', {
  state: () => ({ 
    // 將省代碼與縣市代碼組合為新縣市代碼欄位
    areaList: area.map((item) => {
      const { province, city, ...others } = item
      return {
        city: `${province}${city}`,
        ...others,
      }
    }),
    selectedCity: '',
    selectedDistrict: '',
    selectedVillage: '',
  }),
  getters: {
    cityList: (state) => {
      return state.areaList.filter(
        (item, index, self) => self.findIndex((t) => t.city === item.city) === index
      )
    },
    districtList(state) {
      if (!state.selectedCity) {
        return []
      } else {
        return state.areaList
          .filter((item) => {
            return item.city === state.selectedCity
          })
          .filter(
            (item, index, self) =>
              self.findIndex((t) => t.district === item.district) === index
          )
          .slice(1)
      }
    },
    villageList(state) {
      if (!state.selectedDistrict) {
        return []
      } else {
        return state.areaList
          .filter((item) => {
            return (
              item.city === state.selectedCity &&
              `${item.district}` === state.selectedDistrict
            )
          })
          .slice(1)
      }
    }
  },
  actions: {
  },
})