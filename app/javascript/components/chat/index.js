import React, { useState, useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MsnIcon from '../../../assets/images/icons/screen_msn_icon.png';
import ShakingIcon from '../../../assets/images/icons/shaking.png';

import MessagesService from '../../services/messages';

import { list_user_screen_state } from '../../store/modules/components';
import { background, notification } from '../../store/modules/chat';

import ScreenBody from '../shared/screenBody';
import ScreenHeader from '../shared/screenHeader';

import { useActionCable } from 'use-action-cable';

const Chat = (props) => {
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);
    const chatBackground = useSelector((state) => state.chat.background);
    const user = useSelector((state) => state.user.value);
    
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    
    const dispatch = useDispatch();
    
    const messagesEndRef = useRef(null);

    const [displayIcons, setDisplayIcons] = useState(false);
    const [chatBackgroundDiv, setChatBackgroundDiv] = useState(false);
    const [shaking, setShaking] = useState(false);

    const emojis = [..."😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾"].filter(v => v != " ")
    
    
    // ActionCable Configuration
    const channelParams = { channel: 'ChatChannel' };
    const channelHandlers = {
        received(data) {
            if(data.message.user_id != user.id && data.message.content == "Você chamou atenção.") {
                setShaking(true)
                play_audio('msn_nudge');

                // Set false after animation
                setTimeout(function() { 
                    setShaking(false);
                }, 2000);
            }

            if(data.message.user_id != user.id && data.message.content != "Você chamou atenção.") {
                play_audio('msn_notification');
                dispatch(notification(data));

                // Set false after animation
                setTimeout(function() { 
                    dispatch(notification(undefined));
                }, 2000);
            }

            handleMessages()
        }
    }

    useActionCable(channelParams, channelHandlers);
    // ActionCable end

    async function handleSubmit(e) {
        e.preventDefault();

        const message_hash = {
            "user": user.id,
            "partner": props.user.id,
            "content": message
        }

        const response = await MessagesService.create(message_hash)
        setMessages([...messages, response.data.object]);
        setMessage('');
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    async function handleMessages() {
        const response = await MessagesService.index(user.id, props.user.id);
        setMessages(response.data);
    }

    function handleChange(element) {
        setMessage(message + element);
        setDisplayIcons(false);
    }

    function handleBackground(e) {
        dispatch(background(e.target.src));
        setChatBackgroundDiv(!chatBackgroundDiv);
    }

    async function handleShaking(e) {
        e.preventDefault();

        const message_hash = {
            "user": user.id,
            "partner": props.user.id,
            "content": "Você chamou atenção."
        }

        const response = await MessagesService.create(message_hash)
        setMessages([...messages, response.data.object]);
    }

    function play_audio(sound) {
        let audio = new Audio(`/${sound}.mp3`);
        audio.play();
    }

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        handleMessages()
    }, [])

    return (
        <div className={`${isScreenMaximized && 'maximized_screen'} screen ${shaking && 'shake'}`}>
            <ScreenHeader phrase="Windows Live Messenger" icon={MsnIcon} />

            <ScreenBody>
                <div className="chat" style={{ backgroundImage: `url('${chatBackground}')`, backgroundSize: 'cover' }}>
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
                                                    {message.content}
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
                        
                        {
                            displayIcons && 
                            <div className="emojis">
                                <div className="row">
                                    {
                                        emojis.map((e, i) => {
                                            return (
                                                <div className="col-4" key={i}>
                                                    <button onClick={() => handleChange(e)}>{e}</button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }

                        {
                            chatBackgroundDiv &&
                            <div className="background">
                                <div className="row">
                                    {
                                        [...Array(5)].map((e, i) => {
                                            return (
                                                <div className="col-6 mt-3" key={i}>
                                                    <img src={`/background/background_${i}.jpg`} 
                                                        alt="Chat Background"
                                                        onClick={(e) => handleBackground(e)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }

                        <form onSubmit={handleSubmit}>
                            <div className="row mt-3">
                                <div className="col-9">
                                    <div className="text_header">
                                        <div className="chat_icons mt-1">
                                            <div className="d-inline ms-4 me-4 button" 
                                                onClick={() => setDisplayIcons(!displayIcons)}>
                                                😉
                                            </div>

                                            <div className="d-inline ms-4 me-4 button" 
                                                onClick={() => setChatBackgroundDiv(!chatBackgroundDiv)}>
                                                ⛱️
                                            </div>

                                            <div className="d-inline ms-4 button"
                                                onClick={(e) => handleShaking(e)}>
                                                <img src={ShakingIcon} alt="Shaking Icon" />
                                            </div>
                                        </div>
                                    </div>
                                    
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