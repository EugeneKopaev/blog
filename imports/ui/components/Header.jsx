import React, {Component, PropTypes} from 'react';
import {composeWithTracker} from 'react-komposer';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import AccountsUIWrapper from '../components/AccountsUIWrapper.jsx';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    renderPostButtons() {
        const currentUser = this.props.currentUser;
        if (currentUser) {
            return (
                <Nav>
                    <NavItem eventKey={1} href={FlowRouter.path("/search", null, {author: currentUser._id})}>
                        My publications
                    </NavItem>
                    <NavItem eventKey={2} href={FlowRouter.path("/new")}>Add new post</NavItem>
                </Nav>
            );
        }
        return "";
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href={FlowRouter.path("/")}>Home</a>
                    </Navbar.Brand>
                </Navbar.Header>
                {this.renderPostButtons()}
                <Nav pullRight>
                    <AccountsUIWrapper/>
                </Nav>
            </Navbar>
        );
    }
}

Header.propTypes = {
    currentUser: PropTypes.object
};
