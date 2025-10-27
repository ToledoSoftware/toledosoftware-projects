<template>
  <div class="flex items-center gap-1 border border-gray-300 dark:border-gray-700 rounded-full p-0.5 bg-gray-100 dark:bg-gray-800">
    <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      class="px-3 py-1 text-xs font-bold rounded-full transition-colors duration-200"
      :class="{
        'bg-white text-gray-900 shadow': currentLocale === locale.code,
        'dark:bg-gray-700 dark:text-white': currentLocale === locale.code,
        'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white': currentLocale !== locale.code
      }"
    >
      {{ locale.code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locale: currentLocale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string; name: string }>) || [];
});
</script>