<template>
    <div class="my-10 w-[80%] mx-auto grid grid-cols-6 justify-items-center gap-y-8">
        <div v-for="crop in crops" class="hover:scale-110 ease-in-out duration-200">
            <router-link :to="`/crop/${crop.id}`">
                <img class="w-30" :src="crop.img" alt="">
                <p class="text-center text-white text-lg text-shadow-md">{{ crop.name }}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import { crops } from '../data/crops.js'

export default {
  name: 'Home',
  data() {
    return {
      crops
    }
  }
}
</script>