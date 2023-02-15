import './SettingOption.scss'

const SettingOption = (props) => {
    return (
        <li className={`set-options-item ${props.setupFor}`}  onClick={(event) => props.handleChoice(event, props.option, props.setupFor)}>{props.option}</li>
    )
}

export default SettingOption