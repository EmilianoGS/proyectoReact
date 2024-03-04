import React from 'react';
import {useState, useEffect, useContext} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import firebase from './firebase';
import Card from 'react-bootstrap/Card' 
import Context from './context';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './clases.css';
import { BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";
import { MdSearch, MdAddShoppingCart } from "react-icons/md";
import $ from 'jquery';



function Productos(props){
   
    const listaArray=[]
    const context=useContext(Context);
    const [prods, setProds]= useState([])
    const [loading, setLoading]=useState(true)
    var [pagination, setPagination]=useState([])
    const pageSize= 4;
    var pageCont2=0;
    var pageCont= Math.ceil(prods.length/pageSize);
    const [loading2, setLoading2]=useState(true)
    const [primero,setPrimero]=useState(false)
    const[searchValue, setSearchValue]=useState('')
    const [arrayBusqueda,setArrayBusqueda]=useState([])
    var [pageNumber, setNumber]=useState(props.match.params.page);
    var i=1;
    const [valorBuscado, setValorBuscado]=useState();
    const [resultado, setResultado]=useState(false);
    const arrayCompra=[] 
    

   window.onload= paginas()
        
    

    useEffect( async ()=>{
       
        setLoading(true)
        context.activarMenu("Productos");
      
        fetch('https://fakestoreapi.com/products')
            .then( res=>res.json())
            .then(json=>{ 
                setProds(json)
               setLoading(false)
                         
                 setLoading2(false)
                if(arrayBusqueda.length==0){
                paginate(json, pageSize, pageNumber)
                
                }
                
                
            
                
                setPrimero(true)
                $("#buton"+pageNumber).addClass("NroPagActive")   
                   
}
            )
           
    }
   
         ,[]);

         function paginas2(){
            listaArray=[]
            while(i<=pageCont2){
                listaArray.push(i);
                
                i++;                   
             }
 
           
          }
         function paginas(){
          
           while(i<=pageCont){
               listaArray.push(i);
               
               i++;                   
            }

        
         }
         
      async function funcionSlice(pageNumber){
        
             const slice=await prods.slice((pageNumber-1)* pageSize,pageNumber*pageSize);
          
        return(
            slice
        )
         }
         

         useEffect(async ()=>{
            
     
            setLoading(true)
             pageNumber=props.match.params.page;
             const slice=await funcionSlice(pageNumber)
             setPagination(slice)
             if(primero){
                setLoading(false)
            }
            $(".NroPagActive").removeClass("NroPagActive");
            $("#buton"+pageNumber).addClass("NroPagActive")
            context.minimizar();
         }

         ,[pageNumber,props.match.params.page])

     
  
    async function paginate(arreglo, page_Size, page_Number){
              
              setPagination(arreglo.slice((page_Number-1)* page_Size,page_Number*page_Size));
              
               return( setLoading(false))        
        }
          
     function nextPage(){
        
       setNumber(parseFloat(pageNumber)+1);
       /*paginate(prods,pageSize, pageNumber);*/
        window.scrollTo(0, 0)
                        }

    function selectPage(e){
        
        const num=(e.target).innerHTML;
        
     
       setNumber(num);
      
        window.scrollTo(0, 0)
        // $(".NroPagActive").removeClass("NroPagActive");
        // $(e.target).addClass("NroPagActive");

     }

   function prevPage(){
    window.scrollTo(0, 0)
       setNumber(pageNumber-1);
       /* paginate(prods, pageSize, pageNumber);*/
      
                  }

    const changeBusqueda=(e)=>{
    const valor=e.target.value;

    setSearchValue(valor);
    if(valor==''){
        setResultado(false)
    }else{


    
    const arraySearch=[]
   
    setResultado(true)
    
    for(let producto of prods){
        const texto= producto.title
       
     
        if(texto.toLowerCase().indexOf(valor.toLowerCase())!== -1){
            const result=producto;
            arraySearch.push(result)
       
        }
    }
    setArrayBusqueda(arraySearch)
     
     
}
}

const agregar=(e)=>{
    e.preventDefault();
    const valor=e.currentTarget.value;
   
    context.guardarListaCompra(valor) 
  
}

  
    if (loading) {
        return (
       <div className="spinner">
       <Spinner animation="border" />
       </div>
       )
    }
    else{

        return(
           
            <Context.Consumer>
        { context =>
            
    <>
    
    { context.login &&  
               
        <Container  className="contain">
             
             <div id="busquedaProd"><input id="inputBusqueda" type="text" placeholder="Búsqueda" onChange={changeBusqueda} value={searchValue} />
             <button id="buscar"><MdSearch/></button>
             
             </div>
             <br/><br/>
        {resultado == false &&
        
        <Row>
            
        {pagination.map(pag=>
        <Col>
        <Card style={{ width: '12rem', marginBottom:"10px"}}>
        <Card.Body>
        {loading2 && <div><Spinner animation="border"/></div>}
        <Card.Img variant="top" src={pag.image} /><br/><br/>
        <p>{pag.title}</p>
        <Link to={"/productos/"+pag.id}><Button>Ver detalle</Button></Link> <Button
        onClick={agregar} value={pag.title}>
            <MdAddShoppingCart/></Button><br/><br/><br/>
        </Card.Body>
        </Card>
        </Col>
        )}
        </Row>
        }
        {resultado == true &&
           <>
           <p>Resultados de "<p id="valorBuscado">{searchValue}</p> " : {arrayBusqueda.length}</p>
           <br/>
        <Row>
            
            {arrayBusqueda.map(pag=>
                <Col>
                <Card style={{ width: '12rem', marginBottom:"10px"}}>
                <Card.Body>
                {loading2 && <div><Spinner animation="border"/></div>}
                <Card.Img variant="top" src={pag.image} /><br/><br/>
                <p>{pag.title}</p>
                <Link  to={"/productos/"+pag.id}><Button>Ver detalle</Button></Link> <Button
                 onClick={agregar}
                 value={pag.title}
                 
                 ><MdAddShoppingCart/></Button><br/><br/><br/>
                </Card.Body>
                </Card>
                </Col>
                )}
                
                </Row>
                </>
         }
        <br/><br/> {resultado== false &&
         <div id="paginacion">
        { pageNumber > 1 && <Link to={"/productos/page/"+(parseFloat(pageNumber)-1)}><Button size="sm" onClick={prevPage}><BsChevronCompactLeft/></Button></Link>}
            {listaArray.map(li=>
            <Link to={"/productos/page/"+li}><button className="button" style={{margin:"2px"}} onClick={selectPage} id={`buton`+li} >{li}</button></Link>
                )}{ pageNumber<pageCont && <Link to={"/productos/page/"+(parseFloat(pageNumber)+1)}><Button  size="sm" onClick={nextPage}><BsChevronCompactRight/></Button></Link>}
                <br/><br/>
        
        
        </div>}
        </Container>
       
    }   
    </>
    }
    </Context.Consumer> )
}

}

export default Productos;