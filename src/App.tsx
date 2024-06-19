import { Box, Flex } from "@radix-ui/themes"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./App.css"
import Form from "./common/UI/Form/Form"
import Timer from "./common/UI/Timer/Timer"
import { mockData } from "./common/mockData"
import { resetAnswers } from "./common/redux/questionSlice"
import { Question } from "./common/types"

import { RootState } from "./common/redux/store"

function App() {
  const dispatch = useDispatch()
  const [question, setQuestion] = useState<Question | null>(null)
  const [resetTimer, setResetTimer] = useState<boolean>(false)
  const answers = useSelector((state: RootState) => state.data.answers)

  useEffect(() => {
    setQuestion(mockData[answers.length])
  })

  const clickAnswerButton = () => {
    if (answers.length < mockData.length) {
      setQuestion(mockData[answers.length + 1])
    } else {
      alert("test окончен")
    }
  }

  const restartTest = () => {
    dispatch(resetAnswers())
    setQuestion(mockData[0])
    setResetTimer((prev) => !prev)
  }

  if (!question) {
    return (
      <div className="test-ended">
        <h1>Тест закончен</h1>
        <button className="button-restart" onClick={restartTest}>
          Начать сначала
        </button>
      </div>
    )
  }

  return (
    <Box style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}>
      <Flex direction="column" gap="2" style={{ padding: "4rem" }}>
        <header>
          <Flex gap="1">
            {mockData.map((el) => (
              <div
                key={el.id}
                className={`progress-item ${
                  el.id < question.id ? "successful" : el.id === question.id ? "active" : ""
                }`}
              ></div>
            ))}
          </Flex>
          <div className="title-and-time">
            <h2>Тестирование</h2>
            <Timer reset={resetTimer} />
          </div>
        </header>
        <main>
          <Form question={question} restartTest={restartTest} clickAnswerButton={clickAnswerButton} />
        </main>
      </Flex>
    </Box>
  )
}

export default App
