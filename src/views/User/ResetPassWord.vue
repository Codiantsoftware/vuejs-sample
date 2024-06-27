<template>
    <!-- Reset Password Form Section -->
    <div class="grid grid-cols-1 md:grid-cols-none md:flex md:flex-row md:items-center md:justify-center h-screen">
        <!-- Image Column -->
        <div class="image-col md:w-1/2 h-screen overflow-hidden">
            <!-- Image Container -->
            <div class="image-container h-full flex items-center">
                <img src="https://www.officialgates.com/assets/images/banner-images/og_vue.png" alt="Side_Image"
                    class="side-image object-cover h-full w-auto" />
            </div>
        </div>

        <!-- Form Column -->
        <div class="form-col md:w-1/2 overflow-auto">
            <!-- Reset Password Form Content -->
            <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <!-- Company Logo -->
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img class="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <!-- Title -->
                    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {{ t('resetPasswordTittle') }}
                    </h2>
                </div>

                <!-- Reset Password Form -->
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <v-form :validation-schema="validationSchema" @submit="onSubmit" class="space-y-4">
                        <!-- New Password Input -->
                        <div>
                            <PasswordInput :label="t('newPassword')" type="password" name="newPassword"
                                autocomplete="new-password" required />
                        </div>

                        <!-- Confirm Password Input -->
                        <div>
                            <PasswordInput :label="t('confirmPassword')" type="password" name="confirmPassword"
                                autocomplete="current-password" required />
                        </div>

                        <!-- Submit Button -->
                        <div>
                            <CommonButton type="submit" class="my-custom-class" :buttonText="t('submit')" />
                        </div>
                    </v-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PasswordInput from '@/components/ui/PasswordInput.vue'
import CommonButton from '@/components/ui/Button/CommonButton.vue'
import { Form as VForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { UserAuthServices } from '@/services/auth.services'
import { useI18n } from 'vue-i18n'
import modalNotification from '@/utils/notification'
import logger from '@/utils/logger'

const { t } = useI18n()

// Form validation schema

const validationSchema = yup.object({
    confirmPassword: yup
        .string()
        .required('Confirm Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!'),
    newPassword: yup
        .string()
        .required('New Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!')
})

// Router instance
const router = useRouter()
const token = router.currentRoute.value.params.token


// Form submission handler
const onSubmit = async (values) => {
    try {
        const bodyData = {
            ...values,
            token: token
        }
        const response = await UserAuthServices.resetPasswordService(bodyData)
        const { message, success } = response
        if (success) {
            // Show success notification
            modalNotification({
                type: 'success',
                message
            })
            // Redirect to login page
            router.push('/login')
        }
    } catch (error) {
        logger(error)
    }
}
</script>
