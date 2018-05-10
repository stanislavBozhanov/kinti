import React from 'react';

export default class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
    }
  }

  componentWillMount() {
    // get info from DB and put it here
  }

  render() {
    return <span>Wallet Balance: {this.state.balance}</span>
  }
}
