import logo from './logo.svg';
import './App.css';
import React,{Component} from "react";
import Menu from "./menu"
import {BrowserRouter, Route} from "react-router-dom";
import Rutas from "./rutas";
import GlobalState from './GlobalState';
import { useEffect, useContext } from 'react';
import $ from 'jquery';

import Context from './context';

function App(){


  



  const context=useContext(Context);

 

  const opciones=
  [{
    path:"/",
    boton:"Home"
  },
  {
    path:"/registro",
    boton:"Registro"
  },
  {
    path:"/login",
    boton:"Login"
  },
{
   path:"/productos/1",
   boton:"Productos"
  },
{
  path:"/categorias",
  boton:"Categorias"
}] ;




return(
  <GlobalState>
  <BrowserRouter>
  
  <Menu opciones={opciones}/>
     <body style={{padding:"15px"}}>  
    
    
    <Rutas/>
    </body>
    
  </BrowserRouter>
</GlobalState>
)

}
export default App;
