import React, { useEffect, useState } from 'react';
import IconWindowsXp from '../../../assets/images/icon_win_xp.png';

import Menu from '../menu';

import DesktopMsnImage from '../../../assets/images/icons/desktop_icon.png';

import { useDispatch, useSelector } from 'react-redux';
import { open_minimized } from '../../store/modules/msn_screen';

const Footer = () => {
    const [menuState, setMenuState] = useState(false);
    let [currentTime, setcurrentTime] = useState('');

    const is_msn_minimized = useSelector((state) => state.msnScreen.minimized);
    const dispatch = useDispatch();

    function makeTwoDigits(time) {
        const timeString = `${time}`;
        
        if (timeString.length === 2) return time

        return `0${time}`
    }

    useEffect(() => {
        setInterval(function(){
            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();

            let hours_and_minutes = `${makeTwoDigits(hours)}:${makeTwoDigits(minutes)}`
            setcurrentTime(hours_and_minutes)
        }, 1000);
    });
    

    return (
        <footer>
            {menuState && <Menu />}

            <div className="fixed-bottom windows_footer">
                <div className="float-start menu-button" onClick={() => setMenuState(menuState ? false : true)}>
                    <img src={IconWindowsXp} alt="Icon Windows XP" />
                    <span className="ps-2 pe-2">menu</span>
                </div>

                {
                    (is_msn_minimized) &&
                    <div className="msn_minimized">
                        <img src={DesktopMsnImage} alt="MSN Icon" onClick={() => dispatch(open_minimized())} />
                    </div>
                    }

                <div className="float-end clock-div">
                    <span className="p-3">{currentTime}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;