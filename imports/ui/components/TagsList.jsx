import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

export default class BlogSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Well>
                <h4>Tags</h4>
                <ul className="list-unstyled">
                    <li><a href="#">#tag</a>
                    </li>
                    <li><a href="#">#tag</a>
                    </li>
                    <li><a href="#">#tag</a>
                    </li>
                    <li><a href="#">#tag</a>
                    </li>
                </ul>
            </Well>
        );
    }
}