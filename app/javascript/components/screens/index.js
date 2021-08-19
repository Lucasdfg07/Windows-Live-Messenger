import React from 'react';

import Draggable from 'react-draggable';

import { useSelector } from 'react-redux';

import Chat from '../chat';
import SignIn from '../sign_in';
import SignUp from '../sign_up';
import UserList from '../user_list';

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

    console.log(notification_state)
    
    return (
        <>
            {
                (isScreenMinimized == false && isScreenMaximized == false && msnScreen == true) &&
                <Draggable>
                    <div>
                        { (logInScreen && user == undefined) && <SignIn /> }
                        { (signUpScreen && user == undefined) && <SignUp /> }
                        { (user != undefined && listScreen) && <UserList user={user} /> }
                        { (user != undefined && chatScreen.value) && <Chat user={chatScreen.partner} />}
                    </div>
                </Draggable>
            }
                    
            { 
                (isScreenMinimized == false && isScreenMaximized == true && msnScreen == true) && 
                <>
                    { (logInScreen && user == undefined) && <SignIn /> }
                    { (signUpScreen && user == undefined) && <SignUp /> }
                    { (user != undefined && listScreen) && <UserList user={user} /> }
                    { (user != undefined && chatScreen.value) && <Chat user={chatScreen.partner} />}
                </>
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