import React from 'react';

import Draggable from 'react-draggable';

import { useSelector } from 'react-redux';

import Screen from './screen';

const LoginScreen = () => {
    const msnScreen = useSelector((state) => state.msnScreen.value);
    const isScreenMinimized = useSelector((state) => state.msnScreen.minimized);
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);
    
    return (
        <>
            {
                (msnScreen == true && isScreenMinimized == false && isScreenMaximized == false) &&
                <Draggable>
                    <div>
                        <Screen />
                    </div>
                </Draggable>
            }
                    
            { (msnScreen == true && isScreenMinimized == false && isScreenMaximized == true) && <Screen /> }
        </>
    )
}

export default LoginScreen;