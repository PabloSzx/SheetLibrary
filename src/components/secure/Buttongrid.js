import React, { Component } from 'react';

class Buttongrid extends Component{
  render() {
    return(
      <div>

      <div className="row">
        <div className="col-xs-2">
        <div className="btn btn-primary center-block">C</div>
      </div>
        <div className="col-xs-2">
        <div className="btn btn-primary center-block">C#</div>
      </div>
        <div className="col-xs-2">
        <div className="btn btn-primary center-block">D</div>
        </div>
        <div className="col-xs-2">
        <div className="btn btn-primary hidden"></div>
      </div>
      <div className="col-xs-4">
      <div className="btn btn-primary center-block">Subir 1 Tono</div>
    </div>
    </div>
    <br/>
    <div className="row">
      <div className="col-xs-2">
      <div className="btn btn-primary center-block">D#</div>
    </div>
      <div className="col-xs-2">
      <div className="btn btn-primary center-block">E</div>
    </div>
      <div className="col-xs-2">
      <div className="btn btn-primary center-block">F</div>
      </div>
      <div className="col-xs-2">
      <div className="btn btn-primary hidden"></div>
    </div>
    <div className="col-xs-4">
    <div className="btn btn-primary center-block">Bajar 1 Tono</div>
  </div>
  </div>
  <br/>
  <div className="row">
    <div className="col-xs-2">
    <div className="btn btn-primary center-block">F#</div>
  </div>
    <div className="col-xs-2">
    <div className="btn btn-primary center-block">G</div>
  </div>
    <div className="col-xs-2">
    <div className="btn btn-primary center-block">G#</div>
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
  <div className="btn btn-primary center-block">A</div>
</div>
  <div className="col-xs-2">
  <div className="btn btn-primary center-block">A#</div>
</div>
  <div className="col-xs-2">
  <div className="btn btn-primary center-block">B</div>
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
  <div className="btn btn-primary center-block">\n</div>
</div>
  <div className="col-xs-2">
  <div className="btn btn-primary center-block">{"<-"}</div>
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
  <div className="btn btn-primary center-block">[ ]</div>
</div>
  <div className="col-xs-3">
  <div className="btn btn-primary center-block">Ctr+Z</div>
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
  <div className="btn btn-primary center-block">Actualizar</div>
  </div>
  <div className="col-xs-4">
  <div className="btn btn-primary hidden">Actualizar</div>
</div>
<div className="col-xs-4">
<div className="btn btn-danger center-block">Borrar</div>
</div>
</div>
<br/>

</div>

    );
  }
}

export default Buttongrid;
