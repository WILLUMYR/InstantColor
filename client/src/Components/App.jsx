import React, { useRef, useEffect, useReducer } from 'react';
import './App.css';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_PALETTE':
      return { palettes: [...state.palettes, { img: action.img, hex: action.hexInput, mode: action.mode, colors: action.colors }] };
    default:
      return state;
  }
}

function App() {

  const inputEl = useRef(null);
  const monochromeDark = useRef(null);
  const monochromeLight = useRef(null);
  const analogic = useRef(null);
  const complement = useRef(null);
  const anaComplement = useRef(null);

  const [state, dispatch] = useReducer(reducer, { palettes: [] })

  useEffect(() => {
    console.log(state);
  })

  const getHex = (hexInput, mode = 'monochrome') => {
    fetch(`/api/color/${hexInput}/${mode}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        dispatch({
          type: 'ADD_PALETTE',
          img: data.image.bare,
          hexInput,
          mode,
          colors: data.colors,
        })
      })
  }

  return (
    <main className="App">
      <header className="App-header">
        <h1>InstantColors</h1>
        <h5>By Markus Willumstad Myrland</h5>
      </header>

      <section className="App-form">
        <form className="form__options">
          <label htmlFor="#monoD">Dark Monochrome</label>
          <input ref={monochromeDark} id="mono" type="checkbox" value="monochrome-dark" />
          <label htmlFor="#monoL">Light Monochrome</label>
          <input ref={monochromeLight} id="mono" type="checkbox" value="monochrome-light" />
          <label htmlFor="#ana">Analogic</label>
          <input ref={analogic} id="ana" type="checkbox" value="analogic" />
          <label htmlFor="#comp">Complement</label>
          <input ref={complement} id="comp" type="checkbox" value="complement" />
          <label htmlFor="#anaComp">Analogic-Complement</label>
          <input ref={anaComplement} id="anaComp" type="checkbox" value="analogic-complement" />
        </form>

        <form className="form__input" onSubmit={e => {
          e.preventDefault();
          if (monochromeDark.current.checked) {
            getHex(inputEl.current.value, monochromeDark.current.value);
            monochromeDark.current.checked = false;
          } else if (monochromeLight.current.checked) {
            getHex(inputEl.current.value, monochromeLight.current.value);
            monochromeLight.current.checked = false;
          } else if (complement.current.checked) {
            getHex(inputEl.current.value, complement.current.value);
            complement.current.checked = false;
          } else if (analogic.current.checked) {
            getHex(inputEl.current.value, analogic.current.value);
            analogic.current.checked = false;
          } else if (anaComplement.current.checked) {
            getHex(inputEl.current.value, anaComplement.current.value);
            anaComplement.current.checked = false;
          } else {
            getHex(inputEl.current.value);
          }
        }}>
          <input ref={inputEl} type="text" placeholder="Enter a hex code" />
          <input className="input__button" type="submit" value="Get Color Palette" />
        </form>
      </section>

      <section className="App-content">
        {state.palettes.map(palette => {
          const mainColor = `#${palette.hex}`
          return (
            <article className="palette" style={{ backgroundColor: mainColor }} key={Math.random()}>
              <h1>#{palette.hex.toUpperCase()}</h1>
              <h3>{palette.mode}</h3>
              <div className="palette__colors">
                {palette.colors.map(color => {
                  return (
                    <div className="palette__color" style={{ backgroundColor: color.hex.value }}>
                      <h3>{color.name.value}</h3>
                      <p>{color.hex.value}</p>
                    </div>
                  )
                })}
              </div>
            </article>
          )
        })}
      </section>
    </main>
  );
}

export default App;