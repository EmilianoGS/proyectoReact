import Form from 'react-bootstrap/Form';

function Form1(props){

  return(
      <Form.Group controlId={"formBasic"+props.name} >
        <Form.Label><strong>{props.label}</strong></Form.Label>
        <Form.Control required type={props.type} placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange} />
    </Form.Group> 
)
} 
export default Form1;