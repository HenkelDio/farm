export function useSound() {
  const play = (file, volume = 0.5) => {
    const audio = new Audio(`/sounds/${file}`)
    audio.volume = volume
    audio.play()
  }

  return { play }
}
