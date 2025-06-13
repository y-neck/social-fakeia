export interface QuizAnswer {
  answer: string;
  correct: number;
  correctAnswer: string;
}

export interface RadioQuiz {
  quizId: string;
  title: string;
  topic: string /* general, audiovisual, results, tipps */;
  answers: Array<QuizAnswer>;
}

export type InteractionContent = RadioQuiz[];
