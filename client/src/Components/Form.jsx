import React, { useRef } from 'react';

export default function Form(props) {

  const inputEl = useRef(null);
  const monochromeDark = useRef(null);
  const monochromeLight = useRef(null);
  const analogic = useRef(null);
  const complement = useRef(null);
  const anaComplement = useRef(null);

  return (
    <section className="App__form">
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
          props.getHex(inputEl.current.value, monochromeDark.current.value);
          monochromeDark.current.checked = false;
        } else if (monochromeLight.current.checked) {
          props.getHex(inputEl.current.value, monochromeLight.current.value);
          monochromeLight.current.checked = false;
        } else if (complement.current.checked) {
          props.getHex(inputEl.current.value, complement.current.value);
          complement.current.checked = false;
        } else if (analogic.current.checked) {
          props.getHex(inputEl.current.value, analogic.current.value);
          analogic.current.checked = false;
        } else if (anaComplement.current.checked) {
          props.getHex(inputEl.current.value, anaComplement.current.value);
          anaComplement.current.checked = false;
        } else {
          props.getHex(inputEl.current.value);
        }
      }}>
        <input ref={inputEl} type="text" placeholder="Enter a hex code" />
        <input className="input__button" type="submit" value="Get Color Palette" />
      </form>
    </section>
  )
}
