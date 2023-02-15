import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import Setup from "./Setup"

const Home = (props) => {
    const [omitted, setOmitted] = useState(false)
    const [omittedSettings, setOmittedSettings] = useState([])
    const omittedToRender = omittedSettings.map((setting, index )=> <p key={index} className="warning-info-instructions">{`Please select ${setting}`}</p>) 

    const navigate = useNavigate()

    // handler with checking if the user has selected all settings
    const handleNavigate = () => {
        setOmittedSettings([])
        let isApiSetup = 0
        for (let setting in props.apiSetup) {
            props.apiSetup[setting] ? isApiSetup++ : setOmittedSettings(prevState => [...prevState, setting])
        }
        isApiSetup === 3 ? navigate("/quiz") : setOmitted(true)
    }

    const setupList = props.userChoice.map((setting, index) => <Setup key={index} setting={setting} handleChoice={props.handleChoice}/>)
    console.log(omittedSettings)
    return(
        <div className="container">
            <h1>Quizzical</h1>
            <p>Choose a category, choose the number of questions and the difficulty of the quiz</p>
            {setupList}
            {omitted && <>
                <p className="warning-info">You must set all options</p>
                {omittedToRender}
            </> 
            }
            <button className="btn-primary" onClick={handleNavigate}>to Quiz</button>
        </div>
    )
}

export default Home