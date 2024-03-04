import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import './clases.css';
import Categorias from './categorias'
import $ from 'jquery';
import {useEffect, useState, useContext} from 'react';
import Context from './context';

function Opcionmenu(props){
 

    

const [anterior,setAnterior]=useState(' ')    
const context=useContext(Context); 

useEffect(()=>{
    context.activarMenu(sessionStorage.getItem("menuActivo"));
    
})

function quitarSubmenu(){
    document.getElementsByClassName("submenu")[0].style.display="none"
}

function activar(e){
 
    console.log("Tipo de elemento", e.target.tagName)    
if(props.opcion.boton!=="Categorias"){
   
    console.log('BOTON',e.target.innerHTML)
context.activarMenu((props.opcion.boton))

}  else if((e.target.tagName=="A") || (e.target.tagName=="LI")){
 console.log("OR LOGICO")
    context.activarMenu(("Home"))
    
}  


}

    return(
    <>
    <Link id="boton" to={props.opcion.path} boton={props.opcion.boton}>
               <span onClick={activar} className="menu" style={{display:"inline", padding:"10px"}}>
                   <span title={props.opcion.boton}>{props.opcion.boton} {props.opcion.boton=="Categorias" &&  <span  className="submenu">
                       <ul>
                 <Categorias />
                 </ul>
                   </span>}</span>
                 
                     
                    </span>
                     
           </Link>
   
</>
    
        )   
    }

export default Opcionmenu;