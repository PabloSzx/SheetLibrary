import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

class SelectedList extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
      <ul className="list-group">
        {
        this.props.selectedPostIds.map((key, index) => {

          const selectedSong = _.find(this.props.library, (song, key2) => {
            return key2 === key;
          });

          return (
          <li className="list-group-item selected-li" key={index}>
            <h3 className="text-center">{selectedSong.title}</h3>
            <br/>
            <h4>{selectedSong.scale}</h4>
            <br/>
            <h5>{selectedSong.content}</h5>
          </li>
        );
        })
        }
      </ul>
      <br/>
      <br/>
      <Link className='btn btn-warning center-block dashboardButton' to='/dashboard'>Dashboard</Link>
    </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    library: state.library.library,
    selectedPostIds: state.library.selectedPostIds
  };
};

export default connect(mapStateToProps)(SelectedList);
