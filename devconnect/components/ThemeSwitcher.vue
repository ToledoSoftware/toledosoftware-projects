<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors duration-200"
    :aria-label="$t('themeSwitcher.toggle_aria_label')"
  >
    <template v-if="$colorMode.value === 'dark'">
      <font-awesome-icon :icon="['fas', 'sun']" class="w-5 h-5" />
    </template>
    <template v-else>
      <font-awesome-icon :icon="['fas', 'moon']" class="w-5 h-5" />
    </template>
  </button>
</template>

<script setup lang="ts">
const $colorMode = useColorMode();

const toggleTheme = () => {
  $colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>