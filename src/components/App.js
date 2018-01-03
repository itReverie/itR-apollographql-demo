import React, { Component } from 'react';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Login from './Login';
import Header from './Header';
import Search from './Search'
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className='center w85'>
     <Header />
     <div className='ph3 pv1 background-gray'>
       <Switch>
         <Route exact path='/login' component={Login}/>
         <Route exact path='/create' component={CreateLink}/>
         <Route exact path='/' component={LinkList}/>
         <Route exact path='/search' component={Search}/>
       </Switch>
     </div>
   </div>
    )
  }
}
export default App;
