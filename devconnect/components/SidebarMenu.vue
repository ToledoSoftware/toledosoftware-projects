<template>
  <div class="h-screen sticky top-0 p-4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">

    <h2 class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
      <font-awesome-icon :icon="['fab', 'connectdevelop']" />
      <span class="ml-2">DevConnect</span>
    </h2>

    <nav class="flex flex-col space-y-4 flex-grow">

      <NuxtLink
        to="/"
        class="flex items-center text-lg p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        active-class="!font-bold !text-gray-900 dark:!text-white"
      >
        <font-awesome-icon :icon="['fas', 'home']" class="w-6 mr-3" />
        {{ $t('sidebar.home') }}
      </NuxtLink>

      <NuxtLink
        to="/notifications"
        class="flex items-center text-lg p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        active-class="!font-bold !text-gray-900 dark:!text-white"
      >
        <font-awesome-icon :icon="['fas', 'bell']" class="w-6 mr-3" />
        {{ $t('sidebar.notifications') }}
      </NuxtLink>

      <NuxtLink
        to="/profile"
        class="flex items-center text-lg p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        active-class="!font-bold !text-gray-900 dark:!text-white"
      >
        <font-awesome-icon :icon="['fas', 'user']" class="w-6 mr-3" />
        {{ $t('sidebar.profile') }}
      </NuxtLink>

      <button
        @click="openModal"
        class="mt-4 bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white font-bold py-3 px-4 rounded-full text-lg transition-colors"
      >
        {{ $t('sidebar.post') }}
      </button>

      <div class="mt-4 flex items-center justify-start gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
      </div>

      <div class="mt-auto pt-4">
        <NuxtLink
          to="/login"
          class="flex items-center text-lg p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          active-class="!font-bold !text-gray-900 dark:!text-white"
        >
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="w-6 mr-3" />
          {{ $t('sidebar.logout_login') }}
        </NuxtLink>
      </div>
      </nav>
  </div>
</template>

<script setup lang="ts">
import { usePostModal } from '~/composables/usePostModal';
const { openModal } = usePostModal();
</script>