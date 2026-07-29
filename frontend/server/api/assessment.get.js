import { isAssessmentPayload } from '../utils/assessmentPayload.js'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const payload = await $fetch('/api/assessment', {
    baseURL: config.apiBaseUrl,
  })

  if (!isAssessmentPayload(payload)) {
    throw createError({
      statusCode: 502,
      statusMessage: 'The assessment API returned an invalid response.',
    })
  }

  return payload
})
