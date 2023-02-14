import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate("/quiz")
    }
    return(
        <div className="container">
            <h1>Quizzical</h1>
            <p>Choose a topic, choose the number of questions and the difficulty of the quiz</p>
            <button className="btn-primary" onClick={handleNavigate}>to Quiz</button>
        </div>
    )
}

export default Home