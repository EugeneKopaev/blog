import {Meteor} from 'meteor/meteor';
// React Dependencies
import {composeWithTracker} from 'react-komposer';
// App Dependencies
import {Posts} from '../../api/posts';
import {Comments} from '../../api/comments';
import PostPage from '../pages/PostPage.jsx';

export default composeWithTracker((props, onData) => {
    const currentUser = Meteor.user();
    const handlePost = Meteor.subscribe('singlePost', props.postId).ready();
    const handleComments = Meteor.subscribe('commentsByPost', props.postId).ready();
    if (typeof currentUser !== "undefined" && handlePost && handleComments) {
        const post = Posts.find().fetch()[0];
        const comments = Comments.find().fetch();
        currentUser === null ?
            onData(null, {post, comments}) :
            onData(null, {currentUser, post, comments});
    }
})(PostPage);