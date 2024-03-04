import Context from "./context";
import {useState, useContext, useEffect} from 'react';
import firebase from "./firebase";
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import Form1 from "./form"
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import './clases.css';





function Misdatos(props){

const [loading2, setLoading2]= useState(false);
const [image, setImage]=useState(null);
const context= useContext(Context);
const [loading,setLoading]=useState(true);
const [edicion, setEdicion]=useState(false) ;
const [id, setId]=useState('')
const [datosUsuario, setDatosUs]=useState({})

useEffect(()=>{
    setLoading(true);
    console.log('email:', context.emailUser)
    const usuariosRef = firebase.db.collection("usuarios")
    const consulta= usuariosRef.where("email","==", context.emailUser );
    consulta.get()
    .then(res=>{
        res.forEach(doc=> {
            console.log('CONSULTA',doc.id, " => ", doc.data().nombre);            
            setDatosUs(doc.data())            
            setId(doc.id);
            setLoading(false);          
        });        
    })
  
},[]);


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
              filePreview.style.height="70px";
    
              //e.target.result contents the base64 data from the image uploaded
              filePreview.src = reader.result;
              const vistaPrevia = document.getElementById('vistaprevia');
              vistaPrevia.appendChild(filePreview);
              setLoading2(false)
          }
              
      }
    
    setImage(file); 
    }

const borrarPreview=()=>{

        const input=document.getElementById("inputfile");
        input.value="";
        setImage(null);
        const preview=document.getElementById('file-preview');
        preview.src="";
        preview.remove();
        }

const onChange=(e)=>{
    const target = e.target;
    const value= target.value;
    const name=target.name;
    
    setDatosUs(
        {
            ...datosUsuario,
            [name]: value
        }
    )
     }

const guardarCambios=(e)=>{
    e.preventDefault();
    setLoading2(true);
    const imagenLocal= localStorage.getItem("imagen");
    const srcImagen=document.getElementById("file-preview").src
    if(srcImagen !== imagenLocal ){
            const uploadTask=firebase.storage().ref('imagenes/'+ image.name).put(image);

            uploadTask.on('state_changed',function(snapshot) {
                                                     
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done Loading:', loading);
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
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
               
                context.ponerfoto(downloadURL);
                                 
                firebase.db.doc("usuarios/"+id)
                .set({
                    nombre: datosUsuario.nombre,
                    apellido:datosUsuario.apellido,
                    email:datosUsuario.email,
                    telefono: datosUsuario.telefono,
                    foto: downloadURL
                },{merge:true})
                .then(doc=>{
                    context.nombre(datosUsuario.nombre)
                    borrarPreview();
                    setLoading(false);
                    setImage(null) ;              
                    setEdicion(false);
                    setLoading2(false);
                    
                })
                })//fin .then getDownloadURL
       
        .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

            })
        }else{
            firebase.db.doc("usuarios/"+id)
            .set({
                nombre: datosUsuario.nombre,
                apellido:datosUsuario.apellido,
                email:datosUsuario.email,
                telefono: datosUsuario.telefono
                
            },{merge:true})
            .then(doc=>{
                context.nombre(datosUsuario.nombre)
                borrarPreview();
                setLoading2(false);        
                setImage(null);         
                setEdicion(false)       
            })
        }
}

const editarDatos=()=>{
    setEdicion(true);
}

const volver=()=>{
    setEdicion(false);
    setImage(null)
    borrarPreview();
}

 return(
   
    <Context.Consumer>
         { context =>
         <>
    {context.login &&
   <>
   <Card>
   {loading && <><br/><div className="spinner"><Spinner animation="border" size="me" /></div></>}
       <Card.Body>          
           
        {(edicion==false && loading==false) &&
        
            <>
            <label><strong>Nombre: </strong></label> {datosUsuario.nombre}<br/><br/>
            <label><strong>Apellido: </strong></label> {datosUsuario.apellido}<br/><br/>
            <label><strong>E-mail: </strong></label> {datosUsuario.email}<br/><br/>
            <label><strong>Teléfono: </strong></label> {datosUsuario.telefono}<br/><br/>
            <label><strong>Foto: </strong></label><br/>
            <div>
            {context.loadingImg && <Spinner animation="border" size="me" />}
            <img height="70px" src={context.imagen} /></div><br/><br/><br/>
            <Button onClick={editarDatos}>Editar datos</Button>
            </> }
     
        {edicion &&
        <>
            <Form onSubmit={guardarCambios}>
            <Form1 label="Nombre" type="text" required value={datosUsuario.nombre} onChange={onChange} name="nombre" />
            <Form1 label="Apellido" type="text" required value={datosUsuario.apellido} onChange={onChange}  name="apellido" />
            <Form1 label="Telefono" type="number" required  value={datosUsuario.telefono} onChange={onChange}  name="telefono"/>
            
    
            <label><strong>Foto: </strong></label><br/>
            <label id="vistaprevia"></label>
            <img id="file-preview" height="70px "src={context.imagen}/><br/><br/>
            <input id="inputfile" type="file" accept="image/*" onChange={inicializar}/><br/><br/>
            <Button type="submit">{loading2 && <Spinner animation="border" size="sm"></Spinner>}Guardar cambios</Button>
            <>    </><Button onClick={volver}>Volver</Button>   
            </Form>
            <br/>    
        </>
        }
       </Card.Body>
   </Card>
  </>
}
</>
}
</Context.Consumer>
 );   

}

export default Misdatos;