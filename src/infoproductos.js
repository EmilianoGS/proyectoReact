import {useEffect, useState, useContext} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import firebase from './firebase'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Context from "./context";
import './clases.css';

function Infoproductos(props){

    const [loading, setLoading]=useState(true)
    const context= useContext(Context);
    const [datos,setDatos] = useState({});
    useEffect(() => {
            const id = props.match.params.id;
            fetch('https://fakestoreapi.com/products/'+id)
               .then(res=>res.json())
               .then(doc=>{
               setDatos(doc)
               setLoading(false)
               
            })
            context.activarMenu("Productos");
        }
        
        ,[])

    if (loading){
      return(
          <div>
          <Spinner animation="border" />
          </div>
      )
    }     
    else{
    return(
                        <div className="detalleProds">
                            
                            <h3> {datos.title}</h3> <br/><br/>
                            <img height="150px" src={datos.image}/><br/><br/>
                            <p className="descripcion">{datos.description}</p>
                            <h5>Categoría: </h5><Link to={"/categorias/"+datos.category}><p>{datos.category}</p></Link>
                            <h5>Precio: </h5><p className="precio">$ {datos.price}</p>  <br/><br/>
                            <Button>Comprar</Button>
                            
                        </div>
                         )}
}

export default Infoproductos;