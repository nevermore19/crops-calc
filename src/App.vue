<template>
  <div>
  <header class="flex flex-row justify-center mt-5 gap-10
  max-sm:flex-col
  max-sm:place-items-center
  max-sm:gap-0">
      <a href="https://www.roblox.com/pl/games/126884695634066/Grow-a-Garden" target="_blank">
        <img src="../src/assets/grow-a-garden-logo.png" alt="Grow a Garden" class="w-50
        max-sm:w-30">
      </a>
      <div class="text-7xl pt-6 font-miriam text-shadow-title
      max-sm:text-4xl">
        <router-link to="/">
          <span class="text-green">C</span>rops <span class="text-green">C</span>alculator
        </router-link>
      </div>
  </header>
  <main class="">
      <router-view />
  </main>
  </div>
  
</template>