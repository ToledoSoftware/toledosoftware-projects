<template>
  <div class="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
    <div class="flex items-center gap-3">
      <img :src="user.avatarUrl" :alt="user.name + ' Avatar'" class="w-10 h-10 rounded-full" />
      <div>
        <p class="font-bold text-gray-900 dark:text-white text-sm">{{ user.name }}</p>
        <p class="text-gray-500 dark:text-gray-500 text-sm">@{{ user.username }}</p>
      </div>
    </div>

    <button class="bg-black dark:bg-white text-white dark:text-black font-bold text-sm py-1.5 px-4 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">
      {{ $t('widgets.follow_button') }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface SuggestedUser { avatarUrl: string; name: string; username: string; }
defineProps<{ user: SuggestedUser }>();
</script>