import {Meteor} from 'meteor/meteor';

// React Dependencies
import {composeWithTracker} from 'react-komposer';
// App Dependencies
import {Posts} from '../../api/posts.js';
import PostListPage from '../pages/PostListPage.jsx';

export default composeWithTracker((props, onData) => {
    let handle;
    const queryParams = props.queryParams;
    if (queryParams) {
        const author = queryParams.author;
        const title = queryParams.title;
        if (author) {
            handle = Meteor.subscribe('publicationsByAuthor', author).ready();
        }
        if (title) {
            handle = Meteor.subscribe('publicationsByTitle', title).ready();
        }
    } else {
        handle = Meteor.subscribe('publications').ready();
    }
    if (handle) {
        const posts = Posts.find().fetch();
        onData(null, {posts});
    }
})(PostListPage);