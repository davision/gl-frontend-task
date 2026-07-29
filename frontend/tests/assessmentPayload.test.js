import { describe, expect, it } from 'vitest'
import { isAssessmentPayload } from '../server/utils/assessmentPayload.js'

const validPayload = {
  questions: [
    {
      id: 'experience',
      title: 'How much experience do you have?',
      options: [
        {
          id: 'new-player',
          label: 'I am new',
        },
      ],
    },
  ],
  casinos: [
    {
      id: 'north-star',
      name: 'North Star Casino',
      bonus: {
        title: 'Welcome bonus',
      },
      matchingAnswers: ['new-player'],
    },
  ],
}

describe('isAssessmentPayload', () => {
  it('accepts the expected API contract', () => {
    expect(isAssessmentPayload(validPayload)).toBe(true)
  })

  it('rejects a question without answer options', () => {
    const payload = structuredClone(validPayload)
    payload.questions[0].options = []

    expect(isAssessmentPayload(payload)).toBe(false)
  })

  it('rejects a casino without matching answers', () => {
    const payload = structuredClone(validPayload)
    delete payload.casinos[0].matchingAnswers

    expect(isAssessmentPayload(payload)).toBe(false)
  })
})
