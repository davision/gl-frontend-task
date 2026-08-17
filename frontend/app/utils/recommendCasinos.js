export function scoreCasino(casino, selectedAnswerIds) {
  const selected = new Set(selectedAnswerIds.filter(Boolean));

  return casino.matchingAnswers.filter((id) => selected.has(id)).length;
}

export function recommendCasinos(casinos, selectedAnswerIds) {
  return casinos
    .map((casino) => ({
      ...casino,
      score: scoreCasino(casino, selectedAnswerIds),
    }))
    .sort((a, b) => b.score - a.score);
}
