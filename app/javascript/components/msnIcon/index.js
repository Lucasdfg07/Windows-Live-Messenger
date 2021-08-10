import React from 'react';

import { useDispatch } from 'react-redux';
import { open } from '../../store/modules/msn_screen';

import DesktopMsnImage from '../../../assets/images/icons/desktop_icon.png';

const MsnIcon = () => {
    const dispatch = useDispatch();

    return (
        <div className="container mt-4">
            <div className="desktop_icon" onClick={() => dispatch(open())}>
                <img src={DesktopMsnImage} alt="Desktop Image" /> <br />
                <span>Windows Live Messenger</span>
            </div>
        </div>
    )
}

export default MsnIcon;