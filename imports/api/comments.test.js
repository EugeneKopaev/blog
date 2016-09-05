/* eslint-env mocha */

import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'meteor/practicalmeteor:chai';
import {Accounts} from 'meteor/accounts-base';

import {Posts} from './posts.js';
import {Comments} from './comments.js';

if (Meteor.isServer) {
    describe('Comments', () => {
        describe('methods', () => {
            let userId;
            const testUser = {
                username: 'Test user',
                email: 'test@mail.com',
                password: 'Test pass',
                profile: {
                    name: 'Test user'
                }
            };

            before(() => {
                Accounts.users.remove({});
                Accounts.createUser(testUser);
                userId = Accounts.users.findOne({username: testUser.username})._id;
            });

            beforeEach(() => {
                Posts.remove({});
                Comments.remove({});
            });

            after(() => {
                Accounts.users.remove({});
                Posts.remove({});
                Comments.remove({});
            });

            it('should insert new comment', () => {
                // Test stub
                const testPost = {
                    authorId: userId,
                    authorName: 'Test user',
                    title: 'Title',
                    created: new Date().toISOString(),
                    updated: new Date().toISOString(),
                    tags: [],
                    content: 'Post content',
                    comments: []
                };

                const insertedPostId = Posts.insert(testPost);

                const comment = {
                    postId: insertedPostId,
                    content: 'Test comment'
                };

                const createComment = Meteor.server.method_handlers['comments.create'];

                // Verify that not logged in user can't create comment
                createComment.arguments = [comment];
                assert.throws(createComment, Meteor.Error, '[not-authorized]');
                assert.equal(Comments.find().count(), 0);

                // Verify that logged in user can create comment
                const createdCommentId = createComment.apply({userId}, [comment])._id;
                assert.equal(Comments.find().count(), 1);

                const createdComment = Comments.findOne({_id: createdCommentId});
                const updatedPost = Posts.findOne({_id: createdComment.postId});

                assert.equal(updatedPost.comments, createdCommentId);
                assert.equal(createdComment.postId, comment.postId);
                assert.equal(createdComment.content, comment.content);
            });

        });
    });
}
