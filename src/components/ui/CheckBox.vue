<template>
  <!-- Checkbox input with label and error message -->
  <div>
    <input
      :value="checkedValue"
      :checked="checked"
      @change="handleChange"
      type="checkbox"
      :id="props.name"
    />
    <label :for="props.name" class="m-1">{{ label }}</label>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'

// Define component props
const props = defineProps({
  name: String,
  label: String,
  checkedValue: String
})

// Use vee-validate's useField to handle form field validation
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { handleChange, checked, errorMessage } = useField(() => props.name, undefined, {
  type: 'checkbox',
  checkedValue: props.checkedValue
})
</script>
