import React, { Component } from 'react';
import logo from '../logo.svg';
import LinkList from './LinkList';
import CreateLink from './CreateLink';

class App extends Component {
  render() {
    return (
      <div>
      <LinkList />
      <CreateLink />
     </div>
    )
  }
}
export default App;
