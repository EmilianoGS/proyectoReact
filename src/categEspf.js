import { propTypes } from "react-bootstrap/esm/Image";
import { useState, useEffect} from 'react';
import Opcionmenu from './opcionmenu';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import {Link} from 'react-router-dom';
import './clases.css';

function CategEspf(props){
    
    const [prods,setProds]=useState([]);
    const categ = props.match.params.category;
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('https://fakestoreapi.com/products/category/'+categ)
        .then(res=>res.json())
        .then(json=>{
            setProds(json)
            setLoading(false)
            console.log(json)})
            
        },[categ])
        

    
    if(loading){
        return(
            <div className="spinner">
<Spinner animation="border" size="me" />
</div>
        )
    }
    
    else{   
         return(

        <>
        <br/><br/>
        
        <br/>
        <Container className="contain">
           <h2>Productos de {categ}:</h2>
           <br/>
            <Row>
                 
        {prods.map(prod=>
        <>
        <Col>
          <Card style={{ width: '12rem'}}>
          <Card.Body>
            <Card.Img variant="top" src={prod.image} />
            <p>{prod.title}</p>
            <Link to={"/productos/"+prod.id}>
                <Button>Ver detalle</Button>
            </Link>
        </Card.Body>
        </Card>
        </Col>
     
        
        <br/></>)}
        </Row> 
        </Container>
        </>
    )


        }
}


export default CategEspf;