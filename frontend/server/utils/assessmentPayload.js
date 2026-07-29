function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isOption(value) {
  return isObject(value)
    && typeof value.id === 'string'
    && typeof value.label === 'string'
}

function isQuestion(value) {
  return isObject(value)
    && typeof value.id === 'string'
    && typeof value.title === 'string'
    && Array.isArray(value.options)
    && value.options.length > 0
    && value.options.every(isOption)
}

function isCasino(value) {
  return isObject(value)
    && typeof value.id === 'string'
    && typeof value.name === 'string'
    && isObject(value.bonus)
    && Array.isArray(value.matchingAnswers)
    && value.matchingAnswers.every(answer => typeof answer === 'string')
}

export function isAssessmentPayload(value) {
  return isObject(value)
    && Array.isArray(value.questions)
    && value.questions.length > 0
    && value.questions.every(isQuestion)
    && Array.isArray(value.casinos)
    && value.casinos.length > 0
    && value.casinos.every(isCasino)
}
