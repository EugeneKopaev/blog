import React, {Component} from 'react';
import {Row, Col, Well} from 'react-bootstrap';

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Well>
                <footer>
                    <Row>
                        <Col lg={12}>
                            <p className="text-center">Copyright &copy; Your Website 2014</p>
                        </Col>
                    </Row>
                </footer>
            </Well>
        );
    }
}