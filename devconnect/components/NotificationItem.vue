<template>
  <div class="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer">

    <div class="flex-shrink-0 w-8 text-center">
      <font-awesome-icon v-if="notification.type === 'like'" :icon="['fas', 'heart']" class="text-red-500 text-2xl" />
      <font-awesome-icon v-else-if="notification.type === 'follow'" :icon="['fas', 'user']" class="text-blue-500 text-2xl" />
      <img v-else :src="notification.user.avatarUrl" class="w-8 h-8 rounded-full" alt="Avatar"/>
    </div>

    <div class="flex-grow">
      <div class="mb-1">
        <img :src="notification.user.avatarUrl" class="w-8 h-8 rounded-full inline-block" :alt="notification.user.name + ' Avatar'"/>
      </div>

      <p class="text-gray-800 dark:text-gray-200">
        <span class="font-bold">{{ notification.user.name }}</span>
        {{ $t(`notifications.${notification.type === 'like' ? 'liked_your_post' : 'followed_you'}`) }}
      </p>

      <p v-if="notification.postContent" class="text-gray-500 mt-1 text-sm italic">
        "{{ notification.postContent }}"
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
interface Notification { id: string; type: 'like' | 'follow' | 'reply' | 'retweet'; user: { name: string; avatarUrl: string }; postContent?: string; }
defineProps<{ notification: Notification }>();
</script>