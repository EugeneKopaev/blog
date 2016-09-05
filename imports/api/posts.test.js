/* eslint-env mocha */

import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'meteor/practicalmeteor:chai';
import {Accounts} from 'meteor/accounts-base';

import {Posts} from './posts.js';
import {Comments} from './comments.js';

if (Meteor.isServer) {
    describe('Posts', () => {
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

            it('should insert new post', () => {
                const insertPost = Meteor.server.method_handlers['posts.create'];
                const post = {
                    title: 'Title',
                    content: 'Content'
                };

                // Verify that not logged in user can't create post
                insertPost.arguments = [post];
                assert.throws(insertPost, Meteor.Error, '[not-authorized]');
                assert.equal(Posts.find().count(), 0);

                // Verify that logged in user can create post
                // Run the method with `this` set to the fake invocation
                const createdPostId = insertPost.apply({userId}, [post])._id;

                assert.equal(Posts.find().count(), 1);

                const createdPost = Posts.findOne({_id: createdPostId});

                assert.equal(createdPost.title, post.title);
                assert.equal(createdPost.content, post.content);
            });

            it('should remove only owned post', () => {
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

                const testComment = {
                    postId: insertedPostId,
                    authorId: userId,
                    authorName: 'Test user',
                    created: new Date().toISOString(),
                    content: 'Test comment',
                };
                const anotherTestComment = {
                    postId: insertedPostId,
                    authorId: userId,
                    authorName: 'Test user',
                    created: new Date().toISOString(),
                    content: 'Another Test comment',
                };
                Comments.insert(testComment);
                Comments.insert(anotherTestComment);
                Posts.update(insertedPostId, {
                    $addToSet: {
                        comments: testComment, anotherTestComment
                    }
                });
                /////////////////////////////////////////////////////////

                const removePost = Meteor.server.method_handlers['posts.remove'];

                // Verify that user can't delete not owned post
                removePost.arguments = [insertedPostId];

                assert.throws(removePost, Meteor.Error, '[not-authorized]');
                assert.equal(Posts.find().count(), 1);
                assert.equal(Comments.find().count(), 2);

                // Verify that user can delete owned post
                removePost.apply({userId}, [insertedPostId]);
                assert.equal(Posts.find().count(), 0);
                assert.equal(Comments.find().count(), 0);
            });

            it('should update only owned post', () => {
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
                const updateData = {
                    title: 'Updated title',
                    content: 'Updated content'
                };

                const updatePost = Meteor.server.method_handlers['posts.update'];

                // Verify that user can't update not owned post
                updatePost.arguments = [insertedPostId, updateData];
                assert.throws(updatePost, Meteor.Error, '[not-authorized]');

                let updatedPost = Posts.findOne({_id: insertedPostId});
                assert.equal(updatedPost.title, 'Title');
                assert.equal(updatedPost.content, 'Post content');

                // Verify that user can update owned post
                updatePost.apply({userId}, [insertedPostId, updateData]);
                updatedPost = Posts.findOne({_id: insertedPostId});
                assert.equal(updatedPost.title, 'Updated title');
                assert.equal(updatedPost.content, 'Updated content');

            });
        });
    });
}
