//test data for users, including username, email, and password
const userData = [
    { username: 'user1', email: 'user1@example.com', password: 'password1' },
    { username: 'user2', email: 'user2@example.com', password: 'password2' },
  ];
  //test data for thoughts, including thoughtText, and username
  const thoughtData = [
    { thoughtText: 'This is a thought by user1', username: 'user1' },
    { thoughtText: 'This is a thought by user2', username: 'user2' },
  ];
  //exports userData and thoughtData
  module.exports = {
    userData,
    thoughtData
  };