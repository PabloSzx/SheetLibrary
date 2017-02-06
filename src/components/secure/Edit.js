import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import Confirm from 'react-confirm-bootstrap';
import YTSearch from 'youtube-simple-search';

import { updateSong, deleteSong, deselectPost } from '../../actions/index';
import rise from './rise';
import { sortMap, bubbleSort } from './Sort';


const API_KEY = 'AIzaSyDDjF0K9vkZRndsg59p7b5f4H5D77YUyyw';


class Edit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {cleanLabel: '', fetchArtist: '', video: {id: '' , allow: false} , changed: false };
  }

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

    const key = this.props.routing.locationBeforeTransitions.pathname.substring(8);
    this.props.updateSong(key, trimProps, this.props.auth.uid);
    this.context.router.push('/dashboard');
    }
  }

  Change(value){
    const zero = String.fromCharCode(8900);
    const objective = this.state.input;
    let input;
    if ((value !== zero) && (value !== '\n') && (value !== " ")) {input = zero+value+zero}
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
          this.setState({ cleanLabel: this.props.language.cleanLabel });
        }
        else {
          this.setState({ cleanLabel: '' });
        }
      }
    }
    catch (err) {

    }
  }

  YoutubeSearch(event) {
    // console.log(event);
    this.setState({ video: { allow: this.state.video.allow, id: event[0].id.videoId } })
  }

  toggleYoutube() {
    let artist = "";

    if(this.props.fields.title.value){
      if (this.state.fetchArtist) {
        artist = this.state.fetchArtist;
      }
    YTSearch({
       key: API_KEY,
       query: this.props.fields.title.value+' '+artist,
       maxResults: 1
     },
         this.YoutubeSearch.bind(this)
     );

     this.setState({ video: { id: this.state.video.id, allow: true } });
    }
  }

  Sort() {
    try {
    const zero = String.fromCharCode(8900);
    let a = this.props.fields.scale.value.trim().replace(/⋄/g,'').split(' ');
    const tonica = a[0].toLowerCase();
    let map = sortMap[tonica];

    _.map(a,(value,index)=>{
      a[index] = map[value.toLowerCase()];
    });


    a = _.filter(a, (n) => n !== undefined);
    
    bubbleSort(a);
    _.map(a,(value,index)=>{
      _.map(map, (val,key)=>{
        if (val === a[index]) a[index]=zero+key.toUpperCase()+zero;
      })
    });
    this.props.fields.scale.onChange(a.join(' '));
    }
    catch (err) {

    }

  }

  handleContentChange(event) {
    this.findUnknownCharacter(event);
    if (!this.state.changed) {
      this.setState({ changed: true });
    }
    this.props.fields.content.onChange(event.target.value);
  }

  handleTitleChange(event) {
    if (!this.state.changed) {
      this.setState({ changed: true });
    }
    this.props.fields.title.onChange(event.target.value);
  }

  handleScaleChange(event) {
    if (!this.state.changed) {
      this.setState({ changed: true });
    }
    this.props.fields.scale.onChange(event.target.value);
  }

  handleArtistChange(event) {
    this.setState({
      fetchArtist : event.target.value
    });
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

    this.setState({ selection: thisSong.scale.length })

    window.scrollTo(0, 0);

  }

  render() {
    const url = `https://www.youtube.com/embed/${this.state.video.id}`;
    const { fields: { title, scale, content }, handleSubmit, language } = this.props;
    const { c, csharp, d, dsharp, e, f, fsharp, g, gsharp, a, asharp, b, linebreak, erase, space, diamond, riseup, risedown, scaleSort, submit, cancel } = language.buttons;
    return (
    <form className="formBody" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>{language.titleHeader}</h3>

        <div className={`form-group ${title.touched && title.value==='' ? 'has-error' : ''}`}>
          <label>{language.titleLabel}</label>
          <input type="text" className="form-control" value={title.value || ''}
            defaultChecked={title.defaultChecked} name={title.name} onBlur={title.onBlur} onChange={this.handleTitleChange.bind(this)} onDragStart={title.onDragStart} onDrop={title.onDrop} onFocus={title.onFocus} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${scale.touched && scale.value==='' ? 'has-error' : ''}`}>
          <label>{language.scaleLabel}</label>
          <input type="text" className="form-control" value={scale.value || ''} onFocus={()=> this.setState({input:'scale'})}
            onSelect={(event) => {this.setState({ selection: event.target.selectionEnd });}} defaultChecked={scale.defaultChecked} name={scale.name} onBlur={scale.onBlur} onChange={this.handleScaleChange.bind(this)} onDragStart={scale.onDragStart} onDrop={scale.onDrop} />
          <div className="text-help">
            {scale.touched ? scale.error : ''}
          </div>
        </div>

        <div className={`form-group`}>
          <label>{language.contentLabel}</label>
          <textarea rows="6" className="form-control" onFocus={()=> {this.setState({input:'content'}); this.focusFindUnknownCharacter()}} onChange={this.handleContentChange.bind(this)}
            onSelect={(event) => {this.setState({ selection: event.target.selectionEnd });}} defaultChecked={content.defaultChecked} name={content.name} onBlur={content.onBlur} onDragStart={content.onDragStart} onDrop={content.onDrop} value={content.value}/>
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
            <div className="btn btn-primary center-block btn-note" onClick={() => this.Sort()}>{scaleSort}</div>
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
          <div className="col-xs-4">
          <input type="text" className="form-control field-fetch" value={this.state.fetchArtist} onChange={this.handleArtistChange.bind(this)} placeholder={language.fetchArtistPlaceholder} />
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
          <div className="col-xs-4">
            <div className="btn btn-info center-block btn-fetch" onClick={() => this.toggleYoutube()}>{language.youtubeButton}</div>
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
            <Confirm
              onConfirm={this.removeSong.bind(this)}
              body={language.deleteQuestionLabel}
              confirmText={language.deleteButtonConfirm}
              cancelText={language.deleteButtonCancel}
              title={language.deleteLabel}>
              <div className="btn btn-danger center-block">{language.deleteButton}</div>
            </Confirm>
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
          <div className="text-center">{this.state.cleanLabel ? <div className="alert alert-danger text-center clean-label">{this.state.cleanLabel}</div> : '' } </div>
          </div>
          <div className="col-xs-4">
            {
              !this.state.changed
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
            <iframe className="embed-responsive-item" src={url}/>
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
