import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import _ from 'lodash';
import { createSong, fetchLacuerda, fetchUltimateguitar, cleanApiFetch } from '../../actions/index';
import rise from './rise';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {fetchName: '', fetchArtist: '', input: 'scale', version: '1'};
  }

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

    this.props.createSong(trimProps, this.props.auth.uid);
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

  onRise(n) {

    if (this.props.fields.scale) {
      this.props.fields.scale.onChange(rise(this.props.fields.scale.value,n));
    }
    if (this.props.fields.content) {
      this.props.fields.content.onChange(rise(this.props.fields.content.value,n));
    }
  }

  getLaCuerda() {
    let version;
    switch (this.state.version) {
      case "2":
        version = "-2"
        break;
      case "3":
        version = "-3"
        break;
      case "4":
        version = "-4"
        break;
      case "5":
        version = "-5"
        break;
      default:
        version = ""
    }
    this.props.fields.content.onChange('')
    let name = this.state.fetchName.toLowerCase().replace(/ /g,"_").concat(version);
    const artist = this.state.fetchArtist.toLowerCase().replace(/ /g,"_");
    this.props.fetchLacuerda(name,artist);
    //EN LA CUERDA LAS NOTAS ESTAN ENTRE LOS <A></A> PARA QUE ASI EL SISTEMA SEPA
    //QUE SON NOTAS Y NO SON PALABRAS, PENDIENTE HACER ALGO PARECIDO

    // this.props.fields.content.onChange(this.props.lacuerda);
    // console.log(this.props);
  }

  getUltimateguitar() {
    let version;
    switch (this.state.version) {
      case "2":
        version = "_ver2"
        break;
      case "3":
        version = "_ver3"
        break;
      case "4":
        version = "_ver4"
        break;
      case "5":
        version = "_ver5"
        break;
      default:
        version = ""
    }
    this.props.fields.content.onChange('');
    const name = this.state.fetchName.toLowerCase().replace(/ /g,"_").concat(version);
    const artist = this.state.fetchArtist.toLowerCase().replace(/ /g,"_");
    this.props.fetchUltimateguitar(name,artist);
    //EN LA CUERDA LAS NOTAS ESTAN ENTRE LOS <A></A> PARA QUE ASI EL SISTEMA SEPA
    //QUE SON NOTAS Y NO SON PALABRAS, PENDIENTE HACER ALGO PARECIDO

    // this.props.fields.content.onChange(this.props.lacuerda);
    // console.log(this.props);

  }


  handleNameChange(event) {
    this.setState({
      fetchName : event.target.value
    })
  }

  handleArtistChange(event) {
    this.setState({
      fetchArtist : event.target.value
    })
  }

  handleVersionChange(event) {
    this.setState({version: event.target.value});
  }

  componentWillUnmount() {
    this.props.cleanApiFetch();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { fields: { title, scale, content }, handleSubmit } = this.props;
    return (
    <form className="formBody" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Song</h3>

        <div className={`form-group ${title.touched && title.value==='' ? 'has-error' : ''}`}>
          <label>Title</label>
          <input {...title} type="text" className="form-control" value={title.value || ''} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${scale.touched && scale.value==='' ? 'has-error' : ''}`}>
          <label>Scale</label>
          <input {...scale} type="text" className="form-control" value={scale.value || ''} onFocus={()=> this.setState({input:'scale'})} />
          <div className="text-help">
            {scale.touched ? scale.error : ''}
          </div>
        </div>

        <div className={`form-group`}>
          <label>Content</label>
          <textarea {...content} className="form-control content-area" rows="6" onFocus={()=> this.setState({input:'content'})} value={content.value || this.props.ultimateguitar || this.props.lacuerda}/>
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

      {/* Buttons */}

      <div>

        <div className="row">
            <div className="col-xs-2">
            <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('C')}>C</div>
          </div>
            <div className="col-xs-2">
            <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('C#')}>C#</div>
          </div>
            <div className="col-xs-2">
            <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('D')}>D</div>
            </div>
            <div className="col-xs-2">
            <div className="btn btn-primary hidden"></div>
          </div>

          <div className="col-xs-4">
          <div className="btn btn-primary center-block" onClick={()=>this.onRise(1)}>⇧♪</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('D#')}>D#</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('E')}>E</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('F')}>F</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-primary center-block"onClick={()=>this.onRise(-1)}>⇩♪</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('F#')}>F#</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('G')}>G</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('G#')}>G#</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">Responsive</div>
          </div>
          <div className="col-xs-2">
            <select defaultValue="1" onChange={this.handleVersionChange.bind(this)} className="form-control select-fetch">
              <option className="version-select" value='1'>Version 1</option>
              <option className="version-select" value="2">Version 2</option>
              <option className="version-select" value="3">Version 3</option>
              <option className="version-select" value="4">Version 4</option>
              <option className="version-select" value="5">Version 5</option>
            </select>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('A')}>A</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('A#')}>A#</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('B')}>B</div>
          </div>
          <div className="col-xs-2">
            <div className="btn btn-primary hidden">Responsive</div>
          </div>
          <div className="col-xs-4">
          <input type="text" className="form-control field-fetch" value={this.state.fetchName} onChange={this.handleNameChange.bind(this)} placeholder="Nombre Cancion" />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('\n')}>↵</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={()=> this.Erase()}>{"⇦"}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <input type="text" className="form-control field-fetch" value={this.state.fetchArtist} onChange={this.handleArtistChange.bind(this)} placeholder="Nombre Artista" />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(' ')}>[&nbsp;&nbsp;&nbsp;]</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">Ctr+Z</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
            <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
            <div className="btn btn-primary center-block btn-fetch" onClick={() => this.getUltimateguitar()}>ultimate-guitar.com</div>
            <br/>
            <div className="btn btn-primary center-block btn-fetch" onClick={() => this.getLaCuerda()}>lacuerda.net</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">[ ]</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">Ctrl+Z</div>
          </div>
          <div className="col-xs-4">
          <button type="submit" className="btn btn-success btn-block">Submit</button>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-danger hidden">Borrar</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">Ctrl+Z</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">Ctrl+Z</div>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-primary hidden">Ctrl+Z</div>
          </div>
          <div className="col-xs-4">
            <Link to='/dashboard'><div className="btn btn-warning center-block">Cancel</div></Link>
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
    lacuerda: state.library.lacuerda,
    ultimateguitar: state.library.ultimateguitar
  }
}

export default reduxForm({
  form: 'NewForm',
  fields: ['title', 'scale', 'content'],
  validate
}, mapStateToProps, { createSong, fetchLacuerda, fetchUltimateguitar, cleanApiFetch })(New);
