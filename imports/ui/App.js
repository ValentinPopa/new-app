import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import {Projects} from '../api/projects';

import Project from './Project.js';

import AccountsUIWrapper from './AccountsUIWrapper.js';

import { withTracker } from 'meteor/react-meteor-data';


class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const companyName = ReactDOM.findDOMNode(this.refs.companyName).value.trim();
    
    if(name.length < 1 || companyName.length < 1) {
      alert('More letters')
    } else {
      Meteor.call('projects.insert', name, companyName);

      ReactDOM.findDOMNode(this.refs.name).value = '';
      ReactDOM.findDOMNode(this.refs.companyName).value = '';
    }
  }

  renderProjects() {
    const projects = this.props.projects;
    return projects.map((project,i) => {
      return (
        <Project
          key={i}
          project={project}
        />
      );
    });
  }

  renderUsers() {
    let users = this.props.users;
    return users.map((user,i) => {
      return (
        <p key={i}> {user.username}, {user.emails[0].address}, {user.profile.firstName}, {user.profile.lastName}</p>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />

          { this.props.isAdmin ?
            <form className="new-project" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="name"
                placeholder="Type to add new name"
              />
               <input
                type="text"
                ref="companyName"
                placeholder="Type to add new company name"
              />
               <input
               id="submit"
               type="submit" 
               value="Submit" 
               />
            </form> :

            <p>
              You must be an admin to add a project
            </p>
          }
          <h1 id="title">Projects Room ({this.props.count})</h1>
          <ul>
            {this.renderProjects()}
          </ul>

          { this.props.currentUser ?
              <div> 
                {this.props.isAdmin ?
                  <h1> User list </h1> :
                  <h1> User info </h1> 
                }
                {this.renderUsers()} 
              </div>
              : ''
          }
          
        </header>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('adminUsers');
  Meteor.subscribe('projects');
  return {
    currentUser: Meteor.user(),
    count: Projects.find({}).count(),
    projects: Projects.find({}).fetch(),
    users: Meteor.users.find().fetch(),
    isAdmin: Meteor.user() && Meteor.user().roles ? Meteor.user().roles[0] == 'admin' : false
  };
})(App);
