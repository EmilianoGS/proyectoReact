import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './App.css';
import React,{useState, useEffect, useContext} from 'react'
import firebase from './firebase'; 
import {storage} from './firebase'
import Spinner from 'react-bootstrap/Spinner';
import Form1 from './form'
import Context from './context';
import 'bootstrap/dist/css/bootstrap.min.css';


function Registro(props){
   
  
  const context=useContext(Context); 
  const [loading, setLoading]= useState(false);

  const [loading2, setLoading2]= useState(false);

  const [datosUsuario, setDatos]=useState({
        nombre:'',
        apellido:'',
        email:'',
        telefono:'',
        password:'',
        foto:''
    })

    useEffect(()=>{
      context.activarMenu("Registro")
  }
  
  ,[])

const [image, setImage]=useState(null);

const inicializar=(e)=>{

      const preview=document.getElementById('file-preview');
      if(preview!==null){
      preview.remove();
      }
      const file=e.target.files[0];
  
      if (file) {
        setLoading2(true);
        const reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = function () {
         
           const filePreview = document.createElement('img');
           filePreview.id = 'file-preview';
           filePreview.style.maxHeight="70px";

           //e.target.result contents the base64 data from the image uploaded
           filePreview.src = reader.result;
           const vistaPrevia = document.getElementById('vistaprevia');
           vistaPrevia.appendChild(filePreview);
           setLoading2(false)
        }
     
      }//fin if(file)

setImage(file); 

}//fin funcion inicializar


const borrarPreview=()=>{

const input=document.getElementById("inputfile");
input.value="";
setImage(null);
const preview=document.getElementById('file-preview');
preview.src="";
preview.remove();
}

const upLoadImage=(e)=>{
  e.preventDefault();
  setLoading(true);
  
if (!datosUsuario.nombre || !datosUsuario.apellido || !datosUsuario.email || !datosUsuario.password || !datosUsuario.telefono ){
  alert('Campos incompletos');
              setLoading(false);
            }

else{
      const uploadTask=firebase.storage().ref('imagenes/'+ image.name).put(image);

      uploadTask.on('state_changed',function(snapshot) {
                                                       
                  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  
                  switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                    
                      break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                     
                      break;
                  }
                  
                }, function(error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/unauthorized':
                    break;
                    case 'storage/canceled':
                  break;
                      case 'storage/unknown':
                    break;
                            }
              
              }, function() {
                // Upload completed successfully, now we can get the download URL
                
                firebase.storage().ref('imagenes').child(image.name).getDownloadURL().then(downloadURL=>{
                 
                  setLoading(false);              
                  let email= datosUsuario.email;
                  let password=datosUsuario.password;
                  firebase.auth.createUserWithEmailAndPassword(email, password)
                  .then((data)=>{ 
                      
                      firebase.db.collection("usuarios").add(
                          {
                            nombre: datosUsuario.nombre,
                            apellido:datosUsuario.apellido,
                            email:datosUsuario.email,
                            telefono:datosUsuario.telefono,
                            foto: downloadURL,
                            userId:data.user.uid
                          }
                        )
                        }
                        ).then((data)=>{
                            borrarPreview();
                            setLoading(false);                            
                            setImage(null)
                            setDatos({
                            nombre:'',
                            apellido:'',
                            email:'',
                            telefono:'',
                            foto:'',
                            password:''
                            })
                        }     );
                                                                        
                  
                }) 
              
                  
               alert('Se ha registrado') }) //Fin function
             
           }//Fin If
              }// Fin upLoadImage


          
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
    <Card.Title>Registro</Card.Title>
    <Form onSubmit={upLoadImage}>
    <Form1 label="Nombre" type="text" placeholder="Ingrese nombre*"  required value={datosUsuario.nombre} onChange={onChange} name="nombre" />
    <Form1 label="Apellido" type="text" placeholder="Ingrese apellido*" required value={datosUsuario.apellido} onChange={onChange}  name="apellido" />
    <Form1 label="Telefono" type="number" placeholder="Ingrese teléfono*" required  value={datosUsuario.telefono} onChange={onChange}  name="telefono"/>
    <Form1 label="E-mail" type="email" placeholder="Ingrese email*" required value={datosUsuario.email} onChange={onChange} name="email"/>
    <Form1 label="Password"  type="password" placeholder="Password*" required value={datosUsuario.password} onChange={onChange} name="password"/>
    <label>Foto</label><br/>
    
    <input required id="inputfile"  onChange={inicializar} type="file" accept="image/*" name="foto"/><br/><br/>
    <div style={{border:"1px dashed #bfbfbf", borderRadius:"6px", padding:"15px", width:"60%"}}>
        <label id="vistaprevia"></label>
    {image && <Button onClick={borrarPreview} style={{margin:"15px"}}>Borrar</Button> }</div>
       { loading2 && <div >
       <Spinner animation="border" />
       </div>}   
         
    <></><br/><br/>
    <Button type="submit" disabled={loading}>
    {loading && <Spinner animation="border" size="sm" />}
        Registrarse
    </Button>
    </Form>
    </Card.Body>
    
</Card>

        )   
    }

export default Registro;