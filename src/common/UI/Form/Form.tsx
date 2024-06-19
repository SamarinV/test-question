import { useFormik } from "formik"
import * as Yup from "yup"
import { Question } from "../../types"
import "./Form.css"
import { useDispatch } from "react-redux"
import { addAnswer } from "../../redux/questionSlice"

type FormValues = {
  answers: string | string[]
}

type Props = {
  restartTest: () => void
  question: Question
  clickAnswerButton: () => void
}

const Form = ({ question, restartTest, clickAnswerButton }: Props) => {
  const dispatch = useDispatch()

  const initialValues: FormValues = question.type === "checkbox" ? { answers: [] } : { answers: "" }

  const validationSchema = Yup.object().shape({
    answers:
      question.type === "checkbox"
        ? Yup.array().of(Yup.string().required("Обязательно")).nullable()
        : Yup.string().required("Обязательно").nullable(),
  })

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addAnswer({ questionId: question.id, questionDescription: question.description, answer: values.answers })
      )
      clickAnswerButton()
      resetForm()
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <h2>{question.description}</h2>

        {question.type === "checkbox" &&
          question.answers.map((el, index) => (
            <label key={index} className={`checkbox-container`}>
              <input
                type="checkbox"
                id={`answer-${index}`}
                name="answers"
                value={el}
                onChange={formik.handleChange}
                checked={(formik.values.answers as string[]).includes(el)}
              />
              <div className="custom-checkbox"></div>
              {el}
            </label>
          ))}

        {question.type === "radio" &&
          question.answers.map((el, index) => (
            <label key={index} className={`checkbox-container`}>
              <input
                type="radio"
                id={`answer-${index}`}
                name="answers"
                value={el}
                onChange={formik.handleChange}
                checked={formik.values.answers === el}
              />
              <div className="custom-radio"></div>
              {el}
            </label>
          ))}

        {question.type === "smallTextAnswer" && (
          <label className="text-container">
            <input
              type="text"
              id="answer-text"
              name="answers"
              value={formik.values.answers as string}
              onChange={formik.handleChange}
            />
          </label>
        )}

        {question.type === "bigTextAnswer" && (
          <label className="text-container">
            <textarea
              id="answer-text"
              name="answers"
              value={formik.values.answers as string}
              onChange={formik.handleChange}
            />
          </label>
        )}

        <button
          disabled={
            question.type === "checkbox" ? (formik.values.answers as string[]).length === 0 : !formik.values.answers
          }
          className="submit-button"
          type="submit"
        >
          Ответить
        </button>
      </form>
    </>
  )
}

export default Form
