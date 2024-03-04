import { propTypes } from "react-bootstrap/esm/Image";
import { useState, useEffect, useContext} from 'react';
import Opcionmenu from './opcionmenu'
import Spinner from 'react-bootstrap/Spinner';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import './clases.css';
import { useHistory } from 'react-router-dom';
import Context from './context';

function Sesion(props){

 const cerrarSubSesion =()=>{
  var se= document.getElementById("idSesion")

    se.style.display = "none";
  
 } 

    const context= useContext(Context);
    const history=useHistory()

    const salir=()=>{
  context.logOut();
  history.push('/')
}
 
        return(
        <div id="idSesion" style={{display:"none"}}>
        <ul id="ulSesion">
        <li><Link  to={"/misdatos"}><p onClick={cerrarSubSesion}>Mis Datos</p></Link><br/></li>
        <li><Link onClick={salir} to={"/"}><p id="exit">Salir</p></Link><br/></li>
        </ul>
        </div>
    )

}

export default Sesion;