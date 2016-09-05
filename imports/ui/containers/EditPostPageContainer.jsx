import {Meteor} from 'meteor/meteor';

// React Dependencies

import {composeWithTracker} from 'react-komposer';
// App Dependencies
import {Posts} from '../../api/posts.js';
import EditPostPage from '../pages/EditPostPage.jsx';

export default composeWithTracker((props, onData) => {
    const postId = props.postId;
    if (postId) {
        const handle = Meteor.subscribe('singlePost', postId).ready();
        if (handle) {
            const post = Posts.find().fetch()[0];
            onData(null, {post})
        }
    } else {
        onData(null, {});
    }
})(EditPostPage);