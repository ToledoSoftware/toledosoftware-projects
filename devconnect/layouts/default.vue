<template>
  <div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
    <BottomNav />

    <div class="max-w-7xl mx-auto lg:grid lg:grid-cols-10">
      
      <aside class="hidden lg:block lg:col-span-2">
        <SidebarMenu />
      </aside>
      
      <main class="col-span-10 lg:col-span-5">
        <slot />
      </main>

      <aside class="hidden lg:block lg:col-span-3">
        <WidgetsBar />
      </aside>

    </div>
  </div>
</template>

<script setup lang="ts">
</script>