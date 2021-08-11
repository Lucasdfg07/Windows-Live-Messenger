import React from 'react';

import Draggable from 'react-draggable';

import { useSelector } from 'react-redux';

import SignIn from '../sign_in';
import SignUp from '../sign_up';

const Login = () => {
    const msnScreen = useSelector((state) => state.msnScreen.value);
    const isScreenMinimized = useSelector((state) => state.msnScreen.minimized);
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);
    
    const signUpScreen = useSelector((state) => state.component.sign_up);
    const logInScreen = useSelector((state) => state.component.sign_in);
    
    return (
        <>
            {
                (isScreenMinimized == false && isScreenMaximized == false && msnScreen == true) &&
                <Draggable>
                    <div>
                        { (logInScreen) && <SignIn /> }
                        { (signUpScreen) && <SignUp /> }
                    </div>
                </Draggable>
            }
                    
            { 
                (isScreenMinimized == false && isScreenMaximized == true && msnScreen == true) && 
                <>
                    { (logInScreen) && <SignIn /> }
                    { (signUpScreen) && <SignUp /> }
                </>
            }
        </>
    )
}

export default Login;