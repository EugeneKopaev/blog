import {FlowRouter} from 'meteor/kadira:flow-router';

// React Dependencies
import React from 'react';
import {mount} from 'react-mounter';

// App Components
import AppContainer from '/imports/ui/containers/AppContainer.jsx';
import PostListPageContainer from '/imports/ui/containers/PostListPageContainer.jsx';
import EditPostPageContainer from "/imports/ui/containers/EditPostPageContainer.jsx";
import PostPageContainer from '/imports/ui/containers/PostPageContainer.jsx';

FlowRouter.route('/', {
    name: 'root',
    action() {
        mount(AppContainer, {
            content: <PostListPageContainer/>
        });
    },
});

FlowRouter.route('/search', {
    name: 'search',
    action(params, queryParams) {
        mount(AppContainer, {
            content: <PostListPageContainer queryParams={queryParams}/>
        });
    },
});

FlowRouter.route('/new', {
    name: 'newPost',
    action() {
        mount(AppContainer, {
            content: <EditPostPageContainer/>
        });
    },
});

FlowRouter.route('/edit/:postId', {
    name: 'editPost',
    action(params) {
        mount(AppContainer, {
            content: <EditPostPageContainer postId={params.postId}/>
        });
    },
});

FlowRouter.route('/view/:postId', {
    name: 'viewPost',
    action(params) {
        mount(AppContainer, {
            content: <PostPageContainer postId={params.postId}/>
        });
    },
});