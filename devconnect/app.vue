<template>
  <div>
    <NuxtLayout>
      <NuxtPage v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </NuxtPage>
    </NuxtLayout>
    <PostModal />
  </div>
</template>

<script setup lang="ts">
// Script pode ficar vazio ou conter apenas imports essenciais, se houver
</script>

<style>
:root {
  --scrollbar-track: #f1f1f1;
  --scrollbar-thumb: #c1c1c1;
  --scrollbar-thumb-hover: #a8a8a8;
  --scrollbar-border: #f1f1f1;
}

html.dark {
  --scrollbar-track: #111827;
  --scrollbar-thumb: #4F46E5;
  --scrollbar-thumb-hover: #6366F1;
  --scrollbar-border: #111827;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-text-fill-color: #FFFFFF !important;
    -webkit-box-shadow: 0 0 0 30px #374151 inset !important;
    box-shadow: 0 0 0 30px #374151 inset !important;
    caret-color: #FFFFFF !important;
}

html:not(.dark) input:-webkit-autofill,
html:not(.dark) input:-webkit-autofill:hover,
html:not(.dark) input:-webkit-autofill:focus,
html:not(.dark) input:-webkit-autofill:active {
    -webkit-text-fill-color: #000000 !important;
    -webkit-box-shadow: 0 0 0 30px #E5E7EB inset !important;
    box-shadow: 0 0 0 30px #E5E7EB inset !important;
    caret-color: #000000 !important;
}

html {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}
::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  border-radius: 10px;
  border: 2px solid var(--scrollbar-border);
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--scrollbar-thumb-hover);
}
</style>