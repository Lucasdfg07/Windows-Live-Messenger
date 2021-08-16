import React, { useState } from 'react';

import ScreenHeader from '../shared/screenHeader/index';
import ScreenBody from '../shared/screenBody/index';

import MsnIcon from '../../../assets/images/icons/screen_msn_icon.png';
import HomeIcon from '../../../assets/images/icons/loginIcon.png';

import { useDispatch, useSelector } from 'react-redux';

import BackgroundMsnIcon from '../../../assets/images/messenger_background.png';

import UsersService from '../../services/users';

import { sign_in_screen_state } from '../../store/modules/components';
import { sign_in } from '../../store/modules/user';

const SignUp = () => {
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    function handleUpload(file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            setPhoto(reader.result)
        }

        reader.readAsDataURL(file)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        const sign_up_hash = {
            "user": {
                "name": name,
                "email": email,
                "description": description,
                "password": password,
                "photo": photo
            }
        }

        const response = await UsersService.sign_up(sign_up_hash)

        setMessage(response.data.message);

        if(response.data.status == 200)
            dispatch(sign_in(response.data.user));
    }

    function handleSignInForm(e) {
        e.preventDefault();

        dispatch(sign_in_screen_state());
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
                            <label>Nome:</label>
                            <input type="text" 
                                    className="login_form" 
                                    onChange={e => setName(e.target.value)}
                                    required />
                        </div>

                        <div className="field mt-4">
                            <label>Endereço de Email:</label>
                            <input type="email" 
                                    className="login_form" 
                                    onChange={e => setEmail(e.target.value)}
                                    required />
                        </div>

                        <div className="field mt-4">
                            <label>Descrição:</label>
                            <textarea type="text" 
                                    className="login_form" 
                                    onChange={e => setDescription(e.target.value)}></textarea>
                            <small>(Escreva um pouco sobre você :D)</small>
                        </div>

                        <div className="field mt-3">
                            <label>Senha:</label>
                            <input type="password" 
                                    className="login_form"
                                    onChange={e => setPassword(e.target.value)}
                                    required />
                        </div>

                        <div className="field mt-3">
                        <input type="file"
                                name="avatar"
                                accept="image/png, image/jpeg"
                                onChange={e => handleUpload(e.target.files[0])} />
                        </div>

                        <div className="actions text-center">
                            <button className="submit_btn mt-2">
                                Cadastrar
                            </button>
                        </div>

                        <div className="text-center">
                            {message}
                        </div>

                        <div className="field mt-4">
                            <a href="#" onClick={e => handleSignInForm(e)}>Login</a>
                        </div>

                        <div className="field">
                            <a href="#">Esqueceu Sua Senha?</a>
                        </div>
                    </div>
                </form>

                <img src={BackgroundMsnIcon} className="background_image" />
            </ScreenBody>
        </div>
    )
}

export default SignUp;