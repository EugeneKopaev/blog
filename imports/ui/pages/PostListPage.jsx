// React Dependencies
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {composeWithTracker} from 'react-komposer';
import {Glyphicon, Image} from 'react-bootstrap';

export default class PostListPage extends Component {
    constructor(props) {
        super(props);
    }

    modifiedTime(post) {
        const updated = post.updated;
        const created = post.created;
        return updated ? "Modified on " + updated : "Posted on " + created;
    }

    renderList() {
        return this.props.posts.map((post) => {
            return (
                <div key={post._id}>
                    <h1><a href={FlowRouter.path("viewPost", {postId: post._id})}>{post.title}</a></h1>
                    <p className="lead">by {post.authorName}</p>
                    <p>
                        <Glyphicon glyph="time"/> {this.modifiedTime(post)}
                    </p>
                    <Image src="http://placehold.it/900x300" responsive/>
                </div>
            );
        })
    }

    render() {
        return (
            <div>
                {this.renderList()}
                <br/>
            </div>
        );
    }
}

PostListPage.propTypes = {
    queryParams: PropTypes.object,
    posts: PropTypes.array
};


