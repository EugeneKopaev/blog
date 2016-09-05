import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Media} from 'react-bootstrap';

export default class CommentView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Media>
                    <Media.Left>
                        <img width={64} height={64} src="http://placehold.it/64x64" alt="Avatar"/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>
                            by {this.props.comment.authorName} on
                            <small> {this.props.comment.created}</small>
                        </Media.Heading>
                        <p>{this.props.comment.content}</p>
                    </Media.Body>
                </Media>
                <hr/>
            </div>
        );
    }
}

CommentView.propTypes = {
    comment: PropTypes.object.isRequired,
};