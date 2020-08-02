import React, { useRef } from 'react';

export default function Form(props) {

  const paletteTypes = useRef(null);
  const inputEl = useRef(null);
  // const monochromeDark = useRef(null);
  // const monochromeLight = useRef(null);
  // const analogic = useRef(null);
  // const complement = useRef(null);
  // const anaComplement = useRef(null);

  return (
    <section className="App__form">
      <form className="form__options">
        <select ref={paletteTypes} name="Choose a Palette type" id="">
          <option value="monochrome">monochrome</option>
          <option value="monochrome-dark">monochrome-dark</option>
          <option value="monochrome-light">monochrome-light</option>
          <option value="analogic">analogic</option>
          <option value="complement">complement</option>
          <option value="analogic-complement">Analogic-complement</option>
        </select>
      </form>

      <form className="form__input" onSubmit={e => {
        e.preventDefault();
        props.getHex(inputEl.current.value, paletteTypes.current.value);
      }}>
        <input ref={inputEl} type="text" placeholder="Enter a hex code" />
        <input className="input__button" type="submit" value="Get Color Palette" />
      </form>
    </section>
  )
}
