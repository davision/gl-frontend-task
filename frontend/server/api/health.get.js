export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return $fetch('/api/health', {
    baseURL: config.apiBaseUrl,
  })
})
