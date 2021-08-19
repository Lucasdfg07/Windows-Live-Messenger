import React from 'react';

import Draggable from 'react-draggable';

import { useDispatch, useSelector } from 'react-redux';

import Chat from '../chat';
import SignIn from '../sign_in';
import SignUp from '../sign_up';
import UserList from '../user_list';

import { useActionCable } from 'use-action-cable';
import { emoji, notification } from '../../store/modules/chat';

const Login = () => {
    const msnScreen = useSelector((state) => state.msnScreen.value);
    const isScreenMinimized = useSelector((state) => state.msnScreen.minimized);
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);
    
    const signUpScreen = useSelector((state) => state.component.sign_up);
    const logInScreen = useSelector((state) => state.component.sign_in);

    const user = useSelector((state) => state.user.value);

    const listScreen = useSelector((state) => state.component.list_user);

    const chatScreen = useSelector((state) => state.component.chat);
    const notification_state = useSelector((state) => state.chat.notification);

    const emojiState = useSelector((state) => state.chat.emoji);
    const videosArray = ["alien", "ball_kicking", "frog", "guitar", "heart", "hiding", "hip_hop", "ice_cream", "kiss", "knocking", "lamp", "laughing", "pig", "venerate", "water_ball"];

    const dispatch = useDispatch();

    // ActionCable Configuration
    const channelParams = { channel: 'ChatChannel' };
    const channelHandlers = {
        received(data) {
            if(data.partner.id == user.id) {
                dispatch(notification(data));

                let audio = new Audio(`/msn_notification.mp3`);
                audio.play();

                setTimeout(function() { 
                    dispatch(notification(undefined))
                }, 2000);

                setEmoji(data.message.content);
            }
        }
    }

    useActionCable(channelParams, channelHandlers);
    // ActionCable end

    function setEmoji(content) {
        if(videosArray.indexOf(content) > -1) {
            // Set emojis
            dispatch(emoji(content));

            setTimeout(function() { 
                dispatch(emoji(undefined));
            }, 10000);
        } else {
            return
        }
    }
    
    return (
        <>
            {
                (isScreenMinimized == false && isScreenMaximized == false && msnScreen == true) &&
                <Draggable>
                    <div>
                        { (logInScreen && user == undefined) && <SignIn /> }
                        { (signUpScreen && user == undefined) && <SignUp /> }
                        { (user != undefined && listScreen) && <UserList user={user} /> }
                        { (user != undefined && chatScreen.value) && <Chat user={chatScreen.partner} videos={videosArray} />}
                    </div>
                </Draggable>
            }
                    
            { 
                (isScreenMinimized == false && isScreenMaximized == true && msnScreen == true) && 
                <>
                    { (logInScreen && user == undefined) && <SignIn /> }
                    { (signUpScreen && user == undefined) && <SignUp /> }
                    { (user != undefined && listScreen) && <UserList user={user} /> }
                    { (user != undefined && chatScreen.value) && <Chat user={chatScreen.partner} videos={videosArray} />}
                </>
            }

            {
                (emojiState != undefined && user != undefined && chatScreen.value) &&
                <video autoPlay>
                    <source src={`/videos/${emojiState}.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            }

            {
                notification_state != undefined &&
                <div className="message_notification row">
                    <div className="photo col-5">
                        <img src={notification_state.user.photo} alt="Perfil Photo" />
                    </div>

                    <div className="col-7">
                        <b>{notification_state.user.name} disse:</b> <br />
                        {notification_state.message.content}
                    </div>
                </div>
            }
        </>
    )
}

export default Login;