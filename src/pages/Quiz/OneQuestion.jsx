import { useState, useEffect } from 'react'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import Option from './Option'
import './OneQuestion.scss'

const OneQuestion = (props) => {
    const {question, correctAnswer, allAnswers} = props.question
    const {defaultStyles, choiceStyles, correctStyles, incorrectStyles} = props.optionStyles

    const [allOptions, setAllOptions] = useState([])
    const [optionInfo, setOptionInfo] = useState([])
    const [options, setOptions] = useState([])

    // Click event in Option.jsx => handler for user choice(user answer for question)
    const handleChoice = (event) => {
        let someChosen = null
        for (let info of optionInfo) {
            if (info.isChosen === true) {
                someChosen = info
            }
        }
        !someChosen 
            ? setOptionInfo(optionInfo.map(option => event.target.id == option.id ? ({...option, isChosen: !option.isChosen, styles: option.isChosen ? defaultStyles : choiceStyles}) : option))
            : setOptionInfo(optionInfo.map(option => option == someChosen 
                ? ({...option, isChosen: !option.isChosen, styles: defaultStyles})
                : event.target.id == option.id ? ({...option, isChosen: !option.isChosen, styles: option.isChosen ? defaultStyles : choiceStyles}) : option
            ))
    }

    useEffect(() => {
        setAllOptions(allAnswers)
    }, [correctAnswer])
    
    useEffect(() => {
        setOptionInfo(allAnswers.map(option => ({
            id: nanoid(),
            value: option,
            isCorrect: option === correctAnswer,
            isChosen: false,
            styles: defaultStyles
        })))
    }, [allOptions])

    useEffect(() => {
        setOptions(optionInfo.map((option, index) => <Option key={index} id={option.id} value={option.value} styles={option.styles} handleChoice={handleChoice} />))
    }, [optionInfo])

    // Show results and user points
    useEffect(() => {
        props.showAnswers ? setOptionInfo(optionInfo.map(option => option.isChosen 
            ? ({...option, styles: option.value == correctAnswer ? correctStyles : incorrectStyles})
            : correctAnswer == option.value ? ({...option, styles: correctStyles}) : ({...option, styles: defaultStyles})
        )) : setOptionInfo(optionInfo.map(option => ({...option, styles: defaultStyles})))
        for (let option of optionInfo) {
            option.isChosen && option.value == correctAnswer && props.addPoint()
        }
    }, [props.showAnswers])

    return(
        <div className="question">
            <h2>{decode(question)}</h2>
            <ul className="answers-options">
                {decode(options)}
            </ul>
        </div>
    )
}

export default OneQuestion