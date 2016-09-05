// React Dependencies
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Grid, Row, Col} from 'react-bootstrap';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import PostSearch from '../components/PostSearch.jsx';
import TagsList from '../components/TagsList.jsx';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header currentUser={this.props.currentUser}/>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={4} mdPush={8}>
                            <PostSearch/>
                            <TagsList/>
                        </Col>
                        <Col xs={12} md={8} mdPull={4}>
                            {this.props.content}
                        </Col>
                    </Row>
                </Grid>
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {
    content: PropTypes.object.isRequired,
    currentUser: PropTypes.object
};
