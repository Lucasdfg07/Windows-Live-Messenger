import React from 'react';

import MinimizeBtn from '../../../../assets/images/icons/minimize_btn.png';
import MaximizeBtn from '../../../../assets/images/icons/maximize_btn.png';
import CloseBtn from '../../../../assets/images/icons/close_btn.png';

import { close, minimize, maximize, close_maximize } from '../../../store/modules/msn_screen';
import { useDispatch, useSelector } from 'react-redux';

const ScreenHeader = (props) => {
    const dispatch = useDispatch();

    const isScreenMaximized = useSelector((state) => state.msnScreen.maximized);

    return (
        <div className="header">
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
                    <img src={CloseBtn} alt="Close Button" onClick={() => dispatch(close())} />
                </div>
            </div>
        </div>
    )
}

export default ScreenHeader;