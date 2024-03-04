import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import {useState, useContext, useEffect} from 'react'
import firebase from './firebase'; 
import Form1 from './form';
import { useHistory } from 'react-router-dom' 
import Context from "./context"

function Login(props){

    const [datosUsuario, setDatos]=useState({
        email:'',
        password:''
    })
const [loading, setLoading]= useState(false);

const context= useContext(Context);
const [usuario, setUsuario]=useState('')
const history=useHistory()

useEffect(()=>{
    context.activarMenu("Login")
}

,[])

const loguear=(e)=>{
e.preventDefault();
setLoading(true)
context.Loading2();
let email= datosUsuario.email;
let password=datosUsuario.password;
firebase.auth.signInWithEmailAndPassword(email,password)
.then((data)=>{
    setLoading(false)
    alert('Se logueó');
    
    const usuariosRef = firebase.db.collection("usuarios")
    const consulta= usuariosRef.where("email","==", email);
    consulta.get()
    .then(res=>{
        res.forEach(doc=> {
            console.log('CONSULTA',doc.id, " => ", doc.data().nombre);
            const nombreUsuario=doc.data().nombre;
            const fotoUsuario=doc.data().foto;
            context.ponerfoto(fotoUsuario);
            context.ponerNombre(nombreUsuario);
            context.guardarEmail(email);
            context.logUser();
            context.noLoading2();
        });
        
    })
    .catch(function(error) {
        context.noLoading2();
        console.log("Error getting documents: ", error);
    });
     
        setDatos({
        email:'',
        password:''
    })
    
    history.push('/')
    
})
.catch((error)=>{
    alert("E-mail o contraseña incorrectos")
    setLoading(false);
    context.noLoading2();
    console.log("Error: ", error);
}
)
}



const onChange=(e)=>{
    const target = e.target;
    const value= target.value;
    const name=target.name;
    
    setDatos(
        {
            ...datosUsuario,
            [name]: value
        }
    )
     }

    return(
    <Card style={{ width: '60%', margin:'auto', padding:'15px' }}>
    <Card.Body>
    <Card.Title>Login</Card.Title>
    <Form onSubmit={loguear}>
    <Form1 label="E-mail" type="email" value={datosUsuario.email} name="email" onChange={onChange} placeholder="Enter email"/>
     <Form1 label="Password" type="password" placeholder="Password" name="password" onChange={onChange} value={datosUsuario.password}/>
    <Button type="submit">
    {loading && <Spinner animation="border" size="sm" />}
    Login
    </Button>
    </Form>
    </Card.Body>
    </Card>
        )   
    }

export default Login;