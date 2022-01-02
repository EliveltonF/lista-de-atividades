import React, { useState } from "react";
import './design/cadastro.css';
import Caadastro from './cadastro.png'
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';



export default function Cadastro() {
     var history = useHistory()

     const schema = Yup.object().shape({
          First_Name: Yup.string().required('campo Obrigatorio').min(3,'3 caracteres no minimo'),
          CPF: Yup.string().test('len', ' exatamente 11 caracteres', val => val.length === 11).required('campo Obrigatorio'),
          Email_Adress: Yup.string().email().required('campo Obrigatorio'),
          Password: Yup.string().required('campo Obrigatorio')
     })
     return (
          <div className="Cadastro-main">
               <div className="Cadastro-input">
                    <div className="User-cadastro">
                         <img src={Caadastro}></img>
                         <p>Create Account</p>
                    </div>
                    <Formik
                         validationSchema={schema}
                         initialValues={{
                              First_Name: '',
                              CPF: '',
                              Email_Adress: '',
                              Password: ''
                         }}
                         onSubmit={(e) => {
                              var aux = JSON.parse(window.localStorage.getItem("ListUser")) 
                              if(aux == null) aux = [{}]
                              var dados = [];
                              var ajuda = 0;
                              aux.map((elem) => {if(elem.First_Name == e.First_Name || elem.CPF == e.CPF ||elem.Email_Adress == e.Email_Adress) {ajuda = 1}})
                             if(ajuda == 0) {
                              dados.push(e)
                              if (aux != null) {
                                   aux.map((elem) => dados.push(elem))
                              }
                              window.localStorage.setItem("ListUser", JSON.stringify(dados));
                              setTimeout(() => {
                                   history.push("/login")
                              }, 500)
                             }else {
                               alert('usuario cadastrado!')
                               window.location.reload();
                             }

                         }}>

                         {({ errors }) => (
                              <Form>
                                   <div className="Input-cadastro">
                                        <div className="Name">
                                             <div className="displayForm">
                                                  {/* <label className="FirstName" htmlFor="First_Name">First Name</label> */}
                                                  <Field placeholder="First Name" className="First-Name" name="First_Name" id="First_Name" type="text" />
                                                  {errors.First_Name && (
                                                       <div className="err">{errors.First_Name}</div>
                                                  )}
                                             </div>
                                        </div>
                                        <div className="displayForm">
                                             {/* <label className="CPF" htmlFor="CPF">CPF</label> */}
                                             <Field placeholder="CPF" className="cpf" name="CPF" id="CPF" type="numeric" />
                                             {errors.CPF && (
                                                  <div className="err">{errors.CPF}</div>
                                             )}
                                        </div>
                                        <div className="displayForm">
                                             {/* <label className="EMAIL" htmlFor="Email_Adress">Email</label> */}
                                             <Field placeholder="Email Adress" className="email" name="Email_Adress" id="Email_Adress" type="Email_Adress" />
                                             {errors.Email_Adress && (
                                                  <div className="err">{errors.Email_Adress}</div>
                                             )}
                                        </div>
                                        <div className="displayForm">
                                             {/* <label className="PASS" htmlFor="Password">Password</label> */}
                                             <Field placeholder="Password" className="pass" name="Password" id="Password" type="Password" />
                                             {errors.Password && (
                                                  <div className="err">{errors.Password}</div>
                                             )}
                                        </div>
                                        <button className="Button-cadastro" type="submit">enviar</button>

                                   </div>

                              </Form>
                         )}
                    </Formik>
                    <div className="Member-cadastro">
                         <p className="Texto-cadastro">Already a member?<Link className="link-cadastro" to="/login">Login Here</Link></p>
                    </div>
               </div>
          </div>
     )
}