<template>
  <!-- Update Profile Form Section -->
  <div class="grid grid-cols-1 md:grid-cols-none md:flex md:flex-row md:items-center md:justify-center">
    <!-- Form Column -->
    <div class="form-col md:w-1/2 overflow-auto">
      <div class=".md\:items-center min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <!-- Title -->
          <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {{ t('updateProfile') }}
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <!-- Form -->
          <v-form :validation-schema="validationSchema" @submit="onSubmit" class="space-y-4">
            <!-- First Name Input -->
            <div>
              <TextInput :label="t('firstName')" v-model="auth.data.firstName" type="text" name="firstName" />
            </div>
            <!-- Last Name Input -->
            <div>
              <TextInput :label="t('lastName')" v-model="auth.data.lastName" type="text" name="lastName" />
            </div>
            <!-- Phone Number Input -->
            <div>
              <TextInput :label="t('mobNoLabel')" v-model="auth.data.phoneNumber" type="text" name="phoneNumber" />
            </div>
            <div>
              <input type="file" accept="image/*" @change="handleFileUpload" class="hidden" id="fileInput" />

              <label for="fileInput"
                class="cursor-pointer flex items-center justify-center w-full rounded-md bg-brown-600 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-600">
                Upload Image
              </label>

            </div>
            <!-- Update Button -->
            <div>
              <CommonButton type="submit" class="my-custom-class" :buttonText="t('update')" />
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from '@/components/ui/TextInput.vue'
import CommonButton from '@/components/ui/Button/CommonButton.vue'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import store from '@/stores/store'
import { Form as VForm } from 'vee-validate'
import { UserHomeServices } from '@/services/home.services'
import modalNotification from '@/utils/notification'
import logger from '@/utils/logger'
import { ref } from 'vue'

// Reference to store the selected file
const selectedFile = ref(null)
const { t } = useI18n()
const auth = store.getters['auth/getUserDetails']
// Function to handle file selection
const handleFileUpload = async (event) => {
  const bodyData = {
    mediaFor: 'user',
    mediaType: 'image',
    file: event.target.files[0]
  }
  try {
    const response = await UserHomeServices.uploadUserProfile(bodyData)
    const { message, success } = response
    if (success) {
      // Show success notification
      modalNotification({
        type: 'success',
        message
      })
      selectedFile.value = response?.data?.basePath
    }
  } catch (error) {
    logger(error)
  }
}
// Validation schema for updating user profile
const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required!')
    .min(3, 'Must be at least 3 characters!')
    .max(20, 'Must be maximum 20 characters!'),
  lastName: yup
    .string()
    .required('Last name is required!')
    .min(3, 'Must be at least 3 characters!')
    .max(20, 'Must be maximum 20 characters!'),
  phoneNumber: yup
    .string()
    .required('Phone no. is required!')
    .min(10, 'Must be at least 10 characters!')
    .max(11, 'Must be maximum 11 characters!')
})

const onSubmit = async (values) => {
  const bodytype = { ...values, profilePicture: selectedFile.value }
  try {
    const response = await UserHomeServices.updateUserProfile(bodytype)
    const { message, success } = response
    if (success) {
      store.dispatch('auth/fetchUserData') // Dispatch the action to fetch user data
      // Show success notification
      modalNotification({
        type: 'success',
        message
      })
    }
  } catch (error) {
    logger(error)
  }
}
</script>
