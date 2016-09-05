// React Dependencies
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import PostForm from "../components/PostForm.jsx";

export default class EditPostPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PostForm post={this.props.post}/>
        );
    }
}

EditPostPage.propTypes = {
    postId: PropTypes.string
};


