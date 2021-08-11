import React from 'react';

import { useDispatch } from 'react-redux';
import { open } from '../../store/modules/msn_screen';
import { sign_in_screen_state } from '../../store/modules/components';

import DesktopMsnImage from '../../../assets/images/icons/desktop_icon.png';

const MsnIcon = () => {
    const dispatch = useDispatch();

    function dispatchTriggers() {
        dispatch(open());
        dispatch(sign_in_screen_state());
    }

    return (
        <div className="container mt-4">
            <div className="desktop_icon" onClick={() => dispatchTriggers()}>
                <img src={DesktopMsnImage} alt="Desktop Image" /> <br />
                <span>Windows Live Messenger</span>
            </div>
        </div>
    )
}

export default MsnIcon;