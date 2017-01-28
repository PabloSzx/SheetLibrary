import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import _ from 'lodash';
import { updateSong, deleteSong } from '../../actions/index';
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
    this.context.router.push('/dashboard');
  }

  onRise(n) {
    const objective = this.state.input;
    _.map(this.props.fields,to => {
      if (to.name === objective) {
      if (to.value) {
        to.onChange(rise(to.value,n))
      }
    }
    });
  }

  componentWillMount() {
    // var instance = axios.create({
    //   baseURL: 'http://alloworigin.com/',
    //   timeout: 5000,
    //   headers: {'Access-Control-Allow-Origin': '192.168.1.1:3000'}
    // });

    // instance.get('v2/songs/?query="pillar"').then(function(response){
    //   console.log(response.data.objects);
    // })


    // var asd = axios.get("http://alloworigin.com/get?url=http://acordes.lacuerda.net/marco_barrientos/de_gloria_en_gloria.shtml&callback=foo&tor=1")
    // .then(function(response){
    //   console.log(response.respondWith());
    // });
    // console.log(instance.get());
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

  }

  render() {
    const { fields: { title, scale, content }, handleSubmit } = this.props;
    return (
    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Edit Song</h3>

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
          <textarea {...content} className="form-control" onFocus={()=> this.setState({input:'content'})} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

      {/* Buttons */}

      <div>

        <div className="row">
            <div className="col-xs-2">
            <div className="btn btn-primary center-block" onClick={() => this.Change('C')}>C</div>
          </div>
            <div className="col-xs-2">
            <div className="btn btn-primary center-block" onClick={() => this.Change('C#')}>C#</div>
          </div>
            <div className="col-xs-2">
            <div className="btn btn-primary center-block" onClick={() => this.Change('D')}>D</div>
            </div>
            <div className="col-xs-2">
            <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-primary center-block" onClick={()=>this.onRise(1)}>Subir 1 Tono</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Change('D#')}>D#</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Change('E')}>E</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Change('F')}>F</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-primary center-block"onClick={()=>this.onRise(-1)}>Bajar 1 Tono</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Change('F#')}>F#</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Change('G')}>G</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Change('G#')}>G#</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">Responsive</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">Responsive</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Change('A')}>A</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Change('A#')}>A#</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Change('B')}>B</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">Responsive</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">Responsive</div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Change('\n')}>\n</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary center-block" onClick={() => this.Erase()}>{"<-"}</div>
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
          <div className="btn btn-primary center-block" onClick={() => this.Change(' ')}>[ ]</div>
          </div>
          <div className="col-xs-3">
          <div className="btn btn-primary hidden">Ctr+Z</div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-2">
          <div className="btn btn-primary hidden">Responsive</div>
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
          {/* <div type="submit"  className="btn btn-primary center-block">Submit</div> */}
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-primary hidden"></div>
          </div>
          <div className="col-xs-4">
          <div className="btn btn-danger center-block" onClick={() => this.removeSong()}>Delete</div>
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
// connect: first argument is mapstatetoprops, 2nd is mapdispatchtoprops
// reduxform: 1st is form config, 2nd is mapstatetoprops, 3ds is mapdispatchtoprops

function mapStateToProps(state) {
  return {
    auth: state.auth.user,
    library: state.library,
    routing: state.routing
  }
}

export default reduxForm({
  form: 'NewForm',
  fields: ['title', 'scale', 'content'],
  validate
}, mapStateToProps, { updateSong, deleteSong })(Edit);
