export function normalizeString(str) {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9\s]/g, '') // quita símbolos
    .replace(/\s+/g, ' ') // normaliza espacios
}

export function checkCapitalMatch(userInput, stateObj) {
  const cleanInput = normalizeString(userInput)
  if (!cleanInput) return false

  if (cleanInput === normalizeString(stateObj.capital)) return true

  if (stateObj.validAnswers) {
    return stateObj.validAnswers.some((ans) => normalizeString(ans) === cleanInput)
  }

  return false
}
