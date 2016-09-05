import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Well, InputGroup, FormControl, Button, Glyphicon} from 'react-bootstrap';

export default class PostSearch extends Component {
    constructor(props) {
        super(props);
    }

    handleSearch() {
        const postTitle = ReactDOM.findDOMNode(this.refs.search).value.trim();
        if (postTitle !== '') {
            FlowRouter.go(FlowRouter.path('/search', null, {title: postTitle}));
        }
    }

    render() {
        return (
            <Well>
                <h4>Blog Search</h4>
                <InputGroup>
                    <FormControl type="text" ref="search"/>
                    <InputGroup.Button>
                        <Button className="btn btn-default" onClick={this.handleSearch.bind(this)}>
                            <Glyphicon glyph="search"/>
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
            </Well>
        );
    }
}