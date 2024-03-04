import { propTypes } from "react-bootstrap/esm/Image";
import { useState, useEffect} from 'react';
import Opcionmenu from './opcionmenu'
import Spinner from 'react-bootstrap/Spinner';
import {Link} from 'react-router-dom';
import $ from 'jquery';



function Categorias(props){
    
    const [categorias,setCategorias]=useState([]);
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        
        fetch('https://fakestoreapi.com/products/categories')
        .then(res=>res.json())
        .then(json=>{
            setCategorias(json)
            setLoading(false)
            console.log(json)})
        },[])
    
        


    
        if(loading){
            return(
                <div>
                 <Spinner animation="border" size="me" />
                </div>
            )
        }
    
    else {
        return(
        <>
        {categorias.map(categ=><li><Link  to={"/categorias/"+categ}>{categ}</Link><br/></li>)}
        </>
    )
}
}

export default Categorias;