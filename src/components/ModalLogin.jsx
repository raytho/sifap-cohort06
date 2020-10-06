import React from 'react';
import ReactDOM from 'react-dom';

import '../assets/styles/layout/Modal.scss';

function ModalLogin(props) {

    if (!props.isOpen) {
        return null;
    }

    return (
        ReactDOM.createPortal(
            document.getElementById('modal')
        )
    )
}


export default ModalLogin;