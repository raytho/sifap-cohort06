import React, { useContext, useState } from 'react';
import { Context } from '../../Context';

import FormLogin from './FormLogin';


const LoginContainer = (props) => {

    const LogExEmail = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

    const LogExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    const [form, setValues] = useState({
        email: '',
        password: '',
        modalIsOpen: true,
    });

    const { activateAuth } = useContext(Context)
    const [emailValidate, setEmailValidate] = useState(false);
    const [passwordValidate, setPasswordValidate] = useState(false);

    const handleChangeInput = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validateForm = () => {
        let email;
        let password;

        if (LogExEmail.test(form.email)) {
            email = true;
            setEmailValidate(false);
        } else {
            setEmailValidate(true);
        }
        if (LogExPassword.test(form.password)) {
            password = true;
            setPasswordValidate(false);
        } else {
            setPasswordValidate(true);
        }
        if (email && password) {
            return true
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validateForm()) {
            const postData = async () => {
                try {
                    await fetch('https://ancient-fortress-28096.herokuapp.com/api/auth/sign-up ', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(form)
                    }).then(response => {
                        window.console.log(response)
                        activateAuth()
                        // history.push('/')
                    })
                } catch (error) {
                    window.console.log(error)
                }
            }
            postData();
        }
    }

    const handleOpenModal = () => {
        useState({ modalIsOpen: true })
    }

    const handleCloseModal = () => {
        useState({ modalIsOpen: false })
    }

    return (
        <FormLogin
            handleOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
            modalIsOpen={useState.modalIsOpen}
            handleSubmit={handleSubmit}
            handleChangeInput={handleChangeInput}
            form={form}
            emailValidate={emailValidate}
            passwordValidate={passwordValidate}
        />
    )
}

export default LoginContainer;