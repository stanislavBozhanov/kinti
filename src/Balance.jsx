import React from 'react';

export default class Balance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            walletBalance: 0,
            monthBalance: 0,
        }
    }

    render() {
        return <div>
            <span>Wallet Balance:</span>
            <span>Month Balance:</span>
        </div>;
    }
}
