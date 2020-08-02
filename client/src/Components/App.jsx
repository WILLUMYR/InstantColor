import React, { useEffect, useReducer } from 'react';
import './App.css';
import ColorCard from './ColorCard';
import Form from './Form';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_PALETTE':
      return { palettes: [...state.palettes, { id: action.id, hex: action.hexInput, mode: action.mode, colors: action.colors }] };
    case 'REMOVE_PALETTE':
      const newState = state.palettes.filter(palette => palette.id !== action.id)
      return { palettes: [...newState] }
    case 'INITIALIZE_STATE':
      return { palettes: [...action.state] }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { palettes: [] })

  useEffect(() => {
    const storage = window.localStorage.getItem('state');
    if (storage) {
      const jsonStorage = JSON.parse(storage);
      dispatch({ type: 'INITIALIZE_STATE', state: jsonStorage })
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('state', JSON.stringify(state.palettes));

  }, [state])

  const getHex = (hexInput, mode = 'monochrome') => {
    fetch(`/api/color/${hexInput}/${mode}`)
      .then(res => res.json())
      .then(data => {

        dispatch({
          type: 'ADD_PALETTE',
          id: Math.random(),
          hexInput,
          mode,
          colors: data.colors,
        })
      })
  }

  return (
    <main className="App">
      <header className="App__header">
        <h1>InstantColors</h1>
        <h5>By Markus Willumstad Myrland</h5>
      </header>

      <Form getHex={getHex} />

      <section className="App__content">
        {state.palettes.map(palette => {
          const mainColor = `#${palette.hex}`
          return (
            <ColorCard
              key={palette.id}
              mainColor={mainColor}
              palette={palette}
              removeCard={() => { dispatch({ type: 'REMOVE_PALETTE', id: palette.id }) }}
            />)
        })}
      </section>
      <footer className="App__footer">
        <p>Made using http://thecolorapi.com</p>
        <a href="https://github.com/WILLUMYR">WILLUMYR on GitHub</a>
      </footer>
    </main >
  );
}

export default App;
