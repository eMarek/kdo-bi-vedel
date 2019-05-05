// @flow

import React, { Component } from 'react'
import questions from '../mocks/questions'
import type { QuestionType, AnswerType, SelectedAnswerType } from '../types/QuestionsType'
import Question from './Question'
import styled from 'styled-components'
import { DefaultTheme } from '../Style'

const TopicStyled = styled.div`
  margin: 20px;
  width: 26%;
  height: 200px;
  line-height: 200px;
  display: inline-block;
  border: 1px solid transparent;
  background-color: ${props => props.backgroundColor};

  &:hover {
    border: 1px solid black;
    cursor: pointer;
  }
`

type TopicsProps = {}

type TopicsState = {
  selectedQuestion: ?QuestionType,
  allSelectedAnswers: Array<SelectedAnswerType>,
  closedQuestions: Array<number>
}

class Topics extends Component<TopicsProps, TopicsState> {
  questions: Array<QuestionType> = questions
  state: TopicsState = {
    selectedQuestion: null,
    allSelectedAnswers: [],
    closedQuestions: []
  }

  showQuestion = (question: QuestionType) => {
    this.setState({
      selectedQuestion: question
    })
  }

  hideQuestion = () => {
    this.setState({
      selectedQuestion: null
    })
  }

  handleSelectedAnswer = (answer: AnswerType) => {
    const { selectedQuestion, allSelectedAnswers } = this.state
    if (!selectedQuestion) {
      return
    }
    const selectedAnswers = allSelectedAnswers.filter(selectedAnswer => selectedAnswer.questionId !== selectedQuestion.id)
    selectedAnswers.push({
      questionId: selectedQuestion.id,
      answerId: answer.id
    })
    this.setState({ allSelectedAnswers: selectedAnswers })
  }

  handleCloseQuestion = () => {
    const { selectedQuestion, closedQuestions } = this.state
    if (!selectedQuestion) {
      return
    }
    if (closedQuestions.includes(selectedQuestion.id)) {
      return
    }
    closedQuestions.push(selectedQuestion.id)
    this.setState({ closedQuestions })
  }

  renderTopic = (question: QuestionType) => {
    const { closedQuestions, allSelectedAnswers } = this.state
    const isClosedQuestion = Boolean(closedQuestions.includes(question.id))

    let backgroundColor = DefaultTheme.NATURAL_COLOR
    if (isClosedQuestion) {
      let isCorrectAnswered = true
      const correctAnswers = question.answers.filter(questionAnswer => questionAnswer.isCorrect).map(questionAnswer => questionAnswer.id)
      const selectedAnswers = allSelectedAnswers.filter(selectedAnswer => selectedAnswer.questionId === question.id).map(selectedAnswer => selectedAnswer.answerId)

      correctAnswers.forEach(correctAnswer => {
        if (!selectedAnswers.includes(correctAnswer)) {
          isCorrectAnswered = false
        }
      })
      selectedAnswers.forEach(selectedAnswer => {
        if (!correctAnswers.includes(selectedAnswer)) {
          isCorrectAnswered = false
        }
      })

      if (isCorrectAnswered && selectedAnswers.length > 0) {
        backgroundColor = DefaultTheme.CORRECT_COLOR
      } else {
        backgroundColor = DefaultTheme.WRONG_COLOR
      }
    }

    return <TopicStyled key={ question.id } onClick={ () => this.showQuestion(question) } backgroundColor={ backgroundColor}>{ question.topic }</TopicStyled>
  }

  render() {
    const { selectedQuestion, allSelectedAnswers, closedQuestions } = this.state
    if (!selectedQuestion) {
      return this.questions.map(this.renderTopic)
    }
    const selectedAnswers = allSelectedAnswers.filter(selectedAnswer => selectedAnswer.questionId === selectedQuestion.id)
    const isClosedQuestion = Boolean(closedQuestions.includes(selectedQuestion.id))
    return <Question
      selectedQuestion={ selectedQuestion }
      selectedAnswers={ selectedAnswers }
      handleClose={ this.hideQuestion }
      selectAnswer={ this.handleSelectedAnswer }
      showCorrectAnswer={ this.handleCloseQuestion }
      isClosedQuestion={ isClosedQuestion }
    />
  }
}

export default Topics
