import shuffle from '../../helpers/shuffleArray'
import OneQuestion from "./OneQuestion"

const Questions = (props) => {
    const optionsStyles = {
        defaultStyles: {
            color: "#293264",
            border: "2px solid #4D5B9E",
            backgroundColor: "#fff"
        },
        
        choiceStyles: {
            backgroundColor: "#D6DBF5",
            border: "none"
        }, 

        correctStyles: {
            backgroundColor: "#94D7A2",
            border: "none"
        },

        incorrectStyles: {
            backgroundColor: "#F7D9DB",
            border: "none"
        } 
    }

    const allQuestions = props.allQuestions.map(oneQuestion => ({
        question: oneQuestion.question,
        correctAnswer: oneQuestion.correct_answer,
        incorrectAnswers: oneQuestion.incorrect_answers,
        allAnswers: shuffle([oneQuestion.correct_answer, ...oneQuestion.incorrect_answers]),
        category: oneQuestion.category,
        difficulty: oneQuestion.difficulty,
    }))

    const questionsList = allQuestions.map((question, index) => <OneQuestion key={index} question={question} optionStyles={optionsStyles} showAnswers={props.showAnswers} score={props.score} addPoint={props.addPoint} again={props.again} getPoints={props.getPoints}/>)

    return(
        <div className="questions-wrapper">
           {questionsList}
           {props.showAnswers && <span className="points-info">{`You scored ${props.score}/${questionsList.length} correct answers`}</span>}
           {props.showAnswers
                ? <button className="btn-primary" onClick={props.reset}>Try Again</button>
                : <button className="btn-primary" onClick={props.handleAnswers}>Show answers</button>
           }
        </div>

    )
    
}

export default Questions