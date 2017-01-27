import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLibrary } from '../../actions/index';
import _ from 'lodash';
import { Link } from 'react-router';

class LibraryList extends Component {
  componentWillMount(){
    this.props.fetchLibrary(this.props.auth.user.uid);
  }
  renderSongs() {
    if (this.props.library.library) {
		if(this.props.library.library.length !== 0){
		return _.map(this.props.library.library, (song, key)  => {
			return (
				<li className="list-group-item li" key={key}>
          <Link to={"library/"+key}>
          <p className="text-center"><strong>{song.title}</strong></p>
          </Link>
          <p className="text-center">{song.scale}</p>
        </li>
			);
		});
	}
  else {
    return (
      <div>Loading...</div>
    )
  }
}

}
  render() {
    return (
      <ul className="list-group">
        {this.renderSongs()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
	return {
		library: state.library,
		auth: state.auth,
    song: state.song
	}
}

export default connect(mapStateToProps, { fetchLibrary })(LibraryList);
