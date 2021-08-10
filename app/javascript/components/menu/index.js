import React from 'react';
import Photo from '../../../assets/images/photo_menu.png';

const menu = () => {
    return (
        <div className="menu">
            <div className="header pt-1">
                <img src={Photo} alt="Perfil Photo" />
                
                <span className="ps-3">Seu-PC</span>
            </div>
        </div>
    )
}

export default menu;