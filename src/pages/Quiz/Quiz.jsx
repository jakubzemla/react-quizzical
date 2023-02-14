import { useState, useEffect } from 'react'
import axios from 'axios'
import randomNumber from '../../helpers/randomNumber'
import Questions from './Questions'

const Quiz = () => {
    // const [api, setApi] = useState(`https://opentdb.com/api.php?amount=${randomNumber(5,15)}&type=multiple`)
    const [api, setApi] = useState(`https://opentdb.com/api.php?amount=3&type=multiple`)
    const [data, setData] = useState([])

    const categoriesApi = "https://opentdb.com/api_category.php"
    const [categoriesData, setCategoriesData] = useState([])

    const [showAnswers, setShowAnswers] = useState(false)
    const [score, setScore] = useState(0)
    const [again, setAgain] = useState(false)

    const handleAnswers = (optionInfo) => {
        setShowAnswers(true)
        setAgain(true)
    }

    const addPoint = () => {
        again && setScore(prevScore => prevScore + 1)
    }

    const reset= () => {
        axios.get(api).then(response => setData(response.data.results))
        axios.get(categoriesApi).then(response => setCategoriesData(response.data.trivia_categories))
        setShowAnswers(false)
        setAgain(false)
        setScore(0)
    }

    useEffect(() => {
        axios.get(api).then(response => setData(response.data.results))
        axios.get(categoriesApi).then(response => setCategoriesData(response.data.trivia_categories))
    }, [])

    return(
        <div className="container">
            <Questions allQuestions={data} allCategories={categoriesData} reset={reset} again={again} handleAnswers={handleAnswers} showAnswers={showAnswers} score={score} addPoint={addPoint} />
        </div>
    )
}

export default Quiz