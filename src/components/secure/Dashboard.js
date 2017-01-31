import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchLibrary } from '../../actions/index';
import { Link } from 'react-router';
import LibraryList from './LibraryList';


class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
render() {
  return (
    <div>
      <LibraryList />
      <hr />
			<br/>
      <Link className='btn btn-success center-block dashboardButton' to='/view'>View Selected Songs</Link>
      <br/>
      <br/>
			<Link className='btn btn-info center-block dashboardButton' to='/new'>New Song</Link>
      <br/>
			<br/>
      {/* <Link className='btn btn-primary' to='/profile'>Profile</Link>
      <br/>
			<br/> */}
      <Link className='btn btn-danger center-block dashboardButton' to='/logout'>Logout</Link>
      <br/>
      <hr/>
      <h6 className="text-center">Si desea contactarse con el desarrollador, favor de mandar un correo a admin@pablosz.me</h6>
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
