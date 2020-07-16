import React, { useEffect } from 'react';
import './App.css';

export default function ColorCard(props) {
  return (
    <article className="palette" style={{ backgroundColor: props.mainColor }} key={props.palette.id}>
      <h1>#{props.palette.hex.toUpperCase()}</h1>
      <h3>{props.palette.mode}</h3>
      <div className="palette__colors">
        {props.palette.colors.map(color => {
          return (
            <div key={Math.random()} className="palette__color" style={{ backgroundColor: color.hex.value }}>
              <h3>{color.name.value}</h3>
              <p>{color.hex.value}</p>
            </div>
          )
        })}
        <div key={props.palette.id} className="remove__button" onClick={() => { props.removeCard() }}>REMOVE</div>
      </div>
    </article>
  )
}
