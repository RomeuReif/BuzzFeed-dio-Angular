import { Component, OnInit } from '@angular/core';

import Quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ''

  questionsIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor() { }
 
  ngOnInit(): void {
    if(Quizz_questions){
      this.finished = false
      this.title = Quizz_questions.title

      this.questions = Quizz_questions.questions
      this.questionSelected = this.questions[this.questionsIndex]

      this.questionsIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionsIndex)
      console.log(this.questionMaxIndex)
      
    }
  }


  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionsIndex += 1

    if(this.questionMaxIndex > this.questionsIndex){
      this.questionSelected = this.questions[this.questionsIndex]
    }else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = Quizz_questions.results[finalAnswer as keyof typeof Quizz_questions.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=> {
      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length
      ){
        return previous
      }else {
        return current
      }
    })
    return result
  }
}
