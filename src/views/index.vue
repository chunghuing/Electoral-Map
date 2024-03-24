<script setup lang="ts">
import { useAreaStore } from '../stores/area'
import { useVoteDataStore } from '../stores/voteData'
import Navbar from '../components/Navbar.vue'
import TaiwanOptions from '../components/TaiwanOptions.vue'
import VoteOverview from '../components/VoteOverview.vue'
import TaiwanMap from '../components/TaiwanMap.vue'
import HintArea from '../components/HintArea.vue'
import ViewVoteArea from '../components/ViewVoteArea.vue'

const areaStore = useAreaStore()
const voteDataStore = useVoteDataStore()
voteDataStore.loadVoteData()
</script>

<template>
  <div>
    <Navbar />
    <div class="p-lg-6" v-if="!voteDataStore.loading">
      <TaiwanOptions />
      <div class="row g-0">
        <div class="col-lg-4">
          <VoteOverview />
        </div>
        <div class="col-lg-4 px-6 px-lg-0">
          <TaiwanMap />
        </div>
        <div class="col-lg-4">
          <HintArea v-if="areaStore.selectedCity === ''" />
          <ViewVoteArea v-else />
        </div>
      </div>
    </div>
    <div class="text-center mt-12" v-else>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div>資料讀取中，請稍後...</div>
    </div>
  </div>
</template>
