<template>
<div class="text-white p-6">
    <h1 class="text-4xl font-bold">{{ crop.name }}</h1>
    <img :src="crop.img" :alt="crop.name" />
  </div>
</template>

<script>
import { crops } from '../data/crops.js'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const crop = crops.find(c => c.id === route.params.id)

    return { crop }
  }
}
</script>