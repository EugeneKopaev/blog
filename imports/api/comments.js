import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {Posts} from "../api/posts.js";

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
    Meteor.publish('commentsByPost', (postId) => Comments.find({postId: postId}));
}

export const CommentSchema = new SimpleSchema({
    postId: {
        type: Meteor.ObjectID
    },
    authorId: {
        type: Meteor.ObjectID,
        label: 'The author id of this comment.',
    },
    authorName: {
        type: String,
        label: 'The author of this comment.',
    },
    created: {
        type: String,
        label: 'The date this comment was posted.',
        autoValue() {
            return ( new Date() ).toISOString();
        }
    },
    content: {
        type: String,
        label: 'The content of this comment.',
    },
});

// Deny all client-side updates since we will be using methods to manage this collection
Comments.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Comments.attachSchema(CommentSchema);

if (Meteor.isServer) {
    Meteor.methods({
        'comments.create'(data) {
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            const post = Posts.findOne(data.postId);
            const author = Meteor.users.findOne(this.userId);
            data.authorId = author._id;
            data.authorName = author.username;
            const comment = Comments.insert(data);
            Posts.update(post._id, {
                $addToSet: {
                    comments: comment
                }
            });
            return {
                _id: comment
            }
        },
    });
}


