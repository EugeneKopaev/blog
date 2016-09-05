import {Meteor} from 'meteor/meteor';
// React Dependencies
import {composeWithTracker} from 'react-komposer';
// App Dependencies
import {Comments} from '../../api/comments';
import CommentsList from '../components/CommentsList.jsx';

export default composeWithTracker((props, onData) => {
    const handleComments = Meteor.subscribe('commentsByPost', props.postId).ready();
    if (handleComments) {
        const comments = Comments.find().fetch();
        onData(null, {comments});
    }
})(CommentsList);