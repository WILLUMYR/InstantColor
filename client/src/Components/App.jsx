import React, { useRef, useEffect, useReducer } from 'react';
import './App.css';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_PALETTE':
      return { palettes: [...state.palettes, { img: action.img, hex: action.hex }] };
    case 'DECREMENT':
      return state - 1;
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

  const [state, dispatch] = useReducer(reducer, { palettes: [] })

  useEffect(() => {
    console.log(state);
  })

  const getHex = (hex, mode = 'monochrome') => {
    fetch(`/api/color/${hex}/${mode}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        dispatch({ type: 'ADD_PALETTE', img: data.image.bare, hex })
      })


  }

  return (
    <main className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
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
        </form>

        <form onSubmit={e => {
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
          } else {
            getHex(inputEl.current.value);
          }

          // inputEl.current.value = '';
        }}>
          <input ref={inputEl} type="text" placeholder="Enter a hex code" />
          <input type="submit" value="Get Color Palette" />
        </form>
      </section>

      <section className="App-content">
        {state.palettes.map(palette => {
          return (
            <div className="palette" key={Math.random()}>
              <h1>#{palette.hex}</h1>
              <img src={palette.img} alt="" />
            </div>
          )
        })}
      </section>
    </main>
  );
}

export default App;
