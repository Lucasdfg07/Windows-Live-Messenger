import React, { useEffect, useState } from 'react';

import ScreenBody from '../shared/screenBody';
import ScreenHeader from '../shared/screenHeader';

import MsnIcon from '../../../assets/images/icons/screen_msn_icon.png';
import BackgroundMsnIcon from '../../../assets/images/messenger_background.png';
import MsnBanner from '../../../assets/images/logged_msn_logo.png';

import UsersService from '../../services/users';

import { useDispatch, useSelector } from 'react-redux';

import { sign_in, sign_out } from '../../store/modules/user';
import {list_user_screen_state, chat_screen_state} from '../../store/modules/components';

import uploadImage from '../../../assets/images/upload.png';

const UserList = (props) => {
    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [offlineUsers, setOfflineUsers] = useState([]);

    const [status, setStatus] = useState(handleStatus(props.user.status));
    const [name, setName] = useState(props.user.name);
    const [description, setDescription] = useState(props.user.description);
    const [photo, setPhoto] = useState(props.user.photo);

    const [showPhotoDiv, setShowPhotoDiv] = useState(false);
    const [onlineCollapse, setOnlineCollapse] = useState(false);
    const [offlineCollapse, setOfflineCollapse] = useState(false);

    const dispatch = useDispatch();

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

    function handleUpload(file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            setPhoto(reader.result)
        }

        reader.readAsDataURL(file)
    }

    async function handleSubmit() {
        const user_hash = {
            "user": {
                "name": name,
                "description": description,
                "status": Number(status),
                "photo": photo
            }
        }

        const response = await UsersService.update(props.user.id, user_hash)

        if(response.data.status == 200)
            dispatch(sign_in(response.data.user));
    }

    function handleStatus(val) {
        if(val == "available")
            return 0

        if(val == "occupied")
            return 1

        if(val == "away")
            return 2

        if(val == "invisible")
            return 3
    }

    function redirectToChat(target_user) {
        dispatch(list_user_screen_state());
        dispatch(chat_screen_state(target_user));
    }

    useEffect(() => {
        handleUsers()
    }, [])

    useEffect(() => {
        handleSubmit()
    }, [name, description, status, photo])

    return (
        <div className={`${isScreenMaximized && 'maximized_screen'} screen`}>
            <ScreenHeader phrase="Windows Live Messenger" icon={MsnIcon} />

            <ScreenBody>
                <div className="logged">
                    <div className="float-end sign_out">
                        <span onClick={() => dispatch(sign_out())}>Sair</span>
                    </div>

                    <div className="p-3">
                        <div className="photo_div" 
                            onMouseOver={() => setShowPhotoDiv(true)}
                            onMouseLeave={() => setShowPhotoDiv(false)}>
                                
                            { (showPhotoDiv) &&
                                <div className="input_change">
                                    <label className="w-100">
                                        <img src={uploadImage} alt="Upload Icon" />
                                        <input type="file" 
                                                id="avatar" 
                                                accept="image/png, image/jpeg"
                                                onChange={e => handleUpload(e.target.files[0])} />
                                    </label>
                                </div>
                            }

                            <img src={props.user.photo} alt="User Photo" className="user_photo" />
                        </div>

                        <div className="user_info ms-3 mt-2">
                            <strong>
                                <span className="input" 
                                    onBlur={e => setName(e.target.innerText)} 
                                    role="textbox" 
                                    contentEditable>{name}</span>
                            </strong>

                            <select onChange={e => setStatus(e.target.value)}>
                                <option value="0" selected={handleStatus(props.user.status) == 0}>(Disponível)</option>
                                <option value="1" selected={handleStatus(props.user.status) == 1}>(Ocupado)</option>
                                <option value="2" selected={handleStatus(props.user.status) == 2}>(Ausente)</option>
                                <option value="3" selected={handleStatus(props.user.status) == 3}>(Invisível)</option>
                            </select>
                            

                            <div className="mt-3">
                                {console.log(props)}
                                <span className="input" 
                                        onBlur={e => setDescription(e.target.innerText)} 
                                        role="textbox" 
                                        contentEditable>{description != undefined ? description : '<Escreva uma mensagem pessoal>'}</span>
                            </div>
                        </div>

                        <div className="footer_background"></div>
                    </div>

                    <div className="users p-3">
                        <div className="checkbox mb-3">
                            <span className="status" onClick={() => setOnlineCollapse(!onlineCollapse)}>{onlineCollapse ? '-' : '+'}</span>
                            <b className="ms-2">Disponível ({onlineUsers.length})</b>
                        </div>
                        
                        {
                            (onlineCollapse == false) &&
                            <>
                                { onlineUsers.map
                                    (function(user, index) {
                                        return (
                                            <div className="users_list" key={index}>
                                                <div className="d-inline">
                                                    <img src={`/status/${normalizeString(user.status)}.png`} alt={`${user.status} icon`} />
                                                </div>

                                                <div className="d-inline target" onClick={() => redirectToChat(user)}>
                                                    {user.name} ({user.status})
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        }

                        <div className="checkbox mb-3 mt-4">
                            <span className="status" onClick={() => setOfflineCollapse(!offlineCollapse)}>{offlineCollapse ? '-' : '+'}</span>
                            <b className="ms-2">Offline ({offlineUsers.length})</b>
                        </div>
                        
                        {
                            (offlineCollapse == false) &&
                            <>
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
                            </>
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