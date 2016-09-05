// React Dependencies
import React, {Component, PropTypes} from 'react';
import {Well} from 'react-bootstrap';
import {composeWithTracker} from 'react-komposer';
// App Dependencies
import PostView from '../components/PostView.jsx';
import CommentForm from '../components/CommentForm.jsx';
import CommentsListContainer from '../containers/CommentsListContainer.jsx';

export default class PostPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PostView post={this.props.post} currentUser={this.props.currentUser}/>
                {this.props.currentUser ?
                    <CommentForm postId={this.props.postId}/> :
                    <Well>Please login or register to leave a comment</Well>
                }
                <CommentsListContainer postId={this.props.postId}/>
            </div>
        );
    }
}

PostPage.propTypes = {
    postId: PropTypes.string.isRequired,
    post: PropTypes.object,
    currentUser: PropTypes.object
};