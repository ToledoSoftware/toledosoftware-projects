<template>
  <div class="min-h-screen border-x border-gray-200 dark:border-gray-700">
    <div class="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white p-4">{{ $t('feed.title') }}</h1>
    </div>

    <div
      @click="openModal"
      class="p-4 border-b border-gray-200 dark:border-gray-700 flex gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <img
        src="https://avatars.githubusercontent.com/u/52361625?v=4"
        class="w-12 h-12 rounded-full"
        :alt="$t('profile.change_avatar')"
      >
      <div class="flex-1 flex items-center">
        <span class="text-gray-400 dark:text-gray-500 text-lg">{{ $t('feed.whats_happening') }}</span>
      </div>
      <div class="flex items-center">
         <button class="bg-blue-500 text-white font-bold py-2 px-6 rounded-full opacity-50" disabled>
          {{ $t('sidebar.post') }}
        </button>
      </div>
    </div>

    <div v-if="isLoading">
      <PostItemSkeleton v-for="i in 3" :key="i" />
    </div>
    <div v-else>
      <div v-for="post in mockPosts" :key="post.id">
        <PostItem :post="post" />
      </div>
    </div>
    <div class="h-48"></div>
  </div>
</template>

<script setup lang="ts">
import { usePostModal } from '~/composables/usePostModal';
import { ref, onMounted } from 'vue'
import type { Post } from '~/types';

const { openModal } = usePostModal();
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Emmanuel Toledo',
      username: 'ToledoSoftware',
      avatarUrl: 'https://avatars.githubusercontent.com/u/52361625?v=4'
    },
    content: 'Olá mundo! 🚀\nEste é o meu primeiro post no DevConnect usando Nuxt 3, TypeScript e Tailwind.\n\nPróximo passo: API!',
    stats: {
      comments: 12,
      retweets: 5,
      likes: 42
    }
  },
  {
    id: '2',
    author: {
      name: 'Vue.js',
      username: 'vuejs',
      avatarUrl: 'https://avatars.githubusercontent.com/u/6128107?s=200&v=4'
    },
    content: 'O Nuxt 3 torna o desenvolvimento Fullstack com Vue uma experiência incrível. Componentes, layouts e plugins funcionam perfeitamente.',
    stats: {
      comments: 5,
      retweets: 22,
      likes: 103
    }
  },
  {
    id: '3',
    author: {
      name: 'Tailwind CSS',
      username: 'tailwindcss',
      avatarUrl: 'https://avatars.githubusercontent.com/u/67109815?s=200&v=4'
    },
    content: 'Classes de utilidade > arquivos .css gigantescos. Mude minha opinião.',
    stats: {
      comments: 78,
      retweets: 120,
      likes: 987
    }
  }
];
</script>