import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  extraSignupFields: [{
    fieldName: 'firstName',
    fieldLabel: 'First Name',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value) {
        errorFunction("Please provide valid First Name [Max - 50 Characters]");
        return false;
      } else {
        return true;
      }
    }
  }, {
    fieldName: 'lastName',
    fieldLabel: 'Last Name',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value) {
        errorFunction("Please provide valid last name");
        return false;
      } else {
        return true;
      }
    }
  }]
});

if (Meteor.isServer) {
  if (Meteor.users.find().count() === 0) {
    let idAdmin = Accounts.createUser({
        username: 'avp21',
        email: 'alv.popa@gmail.com',
        password: 'asdqwe',
        profile: {
          firstName: "Valentin",
          lastName: "Popa"
        }
    });
    console.log('Created user with\nusername: avp21\npassword: asdqwe');
    Roles.addUsersToRoles(idAdmin, ['admin']);
  }
}