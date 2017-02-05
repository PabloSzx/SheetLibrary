import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { createSong, fetchLacuerda, fetchUltimateguitar, cleanApiFetch } from '../../actions/index';
import rise from './rise';
import Confirm from 'react-confirm-bootstrap';
import YTSearch from 'youtube-simple-search';

const API_KEY = 'AIzaSyDDjF0K9vkZRndsg59p7b5f4H5D77YUyyw';


class New extends Component {
  // constructor(props) {
  //   super(props);
  // }

  static contextTypes = {
    router: PropTypes.object
  };

  onCancelConfirm() {
    this.context.router.push('/dashboard');
  }

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

    if (this.props.fields.content.value === "⇄"){
      if (this.props.ultimateguitar){
        trimProps.content = this.props.ultimateguitar;
      }
      else if(this.props.lacuerda){
        trimProps.content = this.props.lacuerda;
      }

      this.props.createSong(trimProps, this.props.auth.uid);
    }
    else {
    this.props.createSong(trimProps, this.props.auth.uid);
    }
    this.context.router.push('/dashboard');
    }

  }

  Change(value){
    const zero = String.fromCharCode(8900);
    const objective = this.state.input;
    let input;
    if (value !== zero) {input = zero+value+zero}
    else {input = value}
    const selected = this.state.selection;
    let partOne, partTwo;
    _.map(this.props.fields,to => {
      if (to.name === objective) {
      if (!to.value) {
        to.onChange(input);
        this.setState({ selection: (selected + input.length) })
      }
      else {
        if (to.value.substring(to.value.length-1)!== ' ' && to.value.substring(to.value.length-1)!== '\n'){
          if (value !== zero) partOne = to.value.slice(0, selected)+' '+input;
          else partOne = to.value.slice(0, selected)+input;
          partTwo = to.value.slice(selected, to.value.length);
          to.onChange(partOne+partTwo);
          this.setState({ selection: (selected + input.length + 1) })

        }
        else {
          partOne = to.value.slice(0, selected)+input;
          partTwo = to.value.slice(selected, to.value.length);
          to.onChange(partOne+partTwo);
          this.setState({ selection: (selected + input.length) })
        }
      }
    }
    });
  }

  Erase(){
    const objective = this.state.input;
    const selected = this.state.selection;
    let partOne, partTwo;
    const zero = String.fromCharCode(8900);

    _.map(this.props.fields,to => {
      if (to.name === objective) {

      if (to.value) {
        partOne = to.value.slice(0, selected);
        partTwo = to.value.slice(selected, to.value.length);


        if (partOne.trim().replace(/⋄/g, '').substring(partOne.trim().replace(/⋄/g, '').length-1) === '#') {
          partOne = (partOne.trim().replace(/⋄$/, '').substring(0,partOne.trim().replace(/⋄$/, '').length-2));  //.replace(/⋄$/, ''));
          if ((partOne.charAt(partOne.length-1))===zero){ partOne = partOne.slice(0,-1);}
          this.setState({ selection: (selected - (to.value.length - (partOne.length + partTwo.length))) });
          to.onChange(partOne+partTwo);
        }
        else {
          partOne = (partOne.trim().replace(/⋄$/, '').substring(0,partOne.trim().replace(/⋄$/, '').length-1));  //.replace(/⋄$/, ''));
          if ((partOne.charAt(partOne.length-1))===zero){ partOne = partOne.slice(0,-1);}
          this.setState({ selection: (selected - (to.value.length - (partOne.length + partTwo.length))) });
          to.onChange(partOne+partTwo);
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
      if (this.props.fields.content.value === '⇄'){
        if (this.props.ultimateguitar) {
          this.props.fields.content.onChange(rise(this.props.ultimateguitar,n));
        }
        else if (this.props.lacuerda) {
          this.props.fields.content.onChange(rise(this.props.lacuerda,n));
        }
      }
      else {
        this.props.fields.content.onChange(rise(this.props.fields.content.value,n));
      }
    }
  }

  getLaCuerda() {
    let version;
    this.props.cleanApiFetch();
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
    this.props.fields.content.onChange('⇄');
    let name = this.state.fetchName.trim().toLowerCase().replace(/ /g,"_").concat(version);
    const artist = this.state.fetchArtist.trim().toLowerCase().replace(/ /g,"_");
    this.props.fetchLacuerda(name,artist);
    //EN LA CUERDA LAS NOTAS ESTAN ENTRE LOS <A></A> PARA QUE ASI EL SISTEMA SEPA
    //QUE SON NOTAS Y NO SON PALABRAS, PENDIENTE HACER ALGO PARECIDO


  }

  getUltimateguitar() {
    let version;
    this.props.cleanApiFetch();
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
    this.props.fields.content.onChange('⇄');
    const name = this.state.fetchName.trim().toLowerCase().replace(/ /g,"_").concat(version);
    const artist = this.state.fetchArtist.trim().toLowerCase().replace(/ /g,"_");
    this.props.fetchUltimateguitar(name,artist);
    //EN LA CUERDA LAS NOTAS ESTAN ENTRE LOS <A></A> PARA QUE ASI EL SISTEMA SEPA
    //QUE SON NOTAS Y NO SON PALABRAS, PENDIENTE HACER ALGO PARECIDO



  }


  handleNameChange(event) {
    this.setState({
      fetchName : event.target.value
    });
  }

  handleArtistChange(event) {
    this.setState({
      fetchArtist : event.target.value
    });
  }

  handleVersionChange(event) {
    this.setState({version: event.target.value});
  }

  findUnknownCharacter(event) {
    try{
    if(event.target.value.search("�") !== -1){
      this.setState({ cleanLabel: this.props.language.cleanLabel })
    }
    else {
      this.setState({ cleanLabel: '' })
    }
    }
    catch (err) {

    }
  }

  focusFindUnknownCharacter() {
    try {
      if (this.props.fields.content.value === "⇄"){
        if (this.props.ultimateguitar) {
          if(this.props.ultimateguitar.search("�") !== -1){
            this.setState({ cleanLabel: this.props.language.cleanLabel })
          }
          else {
            this.setState({ cleanLabel: '' })
          }
        }
        else if (this.props.lacuerda) {
          if(this.props.lacuerda.search("�") !== -1){
            this.setState({ cleanLabel: this.props.language.cleanLabel })
          }
          else {
            this.setState({ cleanLabel: '' })
          }
        }

      }
      else {
        if(this.props.fields.content.value.search("�") !== -1){
          this.setState({ cleanLabel: this.props.language.cleanLabel })
        }
        else {
          this.setState({ cleanLabel: '' })
        }
      }
    }
    catch (err) {

    }
  }

  handleContentChange(event) {
    this.findUnknownCharacter(event);
    this.props.fields.content.onChange(event.target.value);
  }

  isNote(string) {
    if (string) {
    if (string.indexOf("<A>") !== -1) {
      return true;
    }
    else if (string.indexOf("<span>") !== -1) {
      return true;
    }
    }
    return false;
  }

  // handleEditorChange(e) {
  //   // console.log(e.target.getContent());
  //   // console.log(this.props.fields.content.value);
  //   // e.target.setContent(this.props.fields.content.value);
  //   // e.target.setContent(e.target.getContent());
  //   // e.target.setContent('penesito')
  //   this.props.fields.content.onChange(e.target.getContent());
  //   try{
  //   e.target.setContent(this.props.fields.content.value);
  //   }
  //   catch (err){
  //
  //   }
  // }

  componentWillMount() {
    this.state = {fetchName: '', fetchArtist: '', input: 'scale', version: '1', selection: 0, video: {id: '' , allow: false} };
  }

  componentWillUnmount() {
    this.props.cleanApiFetch();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  YoutubeSearch(event) {
    // console.log(event);
    this.setState({ video: { allow: this.state.video.allow, id: event[0].id.videoId } })
  }

  toggleYoutube() {
    let artist = "";

    if(this.state.fetchName){
      if (this.state.fetchArtist) {
        artist = this.state.fetchArtist;
      }
    YTSearch({
       key: API_KEY,
       query: this.state.fetchName+' '+artist,
       maxResults: 1
     },
         this.YoutubeSearch.bind(this)
     );

     this.setState({ video: { id: this.state.video.id, allow: true } });
    }
  }

  render() {
    const url = `https://www.youtube.com/embed/${this.state.video.id}`;

    const { fields: { title, scale, content }, handleSubmit, language } = this.props;

    const { c, csharp, d, dsharp, e, f, fsharp, g, gsharp, a, asharp, b, linebreak, erase, space, diamond, riseup, risedown, submit, cancel } = language.buttons;

    return (
    <form className="formBody" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>{language.titleHeader}</h3>

        <div className={`form-group ${title.touched && title.value==='' ? 'has-error' : ''}`}>
          <label>{language.titleLabel}</label>
          <input type="text" className="form-control" value={title.value || ''}
            defaultChecked={title.defaultChecked} name={title.name} onBlur={title.onBlur} onChange={title.onChange} onDragStart={title.onDragStart} onDrop={title.onDrop} onFocus={title.onFocus} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${scale.touched && scale.value==='' ? 'has-error' : ''}`}>
          <label>{language.scaleLabel}</label>
          <input type="text" alt="scaleee" className="form-control" value={scale.value || ''} onFocus={(event)=> {this.setState({input:'scale'});}}
            onSelect={(event) => {this.setState({ selection: event.target.selectionEnd });}} defaultChecked={scale.defaultChecked} name={scale.name} onBlur={scale.onBlur} onChange={scale.onChange} onDragStart={scale.onDragStart} onDrop={scale.onDrop} />
          <div className="text-help">
            {scale.touched ? scale.error : ''}
          </div>
        </div>

        <div className={`form-group`}>
          <label>{language.contentLabel}</label>
          <textarea className="form-control content-area" rows="6"
            value={(content.value === "⇄") ? (this.props.ultimateguitar || this.props.lacuerda) : content.value}
            onFocus={(event)=> {this.setState({input:'content'}); this.focusFindUnknownCharacter();}} onChange={this.handleContentChange.bind(this)}
            onSelect={(event) => {this.setState({ selection: event.target.selectionEnd });}} defaultChecked={content.defaultChecked} name={content.name} onBlur={content.onBlur} onDragStart={content.onDragStart} onDrop={content.onDrop} />
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
          <div className="btn btn-primary center-block" onClick={()=>this.onRise(-1)}>{risedown}</div>
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
            <select defaultValue="1" onChange={this.handleVersionChange.bind(this)} className="form-control select-fetch">
              <option className="version-select" value='1'>{language.select.v1}</option>
              <option className="version-select" value="2">{language.select.v2}</option>
              <option className="version-select" value="3">{language.select.v3}</option>
              <option className="version-select" value="4">{language.select.v4}</option>
              <option className="version-select" value="5">{language.select.v5}</option>
            </select>
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
          <div className="col-xs-4">
          <input type="text" className="form-control field-fetch" value={this.state.fetchName} onChange={this.handleNameChange.bind(this)} placeholder={language.fetchNamePlaceholder} />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change('\n')}>{linebreak}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={()=> this.Erase()}>{erase}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <input type="text" className="form-control field-fetch" value={this.state.fetchArtist} onChange={this.handleArtistChange.bind(this)} placeholder={language.fetchArtistPlaceholder} />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(' ')}>{space}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block btn-note" onClick={() => this.Change(diamond)}>{diamond}</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="alert alert-info text-center fetch-label">{this.props.fetchError ? (language.errorLabel+this.props.fetchError) : language.fetchLabel}</div>
          </div>
          <div className="col-xs-4">
            <div className="btn btn-info center-block btn-fetch" onClick={() => this.getUltimateguitar()}>{language.ultimateguitarButton}</div>
            <br/>
            <div className="btn btn-info center-block btn-fetch" onClick={() => this.getLaCuerda()}>{language.lacuerdaButton}</div>
            <br/>
            <div className="btn btn-info center-block btn-fetch" onClick={() => this.toggleYoutube()}>{language.youtubeButton}</div>
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
          <div className="btn btn-danger hidden"></div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
            </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <div className="text-center">{this.state.cleanLabel ? <div className="alert alert-danger text-center clean-label">{this.state.cleanLabel}</div> : '' } </div>
          </div>
          <div className="col-xs-4">
            {
              (!(title.value) && !(scale.value) && !(content.value))
              ?
              <div className="btn btn-warning center-block" onClick={()=>this.onCancelConfirm()}>{cancel}</div>
              :
              <Confirm
                onConfirm={this.onCancelConfirm.bind(this)}
                body={language.cancelQuestionLabel}
                confirmText={language.cancelButtonConfirm}
                cancelText={language.cancelButtonCancel}
                title={language.cancelLabel}>
                <div className="btn btn-warning center-block">{cancel}</div>
              </Confirm>
            }

          </div>
        </div>
        <hr/>

        {
          this.state.video.allow
          ?
          <div>
          <span className="glyphicon glyphicon-remove pull-right x-right" aria-hidden="true" onClick={() => this.setState({ video: { id: this.state.video.id, allow: false } })}/>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={url} />
          </div>
          <hr/>
          </div>

          :
          <div />

        }

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
    ultimateguitar: state.library.ultimateguitar,
    language: state.library.language.new,
    fetchError: state.library.fetchError
  }
}

export default reduxForm({
  form: 'NewForm',
  fields: ['title', 'scale', 'content'],
  validate
}, mapStateToProps, { createSong, fetchLacuerda, fetchUltimateguitar, cleanApiFetch })(New);
