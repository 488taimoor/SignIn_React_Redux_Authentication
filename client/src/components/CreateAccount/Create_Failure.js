import React, { Component } from 'react';


class CreateFailure extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(event) {
        this.props.handleBackClick();
    }
    render() {

        return (
            <div>
                <h1> Something went wrong ,please try again</h1>
                <button onClick={this.handleClick}>Back</button>
            </div>
        );
    }
}

export default CreateFailure;
