import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import _ from 'lodash';
import { updateSong, deleteSong, deselectPost } from '../../actions/index';
import rise from './rise';

class Edit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    let trimProps = Object.assign({}, props);
    if (trimProps.title && trimProps.scale) {
    trimProps.title = trimProps.title.trim();
    trimProps.scale = trimProps.scale.trim();
    if (trimProps.content){
    trimProps.content = trimProps.content.trim();
    }
    else {
      trimProps.content = '';
    }

    const key = this.props.routing.locationBeforeTransitions.pathname.substring(8);
    this.props.updateSong(key, trimProps, this.props.auth.uid);
    this.context.router.push('/dashboard');
    }
  }

  Change(input){
    const objective = this.state.input;
    _.map(this.props.fields,to => {
      if (to.name === objective) {
      if (!to.value) {
        to.onChange(input);
      }
      else {
        if (to.value.substring(to.value.length-1)!== ' ' && to.value.substring(to.value.length-1)!== '\n'){
          to.onChange(to.value+' '+input);
        }
        else {
          to.onChange(to.value+input);
        }
      }
    }
    });
  }

  Erase(){
    const objective = this.state.input;
    _.map(this.props.fields,to => {
      if (to.name === objective) {
      if (to.value) {
        if (to.value.trim().substring(to.value.trim().length-1) === '#') {
          to.onChange(to.value.trim().substring(0,to.value.trim().length-2));
        }
        else {
          to.onChange(to.value.trim().substring(0,to.value.trim().length-1));
        }
      }
    }
    });
  }

  removeSong() {
    const key = this.props.location.pathname.substring(8);
    this.props.deleteSong(key, this.props.auth.uid);
    this.props.deselectPost(key);
    this.context.router.push('/dashboard');
  }

  onRise(n) {

    if (this.props.fields.scale) {
      this.props.fields.scale.onChange(rise(this.props.fields.scale.value,n));
    }
    if (this.props.fields.content) {
      this.props.fields.content.onChange(rise(this.props.fields.content.value,n));
    }
  }

  componentDidMount() {
    this.setState({input: 'scale'});
    const songKey = this.props.routing.locationBeforeTransitions.pathname.substring(8);
    let thisSong;
    _.map(this.props.library.library, (song, key) => {
        if (songKey === key) {
          thisSong = song;
        }
    });
    this.props.fields.title.onChange(thisSong.title);
    this.props.fields.scale.onChange(thisSong.scale);
    this.props.fields.content.onChange(thisSong.content);
    window.scrollTo(0, 0);

  }

  render() {
    const { fields: { title, scale, content }, handleSubmit, language } = this.props;
    const { c, csharp, d, dsharp, e, f, fsharp, g, gsharp, a, asharp, b, linebreak, erase, space, riseup, risedown, submit, cancel } = language.buttons;
    return (
    <form className="formBody" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>{language.titleHeader}</h3>

        <div className={`form-group ${title.touched && title.value==='' ? 'has-error' : ''}`}>
          <label>{language.titleLabel}</label>
          <input {...title} type="text" className="form-control" value={title.value || ''} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${scale.touched && scale.value==='' ? 'has-error' : ''}`}>
          <label>{language.scaleLabel}</label>
          <input {...scale} type="text" className="form-control" value={scale.value || ''} onFocus={()=> this.setState({input:'scale'})} />
          <div className="text-help">
            {scale.touched ? scale.error : ''}
          </div>
        </div>

        <div className={`form-group`}>
          <label>{language.contentLabel}</label>
          <textarea {...content} rows="6" className="form-control" onFocus={()=> this.setState({input:'content'})} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

      {/* Buttons */}

      <div>

        <div className="row">
            <div className="col-xs-2">
            <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(c)}>{c}</div>
          </div>
            <div className="col-xs-2">
            <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(csharp)}>{csharp}</div>
          </div>
            <div className="col-xs-2">
            <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(d)}>{d}</div>
            </div>
            <div className="col-xs-2">
            <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-primary center-block" onClick={()=>this.onRise(1)}>{riseup}</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(dsharp)}>{dsharp}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(e)}>{e}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(f)}>{f}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-primary center-block"onClick={()=>this.onRise(-1)}>{risedown}</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(fsharp)}>{fsharp}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(g)}>{g}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(gsharp)}>{gsharp}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(a)}>{a}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(asharp)}>{asharp}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(b)}>{b}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('\n')}>{linebreak}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Erase()}>{erase}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
            <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(' ')}>{space}</div>
          </div>
          <div className="col-xs-3">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <button type="submit" className="btn btn-success btn-block">{submit}</button>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-danger center-block" onClick={() => this.removeSong()}>{language.deleteButton}</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
            <Link to='/dashboard'><div className="btn btn-warning center-block">{cancel}</div></Link>
          </div>
        </div>
        <br/>
      </div>

    </form>
      );
    }
    }

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = '';
  }
  if (!values.scale) {
    errors.scale = '';
  }
  if (!values.content) {
    errors.content = '';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    auth: state.auth.user,
    library: state.library,
    routing: state.routing,
    language: state.library.language.edit
  }
}

export default reduxForm({
  form: 'NewForm',
  fields: ['title', 'scale', 'content'],
  validate
}, mapStateToProps, { updateSong, deleteSong, deselectPost })(Edit);
