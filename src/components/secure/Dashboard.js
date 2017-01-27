import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchLibrary } from '../../actions/index';
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
      <br/>
      <h6>Si desea contactarse con el desarrollador, favor de mandar un correo a admin@pablosz.me</h6>
    </div>
  );
}

}

//
// function mapStateToProps(state) {
// 	return {
// 		library: state.library,
// 		auth: state.auth
// 	}
// }

// export default connect(mapStateToProps, { fetchLibrary })(Dashboard);
export default Dashboard;
