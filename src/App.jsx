import './styles/App.scss';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Home from './pages/Home/Home';
import Quiz from './pages/Quiz/Quiz';

const App = () => {

const [category, setCategory] = useState(0)
const [categoryId, setCategoryId] = useState(null)
const [questionsCount, setQuestionsCount] = useState(0)
const [difficulty, setDifficulty] = useState("")

const categoriesApi = "https://opentdb.com/api_category.php"
const [categoriesData, setCategoriesData] = useState([])
const categoriesTitles = categoriesData.map(category => category.name)

const apiSetup= {
  category: categoryId,
  questionsCount: questionsCount,
  difficulty: difficulty
}

// Click event in SettingOption.jsx => handler for user choice of quiz settings
const handleChoice = (event, value, setupFor) => {
  {setupFor === "category" && setCategory(value)}
  {setupFor === "questionsCount" && setQuestionsCount(value)}
  {setupFor === "difficulty" && setDifficulty(value)}
  const allOptions = document.getElementsByClassName(`set-options-item ${setupFor}`)
  for (let option of allOptions) {
    option.classList.contains("setting-choice") && option.classList.remove("setting-choice")
  }
  event.target.classList.add("setting-choice")
}

const getCategoryId = () => {
  for (let categ of categoriesData) {
      categ.name === category && setCategoryId(categ.id)
  }
}

const navigate = useNavigate()

// Click event in Questions.jsx => when the user wants to change the settings after the quiz is completed
const handleNavigateToHome = () => {
  setCategory(0)
  setCategoryId(null)
  setQuestionsCount(0)
  setDifficulty("")
  navigate("/")
}

const userChoice = [
    {
      instructions: "Choose one of the categories",
      setupFor: "category",
      options: categoriesTitles,
    },
    {
      instructions: "How many questions do you want to receive?",
      setupFor: "questionsCount",
      options: [5, 10, 15, 20],
    },
    {
      instructions: "Choose the difficulty",
      setupFor: "difficulty",
      options: ["easy", "medium", "hard"],
    }
  ]

  useEffect(() => {
    getCategoryId()
  }, [category])

  useEffect(() => {
    axios.get(categoriesApi).then(response => setCategoriesData(response.data.trivia_categories))
  }, [])

  return (
        <Routes>
         <Route path="/" element={<Home userChoice={userChoice}  handleChoice={handleChoice} apiSetup={apiSetup}/>} />
         <Route path="/quiz" element={<Quiz apiSetup={apiSetup} categoriesData={categoriesData} handleNavigateToHome={handleNavigateToHome} />} />
        </Routes>
  )
}

export default App;
