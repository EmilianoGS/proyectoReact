import Context from './context';
import {useState, useEffect} from 'react';
import $ from 'jquery'; 
import './clases.css'; 
import App from './App';
import {ImArrowDownRight2} from "react-icons/im";

function GlobalState(props){

const[usuario, setUsuario]=useState(localStorage.getItem("nombre"))
const[emailUser, setEmailUser]=useState(localStorage.getItem("email"))
const[imagen, setImagen]=useState(localStorage.getItem("imagen"))
const myArray=localStorage.getItem("listaDeCompra")
const arrayNuevo=new Array();
const [listaCompra, setListaCompra]=useState(JSON.parse(myArray));
const [login, setLogin]=useState(localStorage.getItem("login"))
const [primerProducto, setPrimerProducto]=useState(localStorage.getItem("primerProd"))
const [loading2,setLoading2]=useState(false);
const [precioTotal, setPrecioTotal]=useState(localStorage.getItem("precioTotal"))

useEffect( ()=>{
     regListaCompra();
     maximizar();
     }, [])


const Loading2=()=>{
    setLoading2(true)
}

const logueo=()=>{
    setLogin(true);
    
    localStorage.setItem("login",true);
    
}

const noLoading2=()=>{
    setLoading2(false)
    
}

const guardarEmail=(email)=>{
    
    setEmailUser(email);
    localStorage.setItem("email",email);
   

    }



const regListaCompra=()=>{

const getPrimerProd= localStorage.getItem("primerProd");

if(getPrimerProd){
    


    
    const regListaProds= JSON.parse(localStorage.getItem("listaDeCompra"))
    
    const listaDOM=  document.createElement('div');
        
        document.body.appendChild(listaDOM);
        listaDOM.id="listaProductos";
        const botonMax=document.createElement("Button");
        const botonCerrar=document.createElement("Button");
        botonCerrar.innerHTML="Cancelar";
        botonMax.innerHTML="Max/Min"
        botonCerrar.addEventListener("click", borrarLista,false);
        botonMax.addEventListener("click", maximizar, false)
        const ulProds= document.createElement('ul');
        ulProds.id="ulProds";
        if(regListaProds==null){
            const liProds=document.createElement('li');
            const primervalor=localStorage.getItem("primerValor");
             liProds.innerHTML= primervalor;
             ulProds.appendChild(liProds)
             listaDOM.appendChild(ulProds)
             
        }else{
              for(var i=0; i< regListaProds.length ;i++ ){
           const liProds=document.createElement('li');
          
           liProds.innerHTML=regListaProds[i];
        ulProds.appendChild(liProds)
        listaDOM.appendChild(ulProds) 
        }
      
        
        }
        listaDOM.appendChild(botonMax)
        listaDOM.appendChild(botonCerrar)
        

}else{
  
    
}

}    


const borrarLista=()=>{
    
    const listaP=document.getElementById("listaProductos")
    if(listaP){
      var borrarLista=document.body.removeChild(listaP)  
    }
    localStorage.removeItem("primerProd");
    localStorage.removeItem("primerValor");
    setPrimerProducto(null)
    localStorage.removeItem("listaDeCompra")
}






const guardarListaCompra=(valor)=>{

    
    soloMax();
    if(primerProducto == null){
       
        arrayNuevo.push(valor)
        setPrimerProducto(false);
        localStorage.setItem("primerProd", false);
        setListaCompra(arrayNuevo)
        localStorage.setItem("primerValor", valor)
        
        localStorage.setItem("listaDeCompra", JSON.stringify(arrayNuevo));
        const listaDOM= document.createElement('div');
        
        document.body.appendChild(listaDOM);
        listaDOM.id="listaProductos";
        const botonMax=document.createElement("Button")
        
        
        botonMax.innerHTML="Max/Min";
        
        
        const max=document.createElement("ImArrowDownRight2");
        const botonCerrar=document.createElement("Button");
        botonCerrar.innerHTML="Cancelar";
        botonMax.addEventListener("click", maximizar, false)
        botonCerrar.addEventListener("click", borrarLista,false);
        const ulProds=document.createElement('ul');
        ulProds.id="ulProds";
        const liProds=document.createElement('li');
        liProds.innerHTML=valor;
        ulProds.appendChild(liProds)
        listaDOM.appendChild(ulProds)
        listaDOM.appendChild(botonMax)
        listaDOM.appendChild(botonCerrar)
   
        botonCerrar.appendChild(max)
     
    }
    else{        
                const ulProds=document.getElementById("ulProds");
            
                const liProds=document.createElement('li');
                liProds.innerHTML=valor;

                ulProds.appendChild(liProds)

            if(listaCompra==null){
                arrayNuevo.push(valor)
                setListaCompra(arrayNuevo)
                localStorage.setItem("listaDeCompra", JSON.stringify(listaCompra));
            }else{
            listaCompra.push(valor);
         
  
          
            localStorage.setItem("listaDeCompra", JSON.stringify(listaCompra));
          
        }
    }
    
    
    
    
}


const minimizar=()=>{
    const ulProds=document.getElementById("ulProds")
    if(ulProds){
       
      ulProds.style.display="none";  
    
    }
    
  
}


const soloMax=()=>{
   
    const ulProds=document.getElementById("ulProds")
    if(ulProds){
        if (ulProds.style.display=="none"){
      ulProds.style.display="block";  
    }
    }
    
   
}

const maximizar=()=>{
   
    const ulProds=document.getElementById("ulProds")
    if(ulProds){

    
    if (ulProds.style.display=="none"){
      ulProds.style.display="block";  
    }
    else{
        ulProds.style.display="none";  
    }
    }
}


const ocultarSesion=(e)=>{
    if((localStorage.getItem("login"))){
       
      
        var container = $("#usuario");
        var container2= $("#exit");
    
            if (!container2.is(e.target)){
            if (!container.is(e.target) && container.has(e.target).length === 0 ){ 
            //Se ha pulsado en cualquier lado fuera de los elementos contenidos en la variable container
            var se= document.getElementById("idSesion")
           
            se.style.display = "none";
    
            }
          }else{ 
            
            salir()}
    ;
     }
}

const activarMenu=(opcion)=>{
    
    
    $(".active").removeClass("active");
    $("span[title|='"+opcion+"']").addClass("active");
    sessionStorage.setItem("menuActivo", opcion)

}

const ponerfoto=(img)=>{
    setImagen(img);
    localStorage.setItem("imagen", img)
}

const nombre=(dato)=>{
 setUsuario(dato)
 localStorage.setItem("nombre",dato)
}

const salir=()=>{
    setLogin(false);
    setUsuario("")
    localStorage.removeItem("primerProd");
    localStorage.removeItem("primerValor");
    setPrimerProducto();
    localStorage.removeItem("listaDeCompra")
    const listaP=document.getElementById("listaProductos")
    if(listaP){
      var borrarLista=document.body.removeChild(listaP)  
    }
    
    localStorage.removeItem("login")
    localStorage.removeItem("nombre")
    localStorage.removeItem("imagen")
    localStorage.removeItem("email")
    
}


return(
<Context.Provider value={{login:login, guardarListaCompra:guardarListaCompra, primerProducto:primerProducto, regListaCompra:regListaCompra, ocultarSesion:ocultarSesion, nombre:nombre, emailUser: emailUser, guardarEmail:guardarEmail, loading2:loading2, Loading2:Loading2, logUser:logueo, logOut:salir, minimizar:minimizar,activarMenu:activarMenu, usuario:usuario, noLoading2:noLoading2, ponerNombre:nombre, imagen:imagen, ponerfoto:ponerfoto}}>
 {props.children}
</Context.Provider>
)

}

export default GlobalState;