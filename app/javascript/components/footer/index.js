import React, { useEffect, useState } from 'react';
import IconWindowsXp from '../../../assets/images/icon_win_xp.png';

import Menu from '../menu';

const Footer = () => {
    const [menuState, setMenuState] = useState(false);
    let [currentTime, setcurrentTime] = useState('');
    
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    function makeTwoDigits(time) {
        const timeString = `${time}`;
        
        if (timeString.length === 2) return time

        return `0${time}`
    }

    useEffect(() => {
        setInterval(function(){
            setcurrentTime(`${makeTwoDigits(hours)}:${makeTwoDigits(minutes)}`)
        }, 1000);
    });
    

    return (
        <div>
            {menuState && <Menu />}

            <div className="fixed-bottom windows_footer">
                <div className="float-start menu-button" onClick={() => setMenuState(menuState ? false : true)}>
                    <img src={IconWindowsXp} />
                    <span className="ps-2 pe-2">menu</span>
                </div>

                <div className="float-end clock-div">
                    <span className="p-3">{currentTime}</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;