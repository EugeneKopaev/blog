import { Meteor } from 'meteor/meteor';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Well, FormGroup, FormControl, Button} from 'react-bootstrap';
import {FlowRouter} from 'meteor/kadira:flow-router';

export default class PostFrom extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const post = this.props.post;
        if (post) {
            ReactDOM.findDOMNode(this.refs.title).value = post.title;
            ReactDOM.findDOMNode(this.refs.content).value = post.content;
        }
    }

    createNewPost(data) {
        Meteor.call('posts.create', data, (error, result) => {
            if (!error) {
                FlowRouter.go(FlowRouter.path('viewPost', {postId: result._id}));
            }
        });
    }

    updatePost(postId, data) {
        Meteor.call('posts.update', postId, data, (error) => {
            if (!error) {
                FlowRouter.go(FlowRouter.path('viewPost', {postId: postId}));
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
        const content = ReactDOM.findDOMNode(this.refs.content).value;
        const data = {
            title: title,
            content: content,
        };
        const post = this.props.post;
        if (post) {
            this.updatePost(post._id, data);
        } else {
            this.createNewPost(data);
        }
    }

    render() {
        return (
            <Well>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup controlId="commentForm">
                        <FormControl type="Title"
                                     placeholder="Title?"
                                     ref="title"/>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                        <FormControl componentClass="textarea"
                                     placeholder="textarea"
                                     rows="30"
                                     ref="content"/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </FormGroup>
                </form>
            </Well>
        );
    }
}