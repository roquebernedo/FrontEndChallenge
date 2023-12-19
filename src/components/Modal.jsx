import React from 'react'
import './Modal.scss'

const Modal = ({ closeModal, modalDisplay, closeOnOutsideClick, text, handle, key }) => {
//     const [modalDisplay, setModalDisplay] = useState(false);
//     const modalRef = useRef(null);

//   const openModal = () => {
//     setModalDisplay(true);
//   };

//   const closeModal = () => {
//     setModalDisplay(false);
//   };

//   const closeOnOutsideClick = (event) => {
//     if (event.target === modalRef.current) {
//       closeModal();
//     }
//     console.log(event.target)
//   };

  
  return (
    <div>
        <div className={modalDisplay ? 'open-modal' : 'modal'} onClick={closeOnOutsideClick}>
            <div className="modal-content">
                <p>{text}</p>
                <div className='buttons' key={key}>
                    <button onClick={closeModal}>NO</button>
                    <button onClick={handle}>YES</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Modal