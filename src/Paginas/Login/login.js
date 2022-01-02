import React, { useState } from "react";
import './Design/login.css';
import UserLogo from './User.webp';
import { Link, useHistory } from 'react-router-dom';
var contador = 0;


function Login() {
     const [dados, setDados] = useState({});
     let history = useHistory();

     var ListUser = (JSON.parse(window.localStorage.getItem("ListUser")) || [{}]);


     function setInput(props) {
          setDados({ ...dados, [props.target.placeholder]: props.target.value })
          console.log(dados)
     }
     function onSubmit(props) {
          props.preventDefault();


          ListUser.map((elem) => {
               console.log(elem)
               if (elem.First_Name == dados.Username && elem.Password == dados.Password) {
                    window.sessionStorage.setItem('login', elem.First_Name)
                    contador = 1;
                    history.push('tarefas')
                    window.location.reload();
               }
          })
          //  setDados()
          if (contador == 0) return alert('user invalid')
          console.log(contador)
          console.log(window.sessionStorage.getItem('login'))

          if (window.sessionStorage.getItem('login') != null) {
               console.log('tete')

          }
     }


     return (
          <div className="Login-main">
               <div className="Login-input">
                    <div className="Icon-login">
                         <img src={UserLogo} alt="logo User"></img>
                         <h3>Sing In</h3>
                    </div>
                    <div className="Input-login">
                         <form className="Form">
                              <input onChange={(e) => { setInput(e) }} className="Input" placeholder="Username" ></input>
                              <input onChange={(e) => { setInput(e) }} className="Input" placeholder="Password" type='password'></input>
                              <button onClick={(e) => { onSubmit(e) }} className="Button-Login">Login</button>
                         </form>

                    </div>
                    <div className="NotMember-login">
                         <p className="texto-login">Not a Member? <Link className="link-login" to="/cadastro">Create Account</Link></p>
                    </div>
               </div>
          </div>
     )
}


export default Login;