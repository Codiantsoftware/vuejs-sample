<template>
  <button
    :type="type"
    :class="computedClass"
    @click="$emit('click')"
  >
    {{ buttonText }}
  </button>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button' // Default type is 'button', change to 'submit' if needed
  },
  class: {
    type: String,
    default: '' // Default class is empty
  },
  buttonText: {
    type: String,
    default: 'Button' // Default button text is 'Button'
  }
});

// Compute the class by combining the provided class with additional classes
const computedClass = computed(() => {
  return `${props.class} flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`;
});
</script>
