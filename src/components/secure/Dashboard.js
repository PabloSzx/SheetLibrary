import React, { Component } from 'react';
import { Link } from 'react-router';
import LibraryList from './LibraryList';


class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
render() {
  return (
    <div className="formBody">
      <LibraryList />
      <hr />
			<br/>
      <Link className='btn btn-success center-block dashboardButton btn-fetch' to='/view'>View Selected Songs</Link>
      <br/>
      <br/>
			<Link className='btn btn-info center-block dashboardButton' to='/new'>New Song</Link>
      <br/>
			<br/>
      <Link className='btn btn-danger center-block dashboardButton' to='/logout'>Logout</Link>
      <br/>
      <hr/>
      <h6 className="text-center">Si desea contactarse con el desarrollador, favor de mandar un correo a admin@pablosz.me</h6>
    </div>
  );
}

}

export default Dashboard;
