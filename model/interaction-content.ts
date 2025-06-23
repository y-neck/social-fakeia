export interface SelectQuizAnswer {
  answer: string;
  correct: number;
  correctAnswer: string;
}
export interface CheckboxQuizAnswer {
  answer: string;
  correct: number;
}

export interface RadioQuiz {
  quizId: string;
  title: string;
  topic: string /* general, audiovisual, results, tipps */;
  answers: Array<SelectQuizAnswer>;
}

export interface CheckboxQuiz {
  quizId: string;
  title: string;
  topic: string /* general, audiovisual, results, tipps */;
  answers: Array<CheckboxQuizAnswer>;
}

export type SelectInteractionContent = RadioQuiz[];
export type CheckboxInteractionContent = CheckboxQuiz[];
