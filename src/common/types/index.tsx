export type Question = {
  id: number
  description: string
  answers: string[]
  type: "checkbox" | "radio" | "smallTextAnswer" | "bigTextAnswer"
}
