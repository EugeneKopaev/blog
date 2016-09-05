import {Meteor} from 'meteor/meteor';

// React Dependencies
import {composeWithTracker} from 'react-komposer';
// App Dependencies
import App from '../layouts/App.jsx';

export default composeWithTracker((props, onData) => {
    const currentUser = Meteor.user();
    if (typeof currentUser !== 'undefined') {
        currentUser === null ?
            onData(null, {}) :
            onData(null, {currentUser: currentUser});
    }
})(App);