<template>
  <article class="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">

    <div class="flex-shrink-0">
      <img :src="post.author.avatarUrl" :alt="post.author.name + ' Avatar'" class="w-12 h-12 rounded-full" />
    </div>

    <div class="flex-grow">

      <div class="flex items-center gap-2 mb-1">
        <span class="font-bold text-gray-900 dark:text-white">{{ post.author.name }}</span>
        <span class="text-gray-500 dark:text-gray-500">@{{ post.author.username }}</span>
      </div>

      <p class="text-gray-800 dark:text-gray-300 whitespace-pre-wrap">{{ post.content }}</p>

      <div class="flex justify-between mt-4 text-gray-500 dark:text-gray-500 max-w-sm">

        <button class="flex items-center gap-2 hover:text-blue-500" :aria-label="$t('postItem.comments_aria_label')">
          <font-awesome-icon :icon="['fas', 'comment']" />
          <span>{{ post.stats.comments }}</span>
        </button>

        <button class="flex items-center gap-2 hover:text-green-500" :aria-label="$t('postItem.retweets_aria_label')">
          <font-awesome-icon :icon="['fas', 'retweet']" />
          <span>{{ post.stats.retweets }}</span>
        </button>

        <button
          @click="toggleLike"
          class="flex items-center gap-2 group focus:outline-none"
           :aria-label="$t('postItem.likes_aria_label')"
        >
          <font-awesome-icon
            :icon="['fas', 'heart']"
            :class="{ 'text-red-500': isLiked }"
            class="group-hover:text-red-500 transition-transform duration-150 ease-out active:scale-125"
          />
          <span
            :class="{ 'text-red-500': isLiked }"
            class="group-hover:text-red-500"
          >
            {{ isLiked ? post.stats.likes + 1 : post.stats.likes }}
          </span>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Post } from '~/types';

const props = defineProps<{ post: Post }>();
const isLiked = ref(false);
const toggleLike = () => { isLiked.value = !isLiked.value; };
</script>