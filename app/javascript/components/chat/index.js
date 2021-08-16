import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MsnIcon from '../../../assets/images/icons/screen_msn_icon.png';
import { list_user_screen_state } from '../../store/modules/components';

import ScreenBody from '../shared/screenBody';
import ScreenHeader from '../shared/screenHeader';

const Chat = (props) => {
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);

    const user = useSelector((state) => state.user.value);

    const dispatch = useDispatch();

    return (
        <div className={`${isScreenMaximized && 'maximized_screen'} screen`}>
            <ScreenHeader phrase="Windows Live Messenger" icon={MsnIcon} />

            <ScreenBody>
                <div className="chat">
                    <div className="chat_screen">
                        <div className="sign_out">
                            <span onClick={() => dispatch(list_user_screen_state())}>Voltar</span>
                        </div>

                        <div className="row">
                            <div className="col-9">
                                <div className="chat_header">
                                    Para: <b>{props.user.name} {`<${props.user.email}>`}</b>
                                </div>

                                <div className="chat_body"></div>
                            </div>

                            <div className="col-3 chat_perfil">
                                <img src={props.user.photo} alt="User Perfil" />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-9">
                                <div className="text_header"></div>
                                
                                <div className="message">
                                    <textarea></textarea>
                                </div>

                                <div className="text_footer"></div>
                            </div>

                            <div className="col-3 chat_perfil">
                                <img src={user.photo} alt="User Perfil" />
                            </div>
                        </div>
                    </div>
                </div>
            </ScreenBody>
        </div>
    )
}

export default Chat;