// @flow

export type QuestionType = {
  id: 1,
  topic: string,
  question: string,
  answers: Array<AnswerType>,
  photo?: string
}

export type AnswerType = {
  id: 2,
  answer: string,
  isCorrect?: boolean
}

export type SelectedAnswerType = {
  questionId: number,
  answerId: number
}