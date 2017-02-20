import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchSettings, fetchLibrary } from '../../actions/index';

class SelectedList extends Component {
  componentWillMount() {
    this.props.fetchSettings(this.props.auth.user.uid);
    this.props.fetchLibrary(this.props.auth.user.uid);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { dashboard } = this.props.language;
    return (
      <div className="viewBody">
      <ul className="list-group">
        {
        this.props.selectedPostIds.map((key, index) => {
          const selectedSong = _.find(this.props.library, (song, key2) =>
            key2 === key
          );

          return (
          <li className="list-group-item selected-li" key={index}>
            <h1 className="text-center"><strong><u>{selectedSong.title}</u></strong></h1>
            <br />
            <h2><strong>{selectedSong.scale.replace(/⋄/g, '')}</strong></h2>
            <br />
            <h3 className="ellipsis">{selectedSong.content.replace(/⋄/g, '')}</h3>
          </li>
        );
        })
        }
      </ul>
      <br />
      <br />
      <Link
        className='btn btn-warning center-block dashboardButton'
        to='/dashboard'
      >
        {dashboard}
      </Link>
      <br />
    </div>
    );
  }
}


const mapStateToProps = state => (
  {
    library: state.library.library,
    selectedPostIds: state.library.selectedPostIds,
    language: state.library.language.view,
    settings: state.settings,
    auth: state.auth
  }
);

export default connect(mapStateToProps, { fetchSettings, fetchLibrary })(SelectedList);
