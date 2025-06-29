<template>
    <div class="flex flex-row justify-center mt-10">
        <img class="w-40" :src="crop.img" alt=""/>
        <h1 class="text-7xl font-bold my-auto text-shadow-md">{{ crop.name }}</h1>
    </div>
    <div class="w-[80%] mx-auto flex flex-wrap">
        <div class="mt-10">
            <div class="flex items-center gap-x-2 mb-2">
                <p class="text-3xl mb-2 text-shadow-xs">Crop weight:</p>
                <input type="text" inputmode="decimal" class="no-spinner h-9 w-20 text-2xl px-2 border focus:none"
                
                placeholder="0.00">
            </div>
            <p class="text-3xl mb-5 text-shadow-xs">Growth mutations:</p>
            <div class="flex flex-wrap">
            <div v-if="crop.id === 'sugar-apple'" class="flex items-center gap-x-2 mr-5 mb-2">
                <input id="ripe" type="checkbox" class="w-5 h-5" v-model="selectedGrowth.ripe" :disabled="isAnySelectedGrowth && !selectedGrowth.ripe">
                <label for="ripe" class="text-xl select-none text-pink-600">Ripe</label>
            </div>
            <div class="flex items-center gap-x-2 mr-5 mb-2">
              <input type="checkbox" id="gold" class="w-5 h-5" v-model="selectedGrowth.gold" :disabled="isAnySelectedGrowth && !selectedGrowth.gold"/>
              <label for="gold" class="text-xl select-none text-yellow-500 mr-3">
                Gold
              </label>
              <input type="checkbox" id="rainbow" class="w-5 h-5" v-model="selectedGrowth.rainbow" :disabled="isAnySelectedGrowth && !selectedGrowth.rainbow"/>
              <label for="rainbow" class="text-xl select-none bg-gradient-to-r from-red-500 via-green-500 to-purple-500 inline-block text-transparent bg-clip-text">
                Rainbow
              </label>
            </div>
          </div>

          <p class="text-3xl mb-5 mt-5 text-shadow-xs">Environmental mutations:</p>
          <div class="flex flex-wrap">
            <div class="flex items-center gap-x-2 mr-5 mb-2">
                <input id="chilled" type="checkbox" class="w-5 h-5" v-model="selectedEnv.chilled" :disabled="isAnySelectedEnv && !selectedEnv.chilled">
                <label for="chilled" class="text-xl select-none text-blue-100 text-shadow-blue-500">Chilled</label>
            </div>
            <div class="flex items-center gap-x-2 mr-5 mb-2">
              <input type="checkbox" id="wet" class="w-5 h-5" v-model="selectedEnv.wet" :disabled="isAnySelectedEnv && !selectedEnv.wet"/>
              <label for="wet" class="text-xl select-none text-blue-600 mr-3">
                Wet
              </label>
              <input type="checkbox" id="frozen" class="w-5 h-5" v-model="selectedEnv.frozen" :disabled="isAnySelectedEnv && !selectedEnv.frozen"/>
              <label for="frozen" class="text-xl select-none text-blue-400">
                Frozen
              </label>
            </div>
            <div v-for="mutation in mutations.env" :key="mutation" class="flex items-center gap-x-2 mr-5 mb-2">
              <input type="checkbox" :id="mutation.name.toLowerCase()" class="w-5 h-5" />
              <label :for="mutation.name.toLowerCase()" :class="`text-xl select-none ${mutation.color}`">
                {{ mutation.name }}
              </label>
            </div>
          </div>

          <p class="text-3xl mb-5 mt-5 text-shadow-xs">Limited mutations:</p>
          <div class="flex flex-wrap">
            <div class="flex items-center gap-x-2 mr-5 mb-2">
                <input id="burnt" type="checkbox" class="w-5 h-5" v-model="selectedBurn.burnt" :disabled="isAnySelectedBurn && !selectedBurn.burnt">
                <label for="burnt" class="text-xl select-none text-yellow-950">Burnt</label>
            </div>
            <div class="flex items-center gap-x-2 mr-3 mb-2">
              <input type="checkbox" id="cooked" class="w-5 h-5" v-model="selectedBurn.cooked" :disabled="isAnySelectedBurn && !selectedBurn.cooked"/>
              <label for="cooked" class="text-xl select-none text-yellow-600 mr-3">
                Cooked
              </label>
            </div>
            <div class="flex items-center gap-x-2 mr-5 mb-2">
                <input id="verdant" type="checkbox" class="w-5 h-5" v-model="selectedSun.verdant" :disabled="isAnySelectedSun && !selectedSun.verdant">
                <label for="verdant" class="text-xl select-none text-lime-700">Verdant</label>
            </div>
            <div class="flex items-center gap-x-2 mr-3 mb-2">
              <input type="checkbox" id="sundried" class="w-5 h-5" v-model="selectedSun.sundried" :disabled="isAnySelectedSun && !selectedSun.sundried"/>
              <label for="sundried" class="text-xl select-none text-orange-900 mr-3">
                Sundried
              </label>
            </div>
            <div v-for="mutation in mutations.limited" :key="mutation" class="flex items-center gap-x-2 mr-5 mb-2">
              <input type="checkbox" :id="mutation.name.toLowerCase()" class="w-5 h-5" />
              <label :for="mutation.name.toLowerCase()" :class="`text-xl select-none ${mutation.color}`">
                {{ mutation.name }}
              </label>
            </div>
            <div class="flex items-center gap-x-2 mr-5 mb-2">
              <input type="checkbox" id="disco" class="w-5 h-5"/>
              <label for="disco" class="text-xl select-none text-orange-900 mr-3">
                <span class="text-red-200 text-shadow-md text-shadow-red-500">D</span><span class="text-yellow-200 text-shadow-md text-shadow-yellow-500">i</span><span class="text-green-200 text-shadow-md text-shadow-green-500">s</span><span class="text-blue-200 text-shadow-md text-shadow-blue-500">c</span><span class="text-purple-200 text-shadow-md text-shadow-purple-500">o</span>
              </label>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { crops } from '../data/crops.js'
import { mutations } from '../data/mutations.js'
import { useMutationSelection } from '../utils/useMutationSelection'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const crop = crops.find(c => c.id === route.params.id)

    const {
      selectedGrowth,
      isAnySelectedGrowth,
      selectedEnv,
      isAnySelectedEnv,
      selectedBurn,
      isAnySelectedBurn,
      selectedSun,
      isAnySelectedSun,
    } = useMutationSelection()

    return { crop,
             mutations,
             selectedGrowth,
             isAnySelectedGrowth,
             selectedEnv,
             isAnySelectedEnv,
             selectedBurn,
             isAnySelectedBurn,
             selectedSun,
             isAnySelectedSun}
  }
}
</script>