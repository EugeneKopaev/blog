import React, {Component, PropTypes} from 'react';
import {ButtonToolbar, ButtonGroup, Glyphicon, Button, Modal} from 'react-bootstrap';

export default class PostControlButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
    }

    openModal() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    handleDelete() {
        Meteor.call('posts.remove', this.props.postId, (error) => {
            if (!error) {
                FlowRouter.go('/');
            }
        });
    }

    render() {
        return (
            <div>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button href={FlowRouter.path("editPost", {postId: this.props.postId})}>
                            <Glyphicon glyph="pencil"/>
                        </Button>
                        <Button onClick={this.openModal.bind(this)}><Glyphicon glyph="trash"/></Button>
                    </ButtonGroup>
                </ButtonToolbar>

                <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You are about to delete this post.</p>
                        <p>Do you want to proceed?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.handleDelete.bind(this)}>Delete</Button>
                        <Button onClick={this.closeModal.bind(this)}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

PostControlButtons.propTypes = {
    postId: PropTypes.string.isRequired
};