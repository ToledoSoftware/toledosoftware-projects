<template>
  <div class="pb-16 lg:pb-0">
    <div class="min-h-screen border-x border-gray-200 dark:border-gray-700">
      
      <div class="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Emmanuel Toledo</h1>
        <span class="text-sm text-gray-500">{{ $t('profile.posts_count', { count: 12 }) }}</span> 
      </div>

      <div>
        <div class="h-48 bg-gray-300 dark:bg-gray-700 relative">
          <button class="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 text-xs">
            <font-awesome-icon :icon="['fas', 'camera']" class="mr-1"/> {{ $t('profile.change_cover') }}
          </button>
        </div>

        <div class="px-4 py-2 relative">
          <div class="flex justify-between items-end">
            <div class="relative -mt-16">
              <img 
                src="https://avatars.githubusercontent.com/u/52361625?v=4" 
                class="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700"
                alt="Avatar de Emmanuel Toledo"
              >
              <button class="absolute bottom-1 right-1 bg-black/60 text-white rounded-full p-1.5" :aria-label="$t('profile.change_avatar')">
                <font-awesome-icon :icon="['fas', 'camera']" class="text-sm"/>
              </button>
            </div>
            
            <button class="border border-gray-300 dark:border-gray-600 rounded-full px-4 py-1.5 font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {{ $t('profile.edit_profile') }}
            </button>
          </div>
        </div>

        <div class="px-4 mt-2">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Emmanuel Toledo</h2>
          <p class="text-gray-500">@ToledoSoftware</p>
          <p class="mt-3 text-gray-800 dark:text-gray-300">
            Desenvolvedor Fullstack | Estudante de Engenharia de Computação 🚀<br>
            Apaixonado por C++, Python, JS e otimização.
          </p>
          <div class="flex gap-4 text-gray-500 text-sm mt-3">
            <span>📍 São Paulo, Brasil</span>
            <span>📅 {{ $t('profile.joined_date', { date: 'Outubro 2025' }) }}</span>
          </div>
        </div>

        <div class="px-4 mt-4 flex gap-5">
          <div class="text-sm">
            <span class="font-bold text-gray-900 dark:text-white">150</span>
            <span class="text-gray-500 ml-1">{{ $t('profile.following') }}</span>
          </div>
          <div class="text-sm">
            <span class="font-bold text-gray-900 dark:text-white">350</span>
            <span class="text-gray-500 ml-1">{{ $t('profile.followers') }}</span>
          </div>
        </div>

        <div class="mt-6 border-b border-gray-200 dark:border-gray-700">
          <nav class="flex justify-around -mb-px">
            <button class="profile-tab active">{{ $t('profile.tab_posts') }}</button>
            <button class="profile-tab">{{ $t('profile.tab_replies') }}</button>
            <button class="profile-tab">{{ $t('profile.tab_media') }}</button>
            <button class="profile-tab">{{ $t('profile.tab_likes') }}</button>
          </nav>
        </div>

        <div>
          <PostItem v-if="mockPosts.length > 0" :post="mockPosts[0]" />
          <div v-else class="p-4 text-center text-gray-500">
            {{ $t('profile.no_posts_found') }}
          </div>
        </div>

      </div>
       <div class="h-48"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types';

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Emmanuel Toledo',
      username: 'ToledoSoftware',
      avatarUrl: 'https://avatars.githubusercontent.com/u/52361625?v=4' 
    },
    content: 'Este é um post fixado no meu perfil! Bem-vindos!',
    stats: { comments: 2, retweets: 1, likes: 15 }
  }
];
</script>

<style scoped>
.profile-tab { @apply py-3 px-4 text-center font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 flex-1 whitespace-nowrap; }
.profile-tab.active { @apply border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400; }
</style>