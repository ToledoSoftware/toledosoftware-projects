<template>
  <div class="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">

    <h3 class="text-xl font-bold text-gray-900 dark:text-white p-4">{{ $t('widgets.who_to_follow') }}</h3>

    <div>
      <SuggestionItem
        v-for="user in suggestedUsers"
        :key="user.username"
        :user="user"
      />
    </div>

    <div class="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
      <a href="#" class="text-blue-600 dark:text-blue-400 text-sm">{{ $t('widgets.show_more') }}</a>
    </div>

  </div>
</template>

<script setup lang="ts">
const suggestedUsers = [
  {
    avatarUrl: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
    name: 'GitHub',
    username: 'github'
  },
  {
    avatarUrl: 'https://avatars.githubusercontent.com/u/23617963?s=200&v=4',
    name: 'Nuxt',
    username: 'nuxt'
  },
  {
    avatarUrl: 'https://avatars.githubusercontent.com/u/139426?s=200&v=4',
    name: 'Guillermo Rauch',
    username: 'rauchg'
  }
];
</script>