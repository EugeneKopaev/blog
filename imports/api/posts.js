import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {Comments} from "../api/comments.js";

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Meteor.publish('publications', () => Posts.find());
    Meteor.publish('publicationsByAuthor', (author) => Posts.find({authorId: author}));
    Meteor.publish('publicationsByTitle', (title) => Posts.find({title: title}));
    Meteor.publish('singlePost', (postId) => Posts.find({_id: postId}));
}

export const PostSchema = new SimpleSchema({
    authorId: {
        type: Meteor.ObjectID,
        label: 'The author id of this post.',
    },
    authorName: {
        type: String,
        label: 'The author of this post.',
    },
    title: {
        type: String,
        label: 'The title of this post.',
    },
    created: {
        type: String,
        label: 'The date this post was created.',
        autoValue() {
            return ( new Date() ).toISOString();
        }
    },
    updated: {
        type: String,
        label: 'The date this post was last updated.',
        optional: true
    },
    tags: {
        type: [String],
        label: 'The tags of this post.',
        defaultValue: []
    },
    content: {
        type: String,
        label: 'The content of this post.',
    },
    comments: {
        type: [Meteor.ObjectID],
        defaultValue: []
    }
});

// Deny all client-side updates since we will be using methods to manage this collection
Posts.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Posts.attachSchema(PostSchema);

if (Meteor.isServer) {
    Meteor.methods({
        'posts.create'(data) {
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            const author = Meteor.users.findOne(this.userId);
            data.authorId = author._id;
            data.authorName = author.username;
            const post = Posts.insert(data);
            return {
                _id: post
            }
        },
        'posts.remove'(id)  {
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            const post = Posts.findOne(id);
            if (post.authorId !== this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            const comments = Comments.find({postId: id});
            Posts.remove(id);
            comments.forEach((comment) => Comments.remove(comment._id));
        },
        'posts.update'(id, data) {
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            const post = Posts.findOne(id);
            if (post.authorId !== this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            Posts.update(id, {$set: {
                title: data.title,
                content: data.content,
                updated: new Date().toISOString()
            }})
        }
    });
}