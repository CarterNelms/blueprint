var locationCollection = global.nss.db.collection('locations');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');

class Location
{
  constructor(obj)
  {
    this.name = obj.name;
    this.rate = obj.rate;
  }

  static create(obj, fn)
  {
    Base.create(obj, locationCollection, Location, fn);
  }

  static findById(id, fn)
  {
    Base.findById(id, locationCollection, Location, fn);
  }

  static findAll(fn)
  {
    Base.findAll(locationCollection, Location, fn);
  }
}

module.exports = Location;