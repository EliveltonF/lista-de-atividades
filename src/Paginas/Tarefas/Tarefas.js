import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './design/Tarefas.css';

function Tarefas({ authorized }) {

     var userName = window.sessionStorage.getItem('login')
     var pegaList = JSON.parse(window.localStorage.getItem(userName))

     if (pegaList == null) {
          pegaList = [];
     }



     const [dadosTarefas, setDadosTarefas] = useState([...pegaList]);
     const [jj, setJJ] = useState([]);
     const [Desc, setDesc] = useState([]);
     const [optionList, setOptionList] = useState(false);
     const [displayVariavel, setVariavel] = useState('none')
     const [displayIcon, setDisplayIcon] = useState('flex')
     const [displayCompleted, setDisplayCompleted] = useState('none')
     const [displayInCompleted, setDisplayInCompleted] = useState('flex')
     const [displayUser, setDisplayUser] = useState('none')


     var textInput;
     var desc;
     var date;
     var history = useHistory()
     console.log(window.sessionStorage.getItem('login'))
     console.log(authorized)
     //restringe acesso a pagina apenas a pessoas que fizeram login/ nao fez login e mandado para pagina de login
     if (!authorized) {
          return <Redirect to='/login' />
     }

     //quando a pagina e fechada salva a lista no localStorage
     window.onunload = function () {
          window.localStorage.setItem(userName, JSON.stringify(dadosTarefas))

     }
     function addTarefa() {
          setDadosTarefas([...dadosTarefas, { id: '', cor: '#f0e78c', dados: textInput, desc: desc, date: date, verificado: false }])
     }

     function deleteTarefaIncompleted(props) {
          var temporario = [];
          console.log(dadosTarefas)
          dadosTarefas.map((elem, key) => {
               if (key != props) {
                    temporario.push(elem);
               }
          })
          setDadosTarefas(temporario);

     }

     function completedTarefa(props) {

          dadosTarefas.map((elem) => {
               if (elem.id == props) {
                    elem.cor = '#bfbfbf'
                    elem.verificado = true
                    setDadosTarefas([...dadosTarefas])
               }
          })


     }
     function textValue(prop) {
          textInput = prop.target.value

     }
     function DescValue(props) {
          desc = props.target.value
     }
     function DateValue(props) {
          date = props.target.value
     }
     function editText(prop) {
          setJJ(prop.dados)
          console.log(document.getElementsByClassName(prop.id + 1)[0].style.display)

          document.getElementsByClassName(prop.id + 1)[0].style.display = 'flex';

          console.log(document.getElementsByClassName(prop.id + 1)[0].style.display)

          console.log(document.getElementById((prop.id + 1) * 2).style.display)

          document.getElementById((prop.id + 1) * 2).style.display = 'none';

          console.log(document.getElementById((prop.id + 1) * 2).style.display)
     }
     function editDesc(props) {
          setDesc(props.desc)

          document.getElementsByClassName((props.id + 1) * 4)[0].style.display = 'flex';
          document.getElementById((props.id + 1) * 6).style.display = 'none';


     }
     function alteradado(prop) {
          dadosTarefas[prop.id].dados = prop.e.target.value
          if (prop.e.key == 'Enter') {
               document.getElementsByClassName(prop.id + 1)[0].style.display = 'none';
               document.getElementById((prop.id + 1) * 2).style.display = 'flex';
               setJJ('')
          }

     }
     function alteraDesc(props) {
          dadosTarefas[props.id].desc = props.e.target.value
          if (props.e.key == 'Enter') {
               document.getElementsByClassName((props.id + 1) * 4)[0].style.display = 'none';
               document.getElementById((props.id + 1) * 6).style.display = 'flex';
               setDesc('');
          }

     }

     function Lista(props) {
          setOptionList(props.target.value)

     }
     function trocaDisplay(props) {
          setVariavel(props)
          if (props == 'flex') {
               setDisplayIcon('none')
          } else {
               setDisplayIcon('flex')
          }
     }
     function trocaDisplayTarefas(props) {
          setDisplayCompleted(props)
          if (props == 'flex') {
               setDisplayInCompleted('none')
          } else {
               setDisplayInCompleted('flex')
          }

     }
     function setId() {
          var cont = 0;
          dadosTarefas.map((elem) => (
               elem.id = cont,
               cont += 1
          ))
     }

     function order(props) {
          console.log(props)
          if (props == 'crescente') {
               const tem = dadosTarefas.slice()
               console.log(tem)
               tem.sort(function (a, b) {
                    if (a.date > b.date) return 1
                    if (a.date < b.date) return -1
                    return 0
               })
               setDadosTarefas(tem)
               //window.location.reload();
          }
          if (props == 'decrescente') {
               const tem = dadosTarefas.slice();
               console.log(tem)
               tem.sort(function (a, b) {
                    if (a.date > b.date) return -1
                    if (a.date < b.date) return 1
                    return 0
               })
               setDadosTarefas(tem)

               // window.location.reload();

          }
     }
     function trocaDisplayUser(props) {
          if (props == 'flex') {
               setDisplayIcon('none')
               setDisplayUser('flex')
          } else {
               setDisplayIcon('flex')
               setDisplayUser('none')

          }
     }
     function logout() {
          window.localStorage.setItem(userName, JSON.stringify(dadosTarefas))
          history.push('/login')
          window.sessionStorage.setItem('login', null);
     }
     return (
          <div className='Tarefas-main'>
               <div className='Header-tarefas'>
                    <div className='icon' style={{ display: displayIcon }}>
                         <div className='user'><div title="user information" className='iconUser' onClick={() => { trocaDisplayUser('flex') }}></div></div>
                         <div className='dados' onClick={() => { trocaDisplay('flex') }}><div title='insert dados' className='insertDados'></div></div>
                         <div className='completed' onClick={() => { trocaDisplayTarefas('flex') }}><div title='complete tasks' className='iconCompleted'></div></div>
                         <div className='incompleted' onClick={() => { trocaDisplayTarefas('none') }}><div title='incomplete tasks' className='iconInCompleted'></div></div>
                         <div className='filtro'>
                              <label>Dort by Date: </label>
                              <select onChange={(e) => { order(e.target.value) }}>
                                   <option value='crescente' selected>crescente</option>
                                   <option value='decrescente'>decrescente</option>
                              </select>
                         </div>
                    </div>
                    <div className='option-tarefas'>
                         <label>Category:</label>
                         <form className='categorias'>
                              <label>incompleted</label>
                              <input type='radio' value='false' onClick={(e) => Lista(e)} ></input>
                              <label>completed</label>
                              <input type="radio" value='true' onClick={(e) => Lista(e)}></input>
                         </form>
                    </div>
                    <div className='ContaUser' style={{ display: displayUser }}>
                         <div className='volta' onClick={() => { trocaDisplayUser('none') }}>.</div>
                         <div className='dadosUser'>
                              <p>UserName: </p>
                              <p>{userName}</p>
                              <button className='button-logout' onClick={() => { logout() }}>logout</button>

                         </div>
                    </div>
                    <div className='input-tarefas' style={{ display: displayVariavel }}>
                         <div className='volta' onClick={() => { trocaDisplay('none') }}>.</div>
                         <label className='labelForm'>Title: </label>
                         <input className="addtarefaInput" placeholder='Title' type='text' maxLength="19" minLength='1' onInput={(e) => { textValue(e) }}></input>
                         <label className='labelForm'>Desc: </label>
                         <input className="addDescInput" placeholder='Desc' type='text' maxLength="76" onInput={(e) => { DescValue(e) }}></input>
                         <label className='labelForm'>DateTime: </label>
                         <input className='addDateTime' type='datetime-local' onChange={(e) => { DateValue(e) }}></input>
                         <button className='buttonAddTarefa' type='submit' onClick={() => { addTarefa(textInput) }}>Add Tarefa</button>
                    </div>
               </div>
               <div className='Tarefas'>






                    {dadosTarefas.filter(n => n.verificado == false).map((elem, key) => (
                         setId(),
                         <div className='tarefa' style={{ backgroundColor: elem.cor, display: displayInCompleted }}>
                              <div className='info'>
                                   <div className='id'>{elem.id}</div>
                                   <div className='verificado'><input className="caixa" type='checkbox' checked={elem.verificado} onClick={() => (completedTarefa(elem.id))}></input></div>

                                   <button className='exit' onClick={() => { deleteTarefaIncompleted(elem.id) }}></button>
                              </div>
                              <div className='organizado-display'>
                                   <p className='textoTarefa' style={{ display: 'flex' }} id={(elem.id + 1) * 2} onClick={() => { editText({ id: elem.id, dados: elem.dados }) }}>{elem.dados}</p>
                                   <input className={elem.id + 1} style={{ display: 'none' }} id="atualizaDados" value={jj} onKeyPress={(e) => { alteradado({ e: e, id: elem.id }) }} onChange={(e) => { setJJ(e.target.value) }} maxLength={19} />
                                   <p className='DescTarefa' style={{ display: 'flex' }} id={(elem.id + 1) * 6} onClick={() => { editDesc({ id: elem.id, desc: elem.desc }) }}>{elem.desc}</p>
                                   <input className={(elem.id + 1) * 4} style={{ display: 'none' }} id="atualizaDesc" value={Desc} onKeyPress={(e) => { alteraDesc({ e: e, id: elem.id }) }} onChange={(e) => { setDesc(e.target.value) }} maxLength={19} />
                                   <p className='DateTarefa' style={{ display: 'flex' }} >{elem.date}</p>
                              </div>
                         </div>
                    ))}
                    {dadosTarefas.filter(n => n.verificado == true).map((elem, key) => (
                         <div className='tarefa' style={{ backgroundColor: elem.cor, display: displayCompleted }}>
                              <div className='info'>
                                   <div className='id'>{elem.id}</div>
                                   <div className='verificado'><input className="caixa" type='checkbox' checked={elem.verificado} ></input></div>

                                   <button className='exit' onClick={() => { deleteTarefaIncompleted(elem.id) }}></button>
                              </div>
                              <div className='organizado-display'>
                                   <p className='textoTarefa' style={{ display: 'flex' }} id={(elem.id + 1) * 2} >{elem.dados}</p>
                                   <p className='DescTarefa' style={{ display: 'flex' }} id={(elem.id + 1) * 6}>{elem.desc}</p>
                                   <p className='DateTarefa' style={{ display: 'flex' }} >{elem.date}</p>
                              </div>

                         </div>
                    ))}















               </div>
          </div>

     )


}


export default Tarefas;