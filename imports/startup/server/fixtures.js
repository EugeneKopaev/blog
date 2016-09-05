import { Meteor } from 'meteor/meteor';
import {Posts} from '../../api/posts.js';
import {Comments} from '../../api/comments.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    // Create test users if they do not exist
    let testUserBobId;
    if (!Meteor.users.findOne({username: 'Bob'})) {
        testUserBobId = Accounts.createUser({
            username: 'Bob',
            email: 'bob@example.com',
            password: '123456',
        });
    }
    let testUserJohnId;
    if (!Meteor.users.findOne({username: 'John'})) {
        testUserJohnId = Accounts.createUser({
            username: 'John',
            email: 'john@example.com',
            password: '123456',
        });
    }

    if (Posts.find().count() === 0) {
        const posts = [
            {
                authorId: testUserBobId,
                authorName: "Bob",
                title: "Cool title",
                created: new Date().toISOString(),
                updated: new Date().toISOString(),
                tags: [],
                content: "Cool post content",
                comments: []
            },
            {
                authorId: testUserBobId,
                authorName: "Bob",
                title: "Another cool title",
                created: new Date().toISOString(),
                updated: new Date().toISOString(),
                tags: [],
                content: "Another cool post content",
                comments: []
            },
            {
                authorId: testUserJohnId,
                authorName: "John",
                title: "One more post",
                created: new Date().toISOString(),
                tags: [],
                content: "One more post content",
                comments: []
            },
            {
                authorId: testUserJohnId,
                authorName: "John",
                title: "And another one post",
                created: new Date().toISOString(),
                tags: [],
                content: "And another one post content",
                comments: []
            }
        ];

        const comments = [
            {
                authorId: testUserBobId,
                authorName: 'Bob',
                created: new Date().toISOString(),
                content: "Test comment"
            },
            {
                authorId: testUserBobId,
                authorName: 'Bob',
                created: new Date().toISOString(),
                content: "Another test comment"
            },
            {
                authorId: testUserJohnId,
                authorName: 'John',
                created: new Date().toISOString(),
                content: "One more test comment"
            },
            {
                authorId: testUserJohnId,
                authorName: 'John',
                created: new Date().toISOString(),
                content: "Also test comment"
            }
        ];

        const postsIdList = [];

        posts.forEach((post) => {
            postsIdList.push(Posts.insert(post));
        });

        postsIdList.forEach((postId) => {

            const commentsList = comments.map((comment) => {
                comment.postId = postId;
                return comment;
            });

            commentsList.forEach((comment) => {

                const commentId = Comments.insert(comment);

                Posts.update(postId, {
                    $addToSet: {
                        comments: commentId
                    }
                });
            })
        });
    }
});
