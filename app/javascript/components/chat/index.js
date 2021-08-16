import React, { useState, useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MsnIcon from '../../../assets/images/icons/screen_msn_icon.png';
import { list_user_screen_state } from '../../store/modules/components';

import ScreenBody from '../shared/screenBody';
import ScreenHeader from '../shared/screenHeader';

const Chat = (props) => {
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);
    const user = useSelector((state) => state.user.value);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const messagesEndRef = useRef(null)

    function handleSubmit(e) {
        e.preventDefault();


        setMessage('');
        setMessages([...messages, message]);
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

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

                                <div className="chat_body p-2">
                                    {
                                        messages.map(function(message, index) {
                                            return (
                                                <div key={index}>
                                                    {message}
                                                </div>
                                            )
                                        })
                                    }

                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            <div className="col-3 chat_perfil">
                                <img src={props.user.photo} alt="User Perfil" />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row mt-3">
                                <div className="col-9">
                                    <div className="text_header"></div>
                                    
                                    <div className="message">
                                        <input type="text" 
                                        value={message}
                                        onChange={e => setMessage(e.target.value)} />

                                        <button type="submit">
                                            Enviar
                                        </button>
                                    </div>

                                    <div className="text_footer"></div>
                                </div>

                                <div className="col-3 chat_perfil">
                                    <img src={user.photo} alt="User Perfil" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </ScreenBody>
        </div>
    )
}

export default Chat;