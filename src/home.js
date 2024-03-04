import {useEffect, useContext} from 'react';
import './App.css';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Context from './context';
import Img from './imagenes/ecommerce.png'
import './clases.css'

function Home(props){
    
    const context=useContext(Context); 

useEffect(()=>{
    context.activarMenu("Home")
    context.minimizar();
}

,[])


    return(
        <div className="App">
        <span id="homeTitle"><h2>Sitio de Ecommerce</h2><p>Sitio de compras online. Donde podés armar tu pedido y recibirlo en tu casa.
        {context.login && <Link to="productos/page/1"><button id="botonPedido"><p>Realizar pedido</p></button></Link>}</p></span><img width="50%" id="imgHome" src={Img} />
            
            <div className="clear"></div>
        
        </div>

    )   
    
}

export default Home;