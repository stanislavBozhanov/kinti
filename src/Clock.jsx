import React from 'react';


export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() =>
            this.tick(), 1000
        )
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                Clock: {this.state.date.toLocaleTimeString()}
            </div>
        )
    }
}
