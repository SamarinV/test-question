import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Answer = {
  answer: string | string[]
  questionId: number
  questionDescription: string
}

type QuestionState = {
  answers: Answer[]
}

const initialState: QuestionState = {
  answers: [],
}

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addAnswer(state, action: PayloadAction<Answer>) {
      console.log(action.payload)
      state.answers.push(action.payload)
    },
    resetAnswers(state) {
      state.answers = []
    },
  },
})

export const { addAnswer, resetAnswers } = questionSlice.actions
export default questionSlice.reducer
