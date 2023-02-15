import { useState, useEffect } from 'react'
import axios from 'axios'
import Questions from './Questions'

const Quiz = (props) => {
    const {category, questionsCount, difficulty} = props.apiSetup
    const api = `https://opentdb.com/api.php?amount=${questionsCount}&category=${category}&difficulty=${difficulty}&type=multiple`
    const [data, setData] = useState([])

    const [showAnswers, setShowAnswers] = useState(false)
    const [score, setScore] = useState(0)
    const [again, setAgain] = useState(false)

    // Click event in Questions.jsx
    const handleAnswers = () => {
        setShowAnswers(true)
        setAgain(true)
    }

    // Used in OneQuestion.jsx
    const addPoint = () => {
        again && setScore(prevScore => prevScore + 1)
    }

    // Click event in Questions.jsx
    const reset= () => {
        axios.get(api).then(response => setData(response.data.results))
        setShowAnswers(false)
        setAgain(false)
        setScore(0)
    }

    useEffect(() => {
        axios.get(api).then(response => setData(response.data.results))
    }, [])

    return(
        <div className="container">
            <Questions allQuestions={data} reset={reset} handleAnswers={handleAnswers} showAnswers={showAnswers} score={score} addPoint={addPoint} handleNavigateToHome={props.handleNavigateToHome}/>
        </div>
    )
}

export default Quiz