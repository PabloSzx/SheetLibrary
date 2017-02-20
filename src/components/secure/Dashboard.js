import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { selectLanguage, toggleHelp, updateSettings, fetchSettings } from '../../actions/index';
import LibraryList from './LibraryList';


class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchSettings(this.props.auth.user.uid, this.props.langName);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

render() {
  const {
    searchPlaceholder, selectedButton, newButton, logout, contact,
    help, empty, loading, language, spanish, english
  } = this.props.language;
  return (
    <div className="formBody">
      <LibraryList search={searchPlaceholder} empty={empty} loading={loading} />
      <hr />
			<br />
      <Link className='btn btn-success center-block dashboardButton view-button' to='/view'>
        {selectedButton}
      </Link>
      <br />
      <br />
			<Link className='btn btn-info center-block dashboardButton' to='/new'>{newButton}</Link>
      <br />
			<br />
      <Link className='btn btn-danger center-block dashboardButton' to='/logout'>{logout}</Link>
      <br />
      <hr />
      <h5 className="text-center">
        {language}
        <strong>
          <a
            className="language"
            onClick={() => {
              this.props.selectLanguage('spanish');
              const user = this.props.auth.user.uid;
              this.props.updateSettings(user,
                { lang: 'spanish' }
              );
            }}
          >
          {spanish}
          </a>
        </strong>
        /
        <strong>
          <a
            className="language"
            onClick={() => {
              this.props.selectLanguage('english');
              const user = this.props.auth.user.uid;
              this.props.updateSettings(user,
                { lang: 'english' }
              );
            }}
          >
          {english}
          </a>
        </strong>
        &thinsp;&thinsp;⋅&thinsp;&thinsp;
        <strong>
          <a className="language" onClick={() => this.props.toggleHelp(true)}>{help}</a>
        </strong>
      </h5>
      <h6 className="text-center">{contact}</h6>
    </div>
  );
}
}

function mapStateToProps(state) {
  return {
    language: state.library.language.dashboard,
    auth: state.auth,
    selectedPostIds: state.library.selectedPostIds,
    langName: state.library.language.name,
    settings: state.settings
  };
}

export default connect(mapStateToProps,
  { selectLanguage, toggleHelp, fetchSettings, updateSettings })(Dashboard);
