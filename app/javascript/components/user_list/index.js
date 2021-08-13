import React, { useEffect, useState } from 'react';

import ScreenBody from '../shared/screenBody';
import ScreenHeader from '../shared/screenHeader';

import MsnIcon from '../../../assets/images/icons/screen_msn_icon.png';
import BackgroundMsnIcon from '../../../assets/images/messenger_background.png';
import MsnBanner from '../../../assets/images/logged_msn_logo.png';

import UsersService from '../../services/users';

import { useSelector } from 'react-redux';

const UserList = (props) => {
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [offlineUsers, setOfflineUsers] = useState([]);

    async function handleUsers() {
        const response = await UsersService.index(props.user.id);
        setOnlineUsers(response.data.online);
        setOfflineUsers(response.data.offline);
    }

    function normalizeString(string) {
        return string.toLowerCase()
                    .normalize("NFD")
                    .replace(/\p{Diacritic}/gu, "")
    }

    useEffect(() => {
        handleUsers()
    }, [])

    return (
        <div className={`${isScreenMaximized && 'maximized_screen'} screen`}>
            <ScreenHeader phrase="Windows Live Messenger" icon={MsnIcon} />

            <ScreenBody>
                <div className="logged">
                    <div className="p-3">
                        <div className="photo_div">
                            <img src={props.user.photo} alt="User Photo" className="user_photo" />
                        </div>

                        <div className="user_info ms-3 mt-2">
                            <b>{props.user.name}</b>

                            <div className="mt-3">
                                <span>{props.user.description != '' ? props.user.description : '<Escreva uma mensagem pessoal>'}</span>
                            </div>
                        </div>

                        <div className="footer_background"></div>
                    </div>

                    <div className="users p-3">
                        <div className="checkbox mb-3">
                            <span className="status">+</span>
                            <b className="ms-2">Disponível ({onlineUsers.length})</b>
                        </div>

                        { onlineUsers.map
                            (function(user, index) {
                                return (
                                    <div className="users_list" key={index}>
                                        <div className="d-inline">
                                            <img src={`/status/${normalizeString(user.status)}.png`} alt={`${user.status} icon`} />
                                        </div>

                                        <div className="d-inline">
                                            {user.name} ({user.status})
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div className="checkbox mb-3 mt-4">
                            <span className="status">+</span>
                            <b className="ms-2">Offline ({offlineUsers.length})</b>
                        </div>

                        { offlineUsers.map
                            (function(user, index) {
                                return (
                                    <div className="users_list" key={index}>
                                        <div className="d-inline">
                                            <img src={`/status/${normalizeString(user.status)}.png`} alt={`${user.status} icon`} />
                                        </div>

                                        <div className="d-inline">
                                            {user.name} ({user.status})
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div className="text-center m-3">
                            <img src={MsnBanner} alt="Msn Banner" />
                        </div>
                    </div>

                    <img src={BackgroundMsnIcon} className="background_image" />
                </div>
            </ScreenBody>
        </div>
    )
}

export default UserList;