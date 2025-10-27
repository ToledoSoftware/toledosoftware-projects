<template>
  <div>
    <div class="text-center mb-8">
      <font-awesome-icon :icon="['fab', 'connectdevelop']" class="text-blue-600 dark:text-blue-400 text-6xl" />
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mt-2 font-mono h-9">
        {{ displayedText }} </h1>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('login.email_label') }}</label>
        <input 
          type="email" id="email" 
          class="mt-1 w-full p-3 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="voce@email.com"
        >
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('login.password_label') }}</label>
        <input 
          type="password" id="password" 
          class="mt-1 w-full p-3 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="********"
        >
      </div>

      <button 
        type="submit" 
        class="w-full bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors duration-200"
      >
        {{ $t('login.submit_button') }}
      </button>

      <p class="text-center text-gray-500 dark:text-gray-500 text-sm">
        {{ $t('login.no_account') }} 
        <NuxtLink to="/register" class="text-blue-600 dark:text-blue-400 hover:underline">{{ $t('login.register_link') }}</NuxtLink>
      </p>

    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const ORIGINAL_TITLE = "DevConnect";
const { displayedText, scramble } = useScramble(ORIGINAL_TITLE); 
definePageMeta({ layout: 'auth' });
const handleLogin = () => { console.log('Login attempt...'); };
onMounted(() => { setTimeout(() => { scramble(ORIGINAL_TITLE); }, 100); });
</script>