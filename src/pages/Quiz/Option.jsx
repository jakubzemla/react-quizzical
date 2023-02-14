import './Option.scss'

const Option = (props) => {
    return(
        <li className="option" id={props.id} style={props.styles} onClick={(event) => props.handleChoice(event)}>{props.value}</li>
    )
}

export default Option