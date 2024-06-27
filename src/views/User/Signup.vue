<template>
    <!-- Registration Form Section -->
    <div class="grid grid-cols-1 md:grid-cols-none md:flex md:flex-row md:items-center md:justify-center h-screen">
        <!-- Image Column -->
        <div class="image-col md:w-1/2 h-screen overflow-hidden">
            <!-- Back Button -->
            <button @click="navigateToHome" class="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg">
                Back
            </button>

            <div class="image-container h-full flex items-center">
                <!-- Image Container -->
                <img src="https://www.officialgates.com/assets/images/banner-images/og_vue.png" alt="Side_Image"
                    class="side-image object-cover h-full w-auto" />
            </div>
        </div>

        <div class="form-col md:w-1/2 overflow-auto">
            <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <!-- Registration Form Content -->
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <!-- Company Logo -->
                    <img class="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <!-- Title -->
                    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {{ t('registerTitle') }}
                    </h2>
                </div>

                <!-- Registration Form -->
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <v-form :validation-schema="validationSchema" @submit="onSubmit" class="space-y-4">
                        <!-- First Name Input -->
                        <div>
                            <TextInput :label="t('firstName')" type="text" name="firstName" required />
                        </div>
                        <!-- Last Name Input -->
                        <div>
                            <TextInput :label="t('lastName')" type="text" name="lastName" required />
                        </div>
                        <!-- Phone Number Input -->
                        <div>
                            <TextInput :label="t('mobNoLabel')" type="text" name="phoneNumber" required />
                        </div>
                        <!-- Email Input -->
                        <div>
                            <TextInput :label="t('emailLabel')" type="email" name="email" required />
                        </div>
                        <!-- Password Input -->
                        <div>
                            <PasswordInput :label="t('passwordLabel')" type="password" name="password"
                                autocomplete="new-password" required />
                        </div>
                        <!-- Confirm Password Input -->
                        <div>
                            <PasswordInput :label="t('confirmPassword')" type="password" name="confirmPassword"
                                autocomplete="current-password" required />
                        </div>
                        <!-- Submit Button -->
                        <div>
                            <CommonButton type="submit" class="my-custom-class" :buttonText="t('signUpButton')" />
                        </div>
                    </v-form>

                    <p class="mt-10 text-center text-sm text-gray-500">
                        {{ t('alreadyHaveAnAccount') }}
                        <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {{ t('login') }}
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PasswordInput from '@/components/ui/PasswordInput.vue'
import TextInput from '@/components/ui/TextInput.vue'
import CommonButton from '@/components/ui/Button/CommonButton.vue'
import { Form as VForm } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { UserAuthServices } from '@/services/auth.services'
import modalNotification from '@/utils/notification'
import router from '@/routers'
import moduleRoutesMap from '@/route-control'
import logger from '@/utils/logger'

const { t } = useI18n()

// Validation schema for registration form
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
    email: yup
        .string()
        .required('Email is required!')
        .email('Email is invalid!')
        .max(50, 'Must be maximum 50 characters!'),
    phoneNumber: yup
        .string()
        .required('Phone no. is required!')
        .min(10, 'Must be at least 10 characters!')
        .max(11, 'Must be maximum 11 characters!'),
    password: yup
        .string()
        .required('Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!'),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!')
})

// Form submission handler for registration form
const onSubmit = async (values) => {

    try {
        const response = await UserAuthServices.userSignUp(values)
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

// Navigation handler to go back to the home page
const navigateToHome = () => {
    router.push('/')
}
</script>
@/routers