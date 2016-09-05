import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Image, Glyphicon} from 'react-bootstrap';

import PostControlButtons from '../components/PostControlButtons.jsx';

export default class PostView extends Component {
    constructor(props) {
        super(props);
    }

    renderControlButtons() {
        if (this.props.currentUser && this.props.currentUser._id === this.props.post.authorId) {
            return (
                <PostControlButtons postId={this.props.post._id}/>
            );
        } else {
            return "";
        }
    }

    modifiedTime() {
        const updated = this.props.post.updated;
        const created = this.props.post.created;
        return updated ? "Modified on " + updated : "Posted on " + created;
    }

    render() {
        return (
            <div>
                <h1>{this.props.post.title}</h1>
                <p className="lead">by {this.props.post.authorName}</p>
                <p>
                    <Glyphicon glyph="time"/> {this.modifiedTime()}
                </p>
                {this.renderControlButtons()}
                <hr/>
                <Image src="http://placehold.it/900x300" responsive/>
                <hr/>
                <p>{this.props.post.content}</p>
                <hr/>
            </div>
        );
    }
}

PostView.propTypes = {
    currentUser: PropTypes.object,
    post: PropTypes.object.isRequired,
};