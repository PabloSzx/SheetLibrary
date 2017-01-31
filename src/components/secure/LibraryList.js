import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLibrary, selectPost, deselectPost } from '../../actions/index';
import _ from 'lodash';
import { Link } from 'react-router';

class LibraryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }
  componentWillMount(){
    this.props.fetchLibrary(this.props.auth.user.uid);
  }

  handlePostSelect(id, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  const { selectPost, deselectPost } = this.props;

   target.checked ? selectPost(name) : deselectPost(name);
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  renderSongs() {
    if (this.props.library.library) {
		if(this.props.library.library.length !== 0){
      if (this.state.search !== ''){
        return _.map(this.props.library.library, (song, key)  => {
          if ((song.title.toLowerCase()).indexOf(this.state.search.toLowerCase()) !== -1){
            return (
      				<li className="list-group-item li" key={key}>
                <input
                name={key}
                checked={_.includes(this.props.selectedPostIds,key) ? true : false}
                type="checkbox"
                onChange={this.handlePostSelect.bind(this, key)}
                className="song-checkbox"/>
                <Link to={"library/"+key}>
                <p className="text-center"><strong>{song.title}</strong></p>
                </Link>
                <p className="text-center">{song.scale}</p>
              </li>
      			);
          }
          else {
            return (
      				<li className="list-group-item li hidden" key={key}>
                <input
                name={key}
                checked={_.includes(this.props.selectedPostIds,key) ? true : false}
                type="checkbox"
                onChange={this.handlePostSelect.bind(this, key)} />
              </li>
      			);
          }
    		});
      }
		return _.map(this.props.library.library, (song, key)  => {
			return (
				<li className="list-group-item li" key={key}>
          <input
          name={key}
          checked={_.includes(this.props.selectedPostIds,key) ? true : false}
          type="checkbox"
          onChange={this.handlePostSelect.bind(this, key)}
          className="song-checkbox"/>
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
else {
  return (
  <div><strong>You can start your library pressing "New Song"</strong></div>
);
}

}
  render() {
    return (
      <div>
      <hr/>
      <input
        type="text"
        className="center-block search-input"
        value={this.state.search}
        onChange={this.handleSearchChange.bind(this)}
        placeholder="Search by song name" />
      <hr/>
      <ul className="list-group">
        {this.renderSongs()}
      </ul>
    </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		library: state.library,
		auth: state.auth,
    song: state.song,
    selectedPostIds: state.library.selectedPostIds
	}
}

export default connect(mapStateToProps, { fetchLibrary, selectPost, deselectPost})(LibraryList);
