<template>
  <div class="flex items-center justify-center h-screen">
    <a-card class="w-96">
      <template #title>
        <h2 class="text-lg font-semibold">Login</h2>
      </template>
      <template #extra>
        <router-link to="/signup" class="text-sm">Don't have an account?</router-link>
      </template>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Username Input -->
        <div>
          <TextInput :label="t('emailLabel')" type="email" name="email" required />
        </div>

        <!-- Password Input -->
        <div>
          <PasswordInput :label="t('passwordLabel')" type="password" name="password" autocomplete="current-password"
            required />
        </div>

        <!-- Forgot Password Link -->
        <div class="text-sm">
          <router-link to="/forgot-password" class="font float-end my-2 text-indigo-600 hover:text-indigo-500">{{
        t('forgotPassword') }}</router-link>
        </div>

        <!-- Login Button -->
        <div>
          <CommonButton type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {{ t('loginButton') }}</CommonButton>
        </div>
      </form>
    </a-card>
  </div>
</template>

<script setup>
import PasswordInput from '@/components/ui/PasswordInput.vue'
import TextInput from '@/components/ui/TextInput.vue'
import CommonButton from '@/components/ui/Button/CommonButton.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import router from '@/routers'
import { useI18n } from 'vue-i18n'
import { UserAuthServices } from '@/services/auth.services'
import { setSessionStorageToken } from '@/utils/common.util'
import modalNotification from '@/utils/notification'
import moduleRoutesMap from '@/route-control'

const { t } = useI18n()
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().required('Username is required!'),
    password: yup.string().required('Password is required!')
  })
})
const store = useStore() // useStore is called once in the setup

// Form submission handler
const onSubmit = handleSubmit(async (values) => {
  try {

    const response = await UserAuthServices.userLogin(values)
    const { success, message } = response
    if (success) {
      // Show success notification
      modalNotification({
        type: 'success',
        message
      })

      // Dispatch user login action
      store.dispatch('auth/loginUser', { data: response.data, token: 'dfhkjh4jdf' })

      // Save the authentication token in local storage
      setSessionStorageToken(response?.data?.token)

      // Navigate to the dashboard
      router.push(moduleRoutesMap.user.HOME)
    }
  } catch (error) {
    // Error handling logic remains the same
  }
})
</script>
@/routers