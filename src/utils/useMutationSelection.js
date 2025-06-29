import { ref, computed } from 'vue'

export function useMutationSelection() {
  const selectedGrowth = ref({
    gold: false,
    rainbow: false,
    ripe: false,
  })

  const isAnySelectedGrowth = computed(() =>
    Object.values(selectedGrowth.value).some(Boolean)
  )

  const selectedEnv = ref({
    chilled: false,
    wet: false,
    frozen: false,
  })

  const isAnySelectedEnv = computed(() =>
    Object.values(selectedEnv.value).some(Boolean)
  )

  const selectedBurn = ref({
    burnt: false,
    cooked: false,
  })

  const isAnySelectedBurn = computed(() =>
    Object.values(selectedBurn.value).some(Boolean)
  )

  const selectedSun = ref({
    sundried: false,
    verdant: false,
  })

  const isAnySelectedSun = computed(() =>
    Object.values(selectedSun.value).some(Boolean)
  )

  return {
    selectedGrowth,
    isAnySelectedGrowth,
    selectedEnv,
    isAnySelectedEnv,
    selectedBurn,
    isAnySelectedBurn,
    selectedSun,
    isAnySelectedSun,
  }
}