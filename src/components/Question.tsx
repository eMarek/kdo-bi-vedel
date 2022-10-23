import React, { Component } from 'react'
import { QuestionType, AnswerType, SelectedAnswerType } from '../types/QuestionsType'
import styled from 'styled-components'
import { DefaultTheme } from '../Style'

const SelectedQuestionStyled = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  background-color: white;
  padding: 30px;
`

const BtnCloseStyled = styled.div`
  text-align: right;

  & > span {
    padding: 20px;
    display: inline-block;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid black;
      background-color: #e4e4e4;
      display: inline-block;
      border-radius: 20px;
      cursor: pointer;
    }
  }
`

const TopicStyled = styled.div`
  font-weight: bold;
`

const QuestionStyled = styled.div`
  font-size: 36px;
`

const AnswerStyled = styled.div<{ backgroundColor: string }>`
  padding: 20px 10px;
  margin: 10px;
  border: 1px solid transparent;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.backgroundColor === DefaultTheme.SELECTED_COLOR ? '#ffffff' : 'inherit'};

  &:hover {
    border: 1px solid black;
    cursor: pointer;
  }
`

const BtnBottomStyled = styled.div`
  margin: 20px 10px;
  border: 1px solid black;
  background-color: #e4e4e4;
  display: inline-block;
  border-radius: 20px;
  padding: 15px 30px;

  &:hover {
    color: white;
    background-color: #373737;
    cursor: pointer;
  }
`

const PhotoFrameStyled = styled.div<{ backgroundImage?: string }>`
  width: 100%;
  height: 100%;
  background-color: #000000;
  position: absolute;
  background-image: url("${props => props.backgroundImage}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`

type QuestionProps = {
  selectedQuestion: QuestionType,
  selectedAnswers: Array<SelectedAnswerType>,
  handleClose: () => any,
  selectAnswer: (answer: AnswerType) => any,
  showCorrectAnswer: () => any,
  isClosedQuestion: boolean
}

type QuestionState = {
  photoDisplayed: boolean
}

class Question extends Component<QuestionProps, QuestionState> {
  state: QuestionState = {
    photoDisplayed: false
  }

  renderAnswer = (answer: AnswerType) => {
    const { selectedAnswers, isClosedQuestion } = this.props
    const isCorrectAnswer = Boolean(answer.isCorrect)
    const isSelectedAnswer = Boolean(selectedAnswers.find(selectedAnswer => selectedAnswer.answerId === answer.id))

    let backgroundColor = DefaultTheme.NATURAL_COLOR
    if (isClosedQuestion) {
      if (isCorrectAnswer) {
        backgroundColor = DefaultTheme.CORRECT_COLOR
      }
      if (isSelectedAnswer && !isCorrectAnswer) {
        backgroundColor = DefaultTheme.WRONG_COLOR
      }
    } else {
      if (isSelectedAnswer) {
        backgroundColor = DefaultTheme.SELECTED_COLOR
      }
    }

    return <AnswerStyled key={answer.id} onClick={() => this.props.selectAnswer(answer)} backgroundColor={backgroundColor}>
      {answer.answer}
    </AnswerStyled>
  }

  togglePhoto = () => {
    this.setState(oldState => ({
      photoDisplayed: !oldState.photoDisplayed
    }))
  }

  render() {
    const { photoDisplayed } = this.state
    const { isClosedQuestion, selectedQuestion } = this.props
    const { topic, question, answers, photo } = selectedQuestion
    if (photoDisplayed) {
      return <PhotoFrameStyled onClick={this.togglePhoto} backgroundImage={photo}></PhotoFrameStyled>
    }
    return <SelectedQuestionStyled>
      <BtnCloseStyled onClick={this.props.handleClose}>
        <span>Zapri</span>
      </BtnCloseStyled>
      <TopicStyled>{topic}</TopicStyled>
      <hr />
      <QuestionStyled>{question}</QuestionStyled>
      <hr />
      <div>{answers.map(this.renderAnswer)}</div>
      {!isClosedQuestion && <BtnBottomStyled onClick={this.props.showCorrectAnswer}>Pokaži odgovor</BtnBottomStyled>}
      {isClosedQuestion && photo && <BtnBottomStyled onClick={this.togglePhoto}>Pokaži sliko</BtnBottomStyled>}
    </SelectedQuestionStyled>
  }
}

export default Question
