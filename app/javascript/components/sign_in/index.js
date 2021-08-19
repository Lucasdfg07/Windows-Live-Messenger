import React, { useState } from 'react';

import ScreenHeader from '../shared/screenHeader/index';
import ScreenBody from '../shared/screenBody/index';

import MsnIcon from '../../../assets/images/icons/screen_msn_icon.png';
import HomeIcon from '../../../assets/images/icons/loginIcon.png';

import { useDispatch, useSelector } from 'react-redux';

import BackgroundMsnIcon from '../../../assets/images/messenger_background.png';

import UsersService from '../../services/users';
import { sign_in } from '../../store/modules/user';
import { sign_up_screen_state, list_user_screen_state } from '../../store/modules/components';

const SignIn = () => {
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);

    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(0);
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()

        const login_hash = {
            "email": email,
            "password": password,
            "status": status
        }

        const response = await UsersService.sign_in(login_hash)
        
        setMessage(response.data.message);

        if(response.data.status == 200) {
            dispatch(sign_in(response.data.user));
            dispatch(list_user_screen_state());
        }
    }

    function handleSignUpForm(e) {
        e.preventDefault();
        
        dispatch(sign_up_screen_state());
    }

    return (
        <div className={`${isScreenMaximized && 'maximized_screen'} screen`}>
            <ScreenHeader phrase="Windows Live Messenger" icon={MsnIcon} />

            <ScreenBody>
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="text-center">
                            <img src={HomeIcon} alt="MSN Icon" />
                        </div>

                        <div className="field mt-4">
                            <label>Endereço de Email:</label>
                            <input type="email" 
                                    className="login_form" 
                                    onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="field mt-3">
                            <label>Senha:</label>
                            <input type="password" 
                                    className="login_form"
                                    onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className="field mt-3">
                            <label>Status:</label>
                            <select onChange={e => setStatus(e.target.value)}>
                                <option value="0">Disponível</option>
                                <option value="1">Ocupado</option>
                                <option value="2">Ausente</option>
                                <option value="3">Invisível</option>
                            </select>
                        </div>

                        <div className="field mt-3">
                            <input type="checkbox" className="me-2" />
                            <label>Lembrar-me</label>
                        </div>

                        <div className="actions text-center">
                            <button className="submit_btn mt-2">
                                Entrar
                            </button>
                        </div>

                        <div className="text-center">
                            {message}
                        </div>

                        <div className="field mt-4">
                            <a href="#" onClick={e => handleSignUpForm(e)}>Me Cadastrar</a>
                        </div>
                    </div>
                </form>

                <img src={BackgroundMsnIcon} className="background_image" />
            </ScreenBody>
        </div>
    )
}

export default SignIn;