<template>
  <!-- Form item containing a labeled input field -->
  <a-form-item
    :validateStatus="meta.touched ? (meta.valid ? 'success' : 'error') : ''"
    :help="meta.touched ? errorMessage : ''"
    class="mb-0"
  >
    <!-- Label for the input field -->
    <label :for="name" class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </label>
    <a-input
      :value="inputValue"
      @change="onChange"
      :class="inputClass"
      :type="type"
      v-bind="$attrs"
    />
  </a-form-item>
</template>
<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const {
  value: inputValue,
  errorMessage,
  handleChange,
  meta
} = useField(props.name, undefined, {
  initialValue: props.modelValue,
  validateOnValueUpdate: false // since you want to control which events trigger validation
})

const inputClass = {
  'w-full': true,
  'rounded-md': true,
  'border-gray-300': true,
  'py-1.5': true,
  'text-gray-900': true,
  'shadow-sm': true,
  'ring-1': true,
  'ring-inset': true,
  'ring-gray-300': true,
  'placeholder-text-gray-400': true,
  'focus:ring-2': true,
  'focus:ring-inset': true,
  'focus:ring-indigo-600': true,
  'sm:text-sm': true,
  'sm:leading-6': true
}

const onChange = (event) => {
  handleChange(event)
}
</script>

<style scoped>
.border-red-600,
.text-red-600 {
  color: red;
  border: red;
}
.border-gray-400 {
  border: 1px solid black;
}
</style>
