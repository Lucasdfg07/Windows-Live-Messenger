import React from 'react';

import ScreenHeader from '../shared/screenHeader/index';
import ScreenBody from '../shared/screenBody/index';

import MsnIcon from '../../../assets/images/icons/screen_msn_icon.png';
import HomeIcon from '../../../assets/images/icons/loginIcon.png';

import { useSelector } from 'react-redux';

import BackgroundMsnIcon from '../../../assets/images/messenger_background.png';

const Screen = () => {
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);

    return (
        <>
            <div className={`${isScreenMaximized && 'maximized_screen'} screen`}>
                <ScreenHeader phrase="Windows Live Messenger" icon={MsnIcon} />

                <ScreenBody>
                    <div className="container">
                        <div className="text-center">
                            <img src={HomeIcon} alt="MSN Icon" />
                        </div>

                        <div className="field mt-4">
                            <label>Endereço de Email:</label>
                            <input type="email" className="login_form" />
                        </div>

                        <div className="field mt-3">
                            <label>Senha:</label>
                            <input type="password" className="login_form" />
                        </div>

                        <div className="field mt-3">
                            <label>Status:</label>
                            <select>
                                <option>Disponível</option>
                                <option>Ocupado</option>
                                <option>Ausente</option>
                                <option>Invisível</option>
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

                        <div className="field mt-4">
                            <a href="#">Me Cadastrar</a>
                        </div>

                        <div className="field">
                            <a href="#">Esqueceu Sua Senha?</a>
                        </div>
                    </div>

                    <img src={BackgroundMsnIcon} className="background_image" />
                </ScreenBody>
            </div>
        </>
    )
}

export default Screen;