import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLibrary, selectPost, deselectPost, toggleHelp } from '../../actions/index';
import _ from 'lodash';
import { Link } from 'react-router';
import Modal from 'react-bootstrap-modal';
import img1 from '../../imgs/tutorial1.png';
import fields from '../../imgs/fields.png';
import buttons from '../../imgs/buttons.png';
import breakline from '../../imgs/breakline.png';
import erase from '../../imgs/erase.png';
import space from '../../imgs/space.png';
import diamond from '../../imgs/diamond.png';
import riseup from '../../imgs/riseup.png';
import risedown from '../../imgs/risedown.png';
import fetch from '../../imgs/fetch.png';






class LibraryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '', emptyTrigger: true
    };
  }
  componentWillMount(){
    this.props.fetchLibrary(this.props.auth.user.uid);
  }
  componentDidUpdate() {
    if (!this.props.library.library && !this.props.help && this.state.emptyTrigger) {
      this.props.toggleHelp(true);
    }
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
                <p className="text-center">{song.scale.replace(/⋄/g, '')}</p>
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
          <p className="text-center">{song.scale.replace(/⋄/g, '')}</p>
        </li>
			);
		});
	}
  else {
    return (
      <div>{this.props.loading}</div>
    )
  }
}
else {
  return (
  <div>
    <strong>{this.props.empty}</strong>
  </div>
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
        placeholder={this.props.search} />
      <hr/>
      <ul className="list-group">
        {this.renderSongs()}
      </ul>

      <Modal
        show={this.props.help}
        onHide={ ()=>{this.props.toggleHelp(false); this.setState({ emptyTrigger: false});} } >
          <Modal.Header closeButton>
              <Modal.Title className='text-center' id='ModalHeader'>{this.props.language.dashboard.tutorialIndex}</Modal.Title>
            </Modal.Header>
          <Modal.Body>
            <Link className='btn btn-info center-block dashboardButton' to='/new'>{this.props.language.dashboard.newButton}</Link>
            <div className='text-center'>{this.props.language.dashboard.tutorialNewButton}</div>
            <hr />
            <h2 className='text-center'>{this.props.language.dashboard.tutorialQuestion}</h2>
            <img className='img-tutorial-1' src={img1} alt="img1" />
            <div className='text-center'>{this.props.language.dashboard.tutorialNewSong}</div>
            <hr />
            <img className='img-tutorial-1' src={fields} alt="fields" />
            <div className='text-center'>{this.props.language.dashboard.tutorialFields}</div>
            <h6>{this.props.language.dashboard.tutorialRequiredFields}</h6>
            <hr />
            <div className='text-center'>{this.props.language.dashboard.tutorialButtons}</div>
            <br />
            <img className='img-tutorial-1' src={buttons} alt="buttons" />
            <div className='text-center'>{this.props.language.dashboard.tutorialNotes}</div>
            <br />
            <img className='img-tutorial-2' src={breakline} alt="breakline" />
            <div className='text-center'>{this.props.language.dashboard.tutorialBreakline}</div>
            <br/>
            <img className='img-tutorial-2' src={erase} alt="erase" />
            <div className='text-center'>{this.props.language.dashboard.tutorialErase}</div>
            <br/>
            <img className='img-tutorial-2' src={space} alt="space" />
            <div className='text-center'>{this.props.language.dashboard.tutorialSpace}</div>
            <br/>
            <img className='img-tutorial-2' src={diamond} alt="diamond" />
            <div className='text-center'>{this.props.language.dashboard.tutorialDiamond}</div>
            <hr/>
            <img className='img-tutorial-3' src={riseup} alt="riseup" />
            <div className='text-center'>{this.props.language.dashboard.tutorialRiseUp}</div>
            <br/>
            <img className='img-tutorial-3' src={risedown} alt="risedown" />
            <div className='text-center'>{this.props.language.dashboard.tutorialRiseDown}</div>
            <hr />
            <img className='img-tutorial-3' src={fetch} alt="fetch" />
            <div className='text-center'>{this.props.language.dashboard.tutorialFetch}</div>




           </Modal.Body>
           <Modal.Footer>
             <Modal.Dismiss className='btn btn-default'>{this.props.language.new.buttons.cancel}</Modal.Dismiss>
           </Modal.Footer>
      </Modal>
    </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		library: state.library,
		auth: state.auth,
    song: state.song,
    selectedPostIds: state.library.selectedPostIds,
    language: state.library.language,
    help: state.library.help
	}
}

export default connect(mapStateToProps, { fetchLibrary, selectPost, deselectPost, toggleHelp})(LibraryList);
