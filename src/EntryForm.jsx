import React from 'react';


class EntryForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.props.onSubmit(data);
  }

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="value"/>

        <label htmlFor="value">Value: </label>
        <input type="number" name="value" id="value" step="0.01" min="0" required/>

        <label htmlFor="date">Date: </label>
        <input type="date" name="date" id="date"/>

        <input type="submit" value="Submit"/>
      </form>
    );
  }
}