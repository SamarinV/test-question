import { useEffect, useState } from "react"
import "./Timer.css"

const Timer = ({ reset }: { reset: boolean }) => {
  const [minutes, setMinutes] = useState<number>(20)
  const [seconds, setSeconds] = useState<number>(0)

  useEffect(() => {
    if (reset) {
      setMinutes(20)
      setSeconds(0)
      localStorage.setItem("endTime", new Date(new Date().getTime() + 20 * 60000).toISOString())
    }
  }, [reset])

  useEffect(() => {
    const endTime = localStorage.getItem("endTime")

    if (endTime) {
      const endTimeDate = new Date(endTime)
      const now = new Date()

      const timeDiff = endTimeDate.getTime() - now.getTime()
      if (timeDiff > 0) {
        setMinutes(Math.floor((timeDiff / 1000 / 60) % 60))
        setSeconds(Math.floor((timeDiff / 1000) % 60))
      } else {
        setMinutes(0)
        setSeconds(0)
      }
    } else {
      const endTimeDate = new Date()
      endTimeDate.setMinutes(endTimeDate.getMinutes() + 20)
      localStorage.setItem("endTime", endTimeDate.toISOString())
      setMinutes(20)
      setSeconds(0)
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else {
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval)
          console.log("Время истекло!")
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [minutes, seconds])

  return <h2 className="time">{`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</h2>
}

export default Timer
