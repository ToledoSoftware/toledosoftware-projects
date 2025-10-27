import { ref } from 'vue'

export const useScramble = (initialText: string = '') => {

  const displayedText = ref(initialText)
  const chars = '!<>-_\\/[]{}—=+*^?#________'
  let interval: NodeJS.Timeout | null = null

  const scramble = (originalText: string) => {
    if (interval) clearInterval(interval)
    let iteration = 0

    interval = setInterval(() => {
      let scrambled = ''
      for (let i = 0; i < originalText.length; i++) {
        if (i < iteration) {
          scrambled += originalText[i]
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      displayedText.value = scrambled
      if (iteration >= originalText.length) {
        if (interval) clearInterval(interval)
      }
      iteration += 1 / 3
    }, 30)
  }

  return { displayedText, scramble }
}