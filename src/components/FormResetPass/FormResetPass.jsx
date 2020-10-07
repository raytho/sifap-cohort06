import React from 'react';
import { Link } from 'react-router-dom';


const ResetPass = () => {
    return (
        <div>
            <form className='SignUp__form'>
                <h2> ¿No puedes ingresar a tu cuenta ? </h2>
                <label htmlFor='email'> Correo: <i>*</i>
                    <input
                        type='email'
                        name='email'
                        placeholder='ejemplo@correo.com' />
                </label>

                <div className='SignUp__buttons'>
                    <button type='submit'>Restablecer</button>
                </div>

                <p className='SignUp__redirect'> <Link to='/'> Iniciar sesión</Link></p>
                <p className='SignUp__redirect'>¿Aún no tienes cuenta? <Link to='/'>CREAR CUENTA </Link></p>

            </form>
        </div>
    )
}

export default ResetPass;