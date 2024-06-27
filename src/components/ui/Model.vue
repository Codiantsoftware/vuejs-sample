<template>
  <!-- Modal component with button trigger -->
  <div>
    <a-button
      @click="showModal"
      :type="type"
      class="font float-end my-2 text-indigo-600 hover:text-indigo-500"
    >
      {{ buttonText }}
    </a-button>
    <a-modal v-model:open="open" :title="title" @ok="handleOk">
      <!-- Custom footer content -->
      <template #footer>
        <a-button key="back" @click="handleCancel">{{ cancelButtonText }}</a-button>
        <a-button
          key="submit"
          type="primary"
          :class="okbtnclass"
          :loading="loading"
          @click="$emit('sub')"
        >
          {{ okButtonText }}
        </a-button>
      </template>
      <!-- Slot for modal body content -->
      <slot></slot>
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Define component props
const props = defineProps({
  buttonText: {
    type: String,
    default: 'Open Modal'
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel'
  },
  okButtonText: {
    type: String,
    default: 'OK'
  },
  title: {
    type: String,
    default: 'Modal Title'
  },
  type: {
    type: String,
    default: 'primary'
  },
  okbtnclass: {
    type: String,
    default: ''
  }
})

// Define reactive variables
const loading = ref(false)
const open = ref(false)

// Function to show modal
const showModal = () => {
  open.value = true
}

// Function to handle OK button click
const handleOk = () => {
  // Emit submit event
  this.$emit('submit')
  // Set loading state to true
  loading.value = true
  // Simulate loading delay
  setTimeout(() => {
    loading.value = false
    open.value = false
  }, 2000)
}

// Function to handle Cancel button click
const handleCancel = () => {
  open.value = false
}
</script>
