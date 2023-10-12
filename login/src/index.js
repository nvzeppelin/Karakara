import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {useCookies} from 'react-cookie'
import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['Auth']);
  function login() {
    console.log("login")
    setCookie("Auth",pass,{secure:true,sameSite:"none"})
    console.log(cookies.Auth)
    window.location.href = `${window.location.protocol}//${window.location.host}/karakara.html`
  }
  const [pass, setPass] = useState("");
  return <form className='login' onSubmit={e=>{e.preventDefault(); login()}}>
    <div className="field field_v1">
      <label htmlFor="first-name" className="ha-screen-reader">Passwort</label>
      <input id="first-name" className="field__input" placeholder="Passwort" value={pass} onChange={e => setPass(e.target.value)} type={"password"}/>
      <span className="field__label-wrap" aria-hidden="true">
        <span className="field__label">Passwort</span>
      </span>
    </div>
    <button type={"submit"} className='glow-on-hover'>Login</button>
  </form>
}
