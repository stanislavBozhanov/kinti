import React from 'react';
import {AppContainer} from 'react-hot-loader';
import Balance from './Balance.jsx';
import Clock from './Clock.jsx';


export default function() {
    return <AppContainer>
        <div>
            <Balance />
            <Clock />
        </div>
    </AppContainer>;
};
