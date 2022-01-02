import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Login from './Paginas/Login/login';
import Cadastro from './Paginas/Cadastro/cadastro';
import Tarefas from './Paginas/Tarefas/Tarefas';
const login = window.sessionStorage.getItem('login');
console.log(login!=null)
function checkLogin() {
  if (login != null) {
    return true
  } else {
    return false
  }
}
ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path='/login' exact component={Login} />
      <Route path='/cadastro' exact component={Cadastro} />
      <Route path='/tarefas' exact component={() => <Tarefas authorized={checkLogin()} />} />
    </Switch>
  </Router>,
  document.getElementById('root')
)