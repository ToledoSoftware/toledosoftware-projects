<template>
  <nav class="fixed bottom-0 left-0 w-full p-1 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:hidden z-20">
    <div class="flex justify-around items-center gap-1">

      <NuxtLink
        to="/"
        class="flex flex-col items-center p-2 rounded-full transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        active-class="!text-blue-600 dark:!text-blue-400"
      >
        <font-awesome-icon :icon="['fas', 'home']" class="text-xl" />
      </NuxtLink>

      <NuxtLink
        to="/notifications"
        class="flex flex-col items-center p-2 rounded-full transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        active-class="!text-blue-600 dark:!text-blue-400"
      >
        <font-awesome-icon :icon="['fas', 'bell']" class="text-xl" />
      </NuxtLink>

      <NuxtLink
        to="/profile"
        class="flex flex-col items-center p-2 rounded-full transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        active-class="!text-blue-600 dark:!text-blue-400"
      >
        <font-awesome-icon :icon="['fas', 'user']" class="text-xl" />
      </NuxtLink>

      <button
        @click="openModal"
        class="p-2 text-gray-900 dark:text-white"
        :aria-label="$t('bottomNav.post_aria_label')"
      >
        <font-awesome-icon :icon="['fas', 'feather-alt']" class="text-xl" />
      </button>

      <div class="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

      <LanguageSwitcher />

      <ThemeSwitcher />

    </div>
  </nav>
</template>

<script setup lang="ts">
import { usePostModal } from '~/composables/usePostModal';
const { openModal } = usePostModal();
</script>