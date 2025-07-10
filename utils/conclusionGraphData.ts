// Data model for conclusion graph load session storage enries
export interface QuizResult {
  title: string;
  topic: string;
  value: number;
}
/**
 * sum all quizResult values for a topic and return a value between 0 – 5
 * @param results – all quiz results
 * @param {string} topic – topic to filter results for
 * @returns {number}
 */
function averageTopicResult(results: QuizResult[], topic: string): number {
  const topicItems = results.filter(
    // filter results by topic
    (results) => results.topic === topic,
  );
  if (topicItems.length === 0) return 0;
  const totalValue = topicItems.reduce(
    (accumulated, item) => accumulated + item.value,
    0,
  );
  const maxValue = topicItems.length * 5;
  return (totalValue / maxValue) * 5;
}
export function generalResult(results: QuizResult[]) {
  return averageTopicResult(results, "general");
}
export function currentDisinformationResult(results: QuizResult[]) {
  return averageTopicResult(results, "current-disinformation");
}
export function audiovisualDisinformationResult(results: QuizResult[]) {
  return averageTopicResult(results, "audiovisual-disinformation");
}
export function analysisResult(results: QuizResult[]) {
  return averageTopicResult(results, "results");
}
