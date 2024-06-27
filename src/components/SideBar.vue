<template>
  <!-- Sidebar layout -->
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <!-- Logo -->
    <div class="logo">
      <img :src="profileImage" alt="Logo" />
    </div>

    <!-- Sidebar menu -->
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <!-- Loop through menuItems and generate menu items -->
      <template v-for="(item, index) in menuItems" :key="index">
        <template v-if="item.children && item.children.length">
          <!-- Render submenu -->
          <a-sub-menu :key="item.key">
            <template #title>
              <span>
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </span>
            </template>
            <!-- Loop through submenu items -->
            <a-menu-item v-for="(subItem, subIndex) in item.children" :key="'sub_' + subIndex">
              <router-link :to="subItem.path">{{ subItem.name }}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <!-- Render regular menu item -->
          <a-menu-item :key="item.key">
            <i :class="item.icon"></i>
            <router-link :to="item.path">{{ item.name }}</router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { ref, watch } from 'vue' // Importing watch function from Vue
import { useRoute } from 'vue-router'
import profileRoute from '@/routers/User/private.route'
import store from '@/stores/store';
import { onMounted } from 'vue';

const collapsed = ref(false)
const selectedKeys = ref([])

const route = useRoute()

// Reactive reference to profile image data
const profileImage = ref(store.state.auth?.userData?.data?.profilePictureUrl);

// Watch for changes in profile image data
watch(() => store.state.auth?.userData?.data?.profilePictureUrl, (newProfileImage) => {
  // Update the profile image when the data changes
  profileImage.value = newProfileImage;
});
// Define your dynamic menu items
const menuItems = ref(Object.values(profileRoute()))

// Watch for route changes and update selectedKeys accordingly
watch(
  () => route.path,
  (newPath) => {
    const matched = menuItems.value.find((item) => {
      if (item.path && item.path === newPath) return true
      if (item.children && item.children.length) {
        return item.children.some((subItem) => subItem.path === newPath)
      }
      return false
    })
    if (matched) {
      selectedKeys.value = [matched.key]
    }
  }
)
const getData = () => {
  try {
    store.dispatch('auth/fetchUserData')
  } catch (error) {
    logger(error)
  }
}
onMounted(getData)
</script>

<style scoped>
/* Styling for the logo and sidebar background */
.logo {
  /* height: 32px; */
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

/* Dark theme styling */
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
@/routers/User/private.route