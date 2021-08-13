import React from 'react';

import MinimizeBtn from '../../../../assets/images/icons/minimize_btn.png';
import MaximizeBtn from '../../../../assets/images/icons/maximize_btn.png';
import CloseBtn from '../../../../assets/images/icons/close_btn.png';

import { close, minimize, maximize, close_maximize } from '../../../store/modules/msn_screen';
import { close_components_state } from '../../../store/modules/components';

import { useDispatch, useSelector } from 'react-redux';

const ScreenHeader = (props) => {
    const dispatch = useDispatch();

    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);
    const user = useSelector((state) => state.user.value);

    function handleClose() {
        dispatch(close());
        dispatch(close_components_state());
    }

    return (
        <div className={`header ${user != undefined && 'logged_header' }`}>
            <div className="float-start">
                <img src={props.icon} alt="Msn Icon" />
                <span className="pl-2">{props.phrase}</span>
            </div>

            <div className="buttons">
                <div className="d-inline">
                    <img src={MinimizeBtn} alt="Minimize Button" onClick={() => dispatch(minimize())} />
                </div>

                <div className="d-inline">
                    <img src={MaximizeBtn} alt="Maximize Button" onClick={() => {isScreenMaximized ? dispatch(close_maximize()) : dispatch(maximize())} } />
                </div>

                <div className="d-inline">
                    <img src={CloseBtn} alt="Close Button" onClick={() => handleClose()} />
                </div>
            </div>
        </div>
    )
}

export default ScreenHeader;