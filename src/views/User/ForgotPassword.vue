<template>
  <!-- Container for the forgot password form -->
  <div class="grid grid-cols-1 md:grid-cols-none md:flex md:flex-row md:items-center md:justify-center h-screen">
    <!-- Column for the image -->
    <div class="image-col md:w-1/2 h-screen overflow-hidden">
      <button @click="navigateToHome" class="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg">
        Back
      </button>
      <div class="image-container h-full flex items-center">
        <!-- Image for the side -->
        <img src="https://www.officialgates.com/assets/images/banner-images/og_vue.png" alt="Side_Image"
          class="side-image object-cover h-full w-auto" />
      </div>
    </div>

    <!-- Column for the form -->
    <div class="form-col md:w-1/2 overflow-auto">
      <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <!-- Company logo -->
          <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company" />
          <!-- Title for the forgot password form -->
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {{ t('forgotPasswordTittle') }}
            <!-- Display forgot password title -->
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <!-- Forgot password form -->
          <v-form :validation-schema="validationSchema" @submit="onSubmit" class="space-y-4">
            <!-- Email input field -->
            <div>
              <TextInput :label="t('emailLabel')" type="email" name="emailOrMobile" required />
            </div>
            <!-- Submit button -->
            <div>
              <CommonButton type="submit" class="my-custom-class" :buttonText="t('submit')" />
            </div>
          </v-form>

          <!-- Link to login page -->
          <p class="mt-10 text-center text-sm text-gray-500">
            {{ t('alreadyHaveAnAccount') }}
            <!-- Display text for existing account -->
            <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              {{ t('login') }}
              <!-- Display text for login link -->
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from '@/components/ui/TextInput.vue' // Import TextInput component
import CommonButton from '@/components/ui/Button/CommonButton.vue' // Import CommonButton component
import { Form as VForm } from 'vee-validate'
import * as yup from 'yup' // Import yup for validation
import { useI18n } from 'vue-i18n' // Import useI18n for translation
import modalNotification from '@/utils/notification'
import { UserAuthServices } from '@/services/auth.services'
import logger from '@/utils/logger'
import router from '@/routers'
import moduleRoutesMap from '@/route-control'

const { t } = useI18n() // Define translation function

// Define validation schema for the forgot password form
const validationSchema = yup.object({
  emailOrMobile: yup
    .string()
    .required('Email is required!')
    .email('Email is invalid!')
    .max(50, 'Must be maximum 50 characters!')
})

// Function to handle form submission
const onSubmit = async (values) => {
  try {
    const response = await UserAuthServices.forgotPassword(values)
    const { message, success } = response
    if (success) {
      // Show success notification
      modalNotification({
        type: 'success',
        message
      })
      // Navigate to the dashboard
      router.push(moduleRoutesMap.user.LOGIN)
    }
  } catch (error) {
    logger(error)
  }
}

// // Function to navigate to home page
const navigateToHome = () => {
  router.push('/login')
}
</script>
@/routers