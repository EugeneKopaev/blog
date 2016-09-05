import React, {Component, PropTypes} from 'react';
import CommentView from '../components/CommentView.jsx';

export default class CommentsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.comments.map((comment) => {
                    return (
                        <CommentView comment={comment} key={comment._id}/>
                    );
                })}
            </div>
        );
    }
}

CommentsList.propTypes = {
    postId: PropTypes.string.isRequired,
    comments: PropTypes.array
};