import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Well, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();
        const content = ReactDOM.findDOMNode(this.refs.content).value;
        const data = {
            postId: this.props.postId,
            content: content
        };
        Meteor.call('comments.create', data);
        ReactDOM.findDOMNode(this.refs.content).value = "";
    }

    render() {
        return (
            <Well>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup controlId="commentForm">
                        <ControlLabel>Leave a Comment:</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="textarea" rows="3" ref="content"/>
                    </FormGroup>
                    <Button type="submit" className="btn btn-primary">Submit</Button>
                </form>
            </Well>
        );
    }
}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired
};