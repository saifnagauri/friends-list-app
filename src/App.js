import logo from './logo.svg';
import './App.scss';
import FriendsList from './Containers/Friends-list/Friends-list';
import React from 'react'

function App() {
  return (
    <React.Fragment>
      <FriendsList></FriendsList>
    </React.Fragment>
  );
}

export default App;
