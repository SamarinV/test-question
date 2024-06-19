import { Question } from "../types";

export const mockData: Question[] = [
  { id: 1, description: "Сколько будет 2+2", answers: ["2", "3", "4"], type: 'checkbox'},
  { id: 2, description: "Сколько будет 3+3", answers: ["20", "3", "4"], type: 'checkbox' },
  { id: 3, description: "Сколько будет 4+4", answers: ["21", "3", "4"], type: 'radio' },
  { id: 4, description: "Сколько будет 5+5", answers: ["22", "3", "4"], type: 'radio' },
  { id: 5, description: "Сколько будет 6+6", answers: ["23", "3", "4"], type: 'smallTextAnswer' },
  { id: 6, description: "Сколько будет 2+2", answers: ["24", "3", "4"], type: 'smallTextAnswer' },
  { id: 7, description: "Сколько будет 3+3", answers: ["25", "3", "4"], type: 'bigTextAnswer' },
  { id: 8, description: "Сколько будет 4+4", answers: ["26", "3", "4"], type: 'bigTextAnswer' },
  { id: 9, description: "Сколько будет 5+5", answers: ["27", "3", "4"], type: 'checkbox' },
  { id: 10, description: "Сколько будет 6+6", answers: ["28", "3", "4"], type: 'radio' },
]
