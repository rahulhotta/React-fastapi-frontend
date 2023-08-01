import React from 'react'
import './Button.css'
function Button(props) {
  return (
    <button className="Ui__button" onClick={props.onClick}>{props.children}</button>
  )
}

export default Button