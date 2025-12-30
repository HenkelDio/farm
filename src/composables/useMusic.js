import { ref } from 'vue'

let bgm = null

const isPlaying = ref(false)
const volume = ref(0.4)

export function useMusic() {
  function init() {
    if (bgm) return

    bgm = new Audio('/sounds/theme.mp3')
    bgm.loop = true
    bgm.volume = volume.value
  }

  function play() {
    if (!bgm) init()
    bgm.play()
    isPlaying.value = true
  }

  function pause() {
    if (!bgm) return
    bgm.pause()
    isPlaying.value = false
  }

  function toggle() {
    isPlaying.value ? pause() : play()
  }

  function setVolume(v) {
    volume.value = v
    if (bgm) bgm.volume = v
  }

  return {
    play,
    pause,
    toggle,
    setVolume,
    isPlaying,
    volume,
  }
}
