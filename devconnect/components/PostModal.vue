<template>
  <Transition name="modal-fade">
    <div
      v-if="isModalOpen"
      @click.self="closeModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70 backdrop-blur-sm"
    >

      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg border border-gray-200 dark:border-gray-700 relative">

        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
          :aria-label="$t('postModal.close_aria_label')"
        >
          <font-awesome-icon :icon="['fas', 'times']" class="text-2xl" />
        </button>

        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{{ $t('postModal.title') }}</h2>

        <div class="flex gap-4">
          <img
            src="https://avatars.githubusercontent.com/u/52361625?v=4"
            class="w-12 h-12 rounded-full"
            :alt="$t('profile.change_avatar')"
          >
          <textarea
            class="w-full flex-1 bg-transparent text-gray-900 dark:text-white text-lg p-2 focus:outline-none"
            :placeholder="$t('postModal.placeholder')"
            rows="5"
          ></textarea>
        </div>

        <div class="text-right mt-4">
          <button class="bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-full transition-colors">
            {{ $t('postModal.submit_button') }}
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { isModalOpen, closeModal } = usePostModal();
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }
</style>