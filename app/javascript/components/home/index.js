import React from 'react';

import Footer from '../footer/index';
import MsnIcon from '../msnIcon/index';
import LoginScreen from '../loginScreen/index';

const Home = () => {
    return (
        <div>
            <MsnIcon />
            <LoginScreen />
            <Footer />
        </div>
    )
}

export default Home;