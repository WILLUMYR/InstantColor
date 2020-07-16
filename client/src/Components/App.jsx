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
  const checkboxEl = useRef(null);

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
        <form onSubmit={e => {
          e.preventDefault();
          console.log('VALUE------------------->', inputEl.current.value);
          console.log('CHECKBOX ->', checkboxEl.current.value)
          getHex(inputEl.current.value);
          inputEl.current.value = '';
          // console.log(state);
        }}>
          <input ref={inputEl} type="text" placeholder="Enter a hex code" />
          <input ref={checkboxEl} type="checkbox" />
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
