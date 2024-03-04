import Opcionmenu  from './opcionmenu'
import firebase from './firebase';
import {useContext} from 'react';
import Context from './context';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory} from 'react-router-dom';
import './clases.css';
import {useEffect} from 'react'
import {BsChevronDown } from "react-icons/bs";
import Sesion from "./sesion"
import $ from 'jquery';

function Menu(props){

const context= useContext(Context);
const history=useHistory()
var varSesion=false
var classSesion= "noSesion"
const salir=()=>{
  context.logOut();
  history.push('/')
}

useEffect(() => {
$(document).on("click",function(e) {
  context.ocultarSesion(e);
  })
},[])
  
const verSesion=()=>{
 var se= document.getElementById("idSesion")
if(se.style.display=="none"){
  se.style.display= "block";
  
}else {
  se.style.display= "none";
}

 
}
    return(
    
      <Context.Consumer>
        
        { context =>
         
         <>       
            { context.loading2 && <div style={{textAlign:"right"}}><Spinner animation="border" size="sm" /></div> }
           { context.login && 
            <>
            { (context.usuario !== "") &&
            <header>
            <div style={{padding:"13px"}}>
              
            <div style={{textAlign:"right"}}>
            
            <label style={{padding:"0px 10px"}}><div id="usuario" onClick={verSesion}>{context.usuario} <BsChevronDown/></div> 
            <Sesion/><div className="clear"></div></label> 
            {(context.loading2== true) && <div><Spinner animation="border" size="sm" /></div>}
            <img style={{borderRadius:"6px", border:"2px solid #007bff"}} height="40px" src={context.imagen}/>
            </div>
            
            </div>
            </header>
          }
           
            </>
          }
           <nav>
           <Opcionmenu opcion= {{path:"/", boton:"Home" }}/> 
           {context.login && <><Opcionmenu opcion= {{path:"/productos/page/1", boton:"Productos" }}/>
            <Opcionmenu opcion= {{boton:"Categorias" }}/>
            <Opcionmenu opcion= {{path:"/", boton:"Contactanos" }}/> 

            </> }
          {
             !context.login &&
             <>
             <Opcionmenu opcion= {{path:"/registro", boton:"Registro" }}/>            
            <Opcionmenu  opcion= {{path:"/login", boton:"Login" }}/>
            <Opcionmenu opcion= {{path:"/", boton:"Contactanos" }}/> 
            
            </>
          }
            <div className="clear"></div>
           </nav>
          </>
}
       
        </Context.Consumer>
     
   
        )   
    }

export default Menu;