import { ref, watch } from 'vue'

export function useDecimalInput(props, emit) {
  const displayValue = ref('')

  const formatInput = (value) => {
    let formatted = value.replace(/,/g, '.')
    
    formatted = formatted.replace(/[^0-9.]/g, '')
    
    const parts = formatted.split('.')
    if (parts.length > 2) {
      formatted = parts[0] + '.' + parts.slice(1).join('')
    }
    
    if (parts[1]?.length > 2) {
      formatted = parts[0] + '.' + parts[1].substring(0, 2)
    }
    
    return formatted.replace(/\./g, ',')
  }

  const handleInput = (event) => {
    displayValue.value = formatInput(event.target.value)
    emitValue()
  }

  const handleBlur = () => {
    const num = parseFloat(displayValue.value.replace(/,/g, '.')) || null
    displayValue.value = num !== null ? num.toFixed(2).replace('.', ',') : ''
    emit('update:value', num)
  }

  const emitValue = () => {
    const num = parseFloat(displayValue.value.replace(/,/g, '.')) || null
    emit('update:value', num)
  }

  watch(() => props.value, (newVal) => {
    const currentNum = parseFloat(displayValue.value.replace(/,/g, '.')) || null
    if (newVal !== currentNum) {
      displayValue.value = newVal !== null ? newVal.toFixed(2).replace('.', ',') : ''
    }
  }, { immediate: true })

  return {
    displayValue,
    handleInput,
    handleBlur
  }
}