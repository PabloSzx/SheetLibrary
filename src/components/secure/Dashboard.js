import React, { Component } from 'react';
import { Link } from 'react-router';
import LibraryList from './LibraryList';

class Dashboard extends Component {
render() {
  return (
    <div>
      <LibraryList />
			<br/>
			<Link className='btn btn-info' to='/new'>New Song</Link>
      <br/>
			<br/>
      <Link className='btn btn-primary' to='/profile'>Profile</Link>
      <br/>
			<br/>
      <Link className='btn btn-primary' to='/logout'>Logout</Link>
    </div>
  );
}

}

export default Dashboard;
