import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';
import Modal from 'react-bootstrap-modal';
import { fetchLibrary, selectPost, deselectPost, toggleHelp } from '../../actions/index';
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

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

class LibraryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '', emptyTrigger: true
    };
  }

  componentWillMount() {
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
    });

    if (target.checked) {
      this.props.selectPost(name);
    } else {
      this.props.deselectPost(name);
    }
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  renderSongs() {
    if (this.props.library.library) {
      const library = _.map(this.props.library.library, (value, key) => ({ ...value, key }));
		if (this.props.library.library.length !== 0) {
      if (_.find(alphabet, (value) => (this.state.search === value))) {
        return _.map(_.orderBy(library, (song) => song.title), (song) => {
          if ((song.title.toLowerCase()).charAt(0) === this.state.search) {
            return (
              <li className="list-group-item li" key={song.key}>
                <input
                name={song.key}
                checked={_.includes(this.props.selectedPostIds, song.key)}
                type="checkbox"
                onChange={this.handlePostSelect.bind(this, song.key)}
                className="song-checkbox"
                />
                <Link to={`library/${song.key}`}>
                <p className="text-center"><strong>{song.title}</strong></p>
                </Link>
                <p className="text-center">{song.scale.replace(/⋄/g, '')}</p>
              </li>
            );
          }
            return (
              <li className="list-group-item li hidden" key={song.key}>
                <input
                name={song.key}
                checked={_.includes(this.props.selectedPostIds, song.key)}
                type="checkbox"
                onChange={this.handlePostSelect.bind(this, song.key)}
                />
              </li>
            );
          });
      } else if (this.state.search !== '') {
        return _.map(_.orderBy(library, (song) => song.title), (song) => {
          if ((song.title.toLowerCase()).indexOf(this.state.search.toLowerCase()) !== -1) {
            return (
              <li className="list-group-item li" key={song.key}>
                <input
                name={song.key}
                checked={_.includes(this.props.selectedPostIds, song.key)}
                type="checkbox"
                onChange={this.handlePostSelect.bind(this, song.key)}
                className="song-checkbox"
                />
                <Link to={`library/${song.key}`}>
                <p className="text-center"><strong>{song.title}</strong></p>
                </Link>
                <p className="text-center">{song.scale.replace(/⋄/g, '')}</p>
              </li>
            );
          }
            return (
              <li className="list-group-item li hidden" key={song.key}>
                <input
                name={song.key}
                checked={_.includes(this.props.selectedPostIds, song.key)}
                type="checkbox"
                onChange={this.handlePostSelect.bind(this, song.key)}
                />
              </li>
            );
          });
      }
    // console.log(Object.keys(this.props.library.library).length);
		// _.orderBy(this.props.library.library, (song) => song.title)
    // console.log(this.props.library.library);
    // console.log(_.orderBy(this.props.library.library, (song) => song.title));
    return _.map(_.orderBy(library, (song) => song.title), (song) => (
				<li className="list-group-item li" key={song.key}>
          <input
          name={song.key}
          checked={_.includes(this.props.selectedPostIds, song.key)}
          type="checkbox"
          onChange={this.handlePostSelect.bind(this, song.key)}
          className="song-checkbox"
          />
          <Link to={`library/${song.key}`}>
          <p className="text-center"><strong>{song.title}</strong></p>
          </Link>
          <p className="text-center">{song.scale.replace(/⋄/g, '')}</p>
        </li>
		));
	}
  return (
      <div>{this.props.loading}</div>
  );
}
  return (
  <div>
    <strong>{this.props.empty}</strong>
  </div>
);
}
  render() {
    return (
      <div>
      <hr />
      <span
        className={
          `${
            this.state.search
            ?
            'glyphicon glyphicon-remove-circle pull-right x-search'
            :
            'hidden'
          }`
        }
        aria-hidden="true"
        onClick={() => this.setState({ search: '' })}
      />
      <input
        type="text"
        className="center-block search-input"
        value={this.state.search}
        onChange={this.handleSearchChange.bind(this)}
        placeholder={this.props.search}
      />

      <br />
      <div className="text-center">
        <a className="language" onClick={() => this.setState({ search: 'a' })}>A</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'b' })}>B</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'c' })}>C</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'd' })}>D</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'e' })}>E</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'f' })}>F</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'g' })}>G</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'h' })}>H</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'i' })}>I</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'j' })}>J</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'k' })}>K</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'l' })}>L</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'm' })}>M</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'n' })}>N</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'ñ' })}>Ñ</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'o' })}>O</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'p' })}>P</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'q' })}>Q</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'r' })}>R</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 's' })}>S</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 't' })}>T</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'u' })}>U</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'v' })}>V</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'w' })}>W</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'x' })}>X</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'y' })}>Y</a>&thinsp;
        <a className="language" onClick={() => this.setState({ search: 'z' })}>Z</a>&thinsp;
      </div>
      <hr />
      <ul className="list-group">
        {this.renderSongs()}
      </ul>

      <Modal
        show={this.props.help}
        onHide={() => { this.props.toggleHelp(false); this.setState({ emptyTrigger: false }); }}
      >
          <Modal.Header closeButton>
              <Modal.Title className='text-center' id='ModalHeader'>
                {this.props.language.dashboard.tutorialIndex}
              </Modal.Title>
            </Modal.Header>
          <Modal.Body>
            <Link className='btn btn-info center-block dashboardButton' to='/new'>
              {this.props.language.dashboard.newButton}
            </Link>
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
            <br />
            <img className='img-tutorial-2' src={erase} alt="erase" />
            <div className='text-center'>{this.props.language.dashboard.tutorialErase}</div>
            <br />
            <img className='img-tutorial-2' src={space} alt="space" />
            <div className='text-center'>{this.props.language.dashboard.tutorialSpace}</div>
            <br />
            <img className='img-tutorial-2' src={diamond} alt="diamond" />
            <div className='text-center'>{this.props.language.dashboard.tutorialDiamond}</div>
            <hr />
            <img className='img-tutorial-3' src={riseup} alt="riseup" />
            <div className='text-center'>{this.props.language.dashboard.tutorialRiseUp}</div>
            <br />
            <img className='img-tutorial-3' src={risedown} alt="risedown" />
            <div className='text-center'>{this.props.language.dashboard.tutorialRiseDown}</div>
            <hr />
            <img className='img-tutorial-3' src={fetch} alt="fetch" />
            <div className='text-center'>{this.props.language.dashboard.tutorialFetch}</div>

           </Modal.Body>
           <Modal.Footer>
             <Modal.Dismiss className='btn btn-default'>
               {this.props.language.new.buttons.cancel}
             </Modal.Dismiss>
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
	};
}

export default connect(mapStateToProps,
  { fetchLibrary, selectPost, deselectPost, toggleHelp })(LibraryList);
