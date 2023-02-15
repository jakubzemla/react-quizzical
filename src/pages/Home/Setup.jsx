import SettingOption from "./SettingOption";
import './Setup.scss'

const Setup = (props) => {
    const {instructions, options, setupFor} = props.setting
    const optionsList = options.map((option, index) => <SettingOption key={index} option={option} handleChoice={props.handleChoice} setupFor={setupFor} />)
  
    return (
        <div className="setup-wrapper">
            <h3>{instructions}</h3>
            <ul className="setting-options">
                {optionsList}
            </ul>
        </div>
    )
}

export default Setup