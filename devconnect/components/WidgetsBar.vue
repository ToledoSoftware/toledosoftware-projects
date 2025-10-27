<template>
  <div class="h-screen sticky top-0 p-4 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-6">

    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white p-4">{{ $t('widgets.whats_happening') }}</h3>

      <div class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
        <span class="text-xs text-gray-500 dark:text-gray-500">{{ $t('widgets.trending_topic', { topic: 'Tecnologia' }) }}</span>
        <p class="font-bold text-gray-900 dark:text-white">#NuxtJS</p>
        <span class="text-sm text-gray-600 dark:text-gray-500">{{ $t('widgets.posts_count_simple', { count: 1200 }) }}</span>
      </div>
      <div class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
        <span class="text-xs text-gray-500 dark:text-gray-500">{{ $t('widgets.trending_topic', { topic: 'Desenvolvimento' }) }}</span>
        <p class="font-bold text-gray-900 dark:text-white">#TailwindCSS</p>
        <span class="text-sm text-gray-600 dark:text-gray-500">{{ $t('widgets.posts_count_simple', { count: 980 }) }}</span>
      </div>

      <div class="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
        <a href="#" class="text-blue-600 dark:text-blue-400 text-sm">{{ $t('widgets.show_more') }}</a>
      </div>
    </div>

    <WhoToFollow />

  </div>
</template>

<script setup lang="ts">
</script>