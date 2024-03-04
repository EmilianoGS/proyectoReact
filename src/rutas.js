import logo from './logo.svg';
import './App.css';
import React,{Component} from "react";
import Productos from "./productos";
import Infoproductos from "./infoproductos"
import Home from "./home"
import Registro from "./registro";
import Login from "./login";
import {Route} from "react-router-dom";
import Misdatos from "./misdatos";
import Categorias from "./categorias"
import CategEspf from './categEspf';

function Rutas(){
   
return(
<>
  <Route path="/" exact component={Home} />
 <Route path="/productos" exact component={Productos}/>
  <Route path="/productos/page/:page" exact component={Productos}/>
  <Route path="/productos/:id" exact component={Infoproductos}/>
  <Route path="/misdatos" exact component={Misdatos}/>
  <Route path="/registro" exact component={Registro} />
  <Route path="/login" exact component={Login} />
  <Route path="/categorias" exact component={Categorias} />
  <Route path="/categorias/:category" exact component={CategEspf} />
  
</>
)

}
export default Rutas;