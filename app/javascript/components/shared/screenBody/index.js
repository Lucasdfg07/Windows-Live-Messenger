import React from 'react';
import { useSelector } from 'react-redux';

const ScreenBody = ({children}) => {
    const user = useSelector((state) => state.user.value);

    return (
        <div className={`body ${user != undefined && 'logged_body' }`}>
            {children}
        </div>
    )
}

export default ScreenBody;