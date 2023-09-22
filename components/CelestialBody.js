class celestialBody {
  _NAME = null;

  _body = null;

  _EARTH_DAY = (2 * Math.PI) / 365;

  _ROTATION_FACTOR = null;
  _REVOLUTION_FACTOR = null;

  _AXIS_TILT_CONSTANT = Math.PI / 180;
  _AXIS_TILT_FACTOR = null;

  _ANGLE = null;
  _DISTANCE_FROM_CENTER = null;

  getCelestialBody() {
    return this._body;
  }

  rotate() {
    this._body.rotation.y += this._EARTH_DAY * this._ROTATION_FACTOR;
  }

  revolve() {
    this._ANGLE += this._EARTH_DAY * this._REVOLUTION_FACTOR;

    this._body.position.x = Math.sin(this._ANGLE) * this._DISTANCE_FROM_CENTER;
    this._body.position.z = Math.cos(this._ANGLE) * this._DISTANCE_FROM_CENTER;
  }

  _tilt() {
    this._body.rotation.x = this._AXIS_TILT_CONSTANT * this._AXIS_TILT_FACTOR;
  }
}

export default celestialBody;
