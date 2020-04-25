import  { Button, Modal} from 'react-bootstrap'
import React from 'react';
import './modal.css'
const  MyModal = (props) => {
    return (<div>
       <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter"  centered>
            <Modal.Header className="f3" closeButton>
                {props.Modaltitle}
            </Modal.Header>
            <Modal.Body>
           
            {props.children}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
        
      );
  }

  export default MyModal