export type QuestionType = {
  id: number,
  topic: string,
  question: string,
  answers: Array<AnswerType>,
  photo?: string
}

export type AnswerType = {
  id: number,
  answer: string,
  isCorrect?: boolean,
  photos?: Array<string>,
}

export type SelectedAnswerType = {
  questionId: number,
  answerId: number
}