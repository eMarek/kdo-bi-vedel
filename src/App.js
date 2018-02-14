import React, { Component } from 'react';
import './App.css';
import questions from './questions'

class App extends Component {
  constructor() {
    super()

    this.state = {
      questions: questions,
      selectedQuestion: null
    }
  }

  showQuestion(question) {
    if (question.topic === '?') {
      let answeredQuestions = 0
      this.state.questions.forEach(question => {
        if (question.correctAnswerId && question.correctAnswerId) {
          answeredQuestions++
        }
      })

      if (answeredQuestions < this.state.questions.length - 1) {
        alert("Najprej je potrebno odgovoriti na ostala vprašanja!")
        return
      }
    }

    this.setState({
      selectedQuestion: question
    })
  }

  closeQuestion() {
    this.setState({
      selectedQuestion: null
    })
  }

  selectAnswer(selectedQuestion, selectedAnswer) {
    selectedQuestion.selectedAnswerId = selectedAnswer.id
    this.setState({
      selectedQuestion: selectedQuestion
    })
  }

  showCorrectAnswer(selectedQuestion) {
    if (!selectedQuestion.selectedAnswerId) {
      alert("Najprej izberi odgovor!")
      return
    }

    const correctAnswer = selectedQuestion.answers.find(answer => answer.isCorrect)
    selectedQuestion.correctAnswerId = correctAnswer.id
    this.setState({
      selectedQuestion: selectedQuestion
    })
  }

  renderTopic(question) {
    let className = 'topic'
    if (question.correctAnswerId && question.selectedAnswerId) {
      if (question.correctAnswerId === question.selectedAnswerId) {
        className += ' topic--correct-answer'
      } else {
        className += ' topic--wrong-answer'
      }
    }

    return (
      <div key={ question.id } onClick={ () => this.showQuestion(question) } className={ className }>{ question.topic }</div>
    )
  }

  renderSelectedQuestion() {
    if (!this.state.selectedQuestion) {
      return null
    }

    const selectedQuestion = this.state.selectedQuestion

    return (
      <div className="selectedQuestion">
        <div onClick={ () => this.closeQuestion() } className="selectedQuestion__close"><span>Zapri</span></div>
        <div className="selectedQuestion__topic">{ selectedQuestion.topic }</div>
        <hr />
        <div className="selectedQuestion__question">{ selectedQuestion.question }</div>
        <hr />
        <div>{ selectedQuestion.answers.map(answer => this.renderAnswer(selectedQuestion, answer))}</div>
        <div onClick={ () => this.showCorrectAnswer(selectedQuestion) } className="selectedQuestion__showAnswerBtn">Pokaži odgovor</div>
      </div>
    )
  }

  renderAnswer(selectedQuestion, answer) {
    let className = 'selectedQuestion__answer'
    if (selectedQuestion.selectedAnswerId === answer.id) {
      className += ' selectedQuestion__answer--seleceted'
    }

    if (selectedQuestion.correctAnswerId === answer.id) {
      className += ' selectedQuestion__answer--correct'      
    }

    return (
      <div key={ answer.id } onClick={ () => this.selectAnswer(selectedQuestion, answer) } className={ className }>{ answer.answer }</div>
    )
  }

  render() {
    return (
      <div className="app">
        { this.state.questions.map(question => this.renderTopic(question)) }
        { this.renderSelectedQuestion() }
      </div>
    );
  }
}

export default App;
