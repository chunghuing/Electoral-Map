// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Votedata {
  // 城市
  city: string,
  // 地區
  district: number,
  // 村莊
  village: number,
  // 候選人資料
  candiDate: number,
  // 數量
  quantity: number,
  // 百分比
  percentage: number,
  // 當選
  elected: string
}

export const useVoteDataStore = defineStore('voteData', {
  state: () => ({ 
    loading: true,
    voteDataList: [] as Array<Votedata>,
  }),
  getters: {
  },
  actions: {
    async loadVoteData() {
      try {
        this.loading = true;

        // 使用 import() 異步載入 JSON 檔案
        const module = await import('../assets/json/votedata.json');

        // 載入完成後,將省代碼與縣市代碼組合為新縣市代碼欄位,並將 loading 設置為 false
        this.voteDataList = module.default.map(item => {
          const { province, city, ...others } = item;
          return {
            city: `${province}${city}`,
            ...others,
          };
        });
      } catch (error) {
        console.error('Error loading votedata JSON file', error);
        // 載入失敗時也將 loading 設置為 false
      } finally {
        this.loading = false;
      }
    },
  },
})
