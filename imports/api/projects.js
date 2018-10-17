import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
  Meteor.publish('projects', function() {
    return Projects.find();
  });

  Meteor.publish('adminUsers', function () { 
    if (Roles.userIsInRole(this.userId, ["admin"])) {
      return Meteor.users.find({})
    } 
    else {
      return null;
    }
  });
}


Meteor.methods({
  'projects.insert'(name, companyName) {
    check(name, String);
    check(companyName, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Projects.insert({name, companyName});
  }
});
