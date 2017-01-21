import { Mongo } from 'meteor/mongo';

export const User = new Mongo.Collection('User');

// User database to store temp details of current user