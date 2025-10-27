<template>
  <div class="pb-16 lg:pb-0">
    <div class="min-h-screen border-x border-gray-200 dark:border-gray-700">
      
      <div class="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white p-4">{{ $t('notifications.title') }}</h1>
      </div>
      
      <div>
        <template v-if="mockNotifications.length > 0">
          <NotificationItem 
            v-for="notification in mockNotifications" 
            :key="notification.id"
            :notification="notification" 
          />
        </template>
        <template v-else>
          <div class="p-4 text-center text-gray-500 dark:text-gray-400">
            <p>{{ $t('notifications.no_notifications') }}</p>
            <p class="text-sm mt-2">{{ $t('notifications.interactions_info') }}</p>
          </div>
        </template>
      </div>
       <div class="h-48"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Notification { id: string; type: 'like' | 'follow' | 'reply' | 'retweet'; user: { name: string; avatarUrl: string }; postContent?: string; }

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    user: {
      name: 'Vue.js',
      avatarUrl: 'https://avatars.githubusercontent.com/u/6128107?s=200&v=4'
    },
    postContent: 'Olá mundo! 🚀 Este é o meu primeiro post no DevConnect...' 
  },
  {
    id: 'n2',
    type: 'follow',
    user: {
      name: 'Tailwind CSS',
      avatarUrl: 'https://avatars.githubusercontent.com/u/67109815?s=200&v=4'
    }
  },
  {
    id: 'n3',
    type: 'like',
    user: {
      name: 'Guillermo Rauch',
      avatarUrl: 'https://avatars.githubusercontent.com/u/139426?s=200&v=4'
    },
     postContent: 'Olá mundo! 🚀 Este é o meu primeiro post no DevConnect...' 
  },
];

</script>