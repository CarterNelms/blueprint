var buldingCollection = global.nss.db.collection('buildings');
var Mongo = require('mongodb');
var _ = require('lodash');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');

class Building{
  constructor(obj)
  {
    this.name = obj.name;
    this.x = obj.x;
    this.y = obj.y;
    this.locationId = Mongo.ObjectID(obj.locationId);
    this.userId = Mongo.ObjectID(obj.userId);
  }

  static create(obj, fn)
  {
    Base.create(obj, buldingCollection, Building, fn);
  }

  static findById(id, fn)
  {
    Base.findById(id, buldingCollection, Building, fn);
  }

  static findAll(fn)
  {
    Base.findAll(buldingCollection, Building, fn);
  }

  static findAllByUserId(userId, fn)
  {
    if(typeof userId === 'string')
    {
      if(userId.length !== 24)
      {
        fn(null);
        return;
      }
      userId = Mongo.ObjectID(userId);
    }

    if(!(userId instanceof Mongo.ObjectID))
    {
      fn(null);
      return;
    }

    buldingCollection.findOne({userId: userId}, (e, building)=>
    {
      if(building)
      {
        building = _.create(Building.prototype, building);
        fn(building);
      }
      else
      {
        fn(null);
      }
    });
  }
}

module.exports = Building;
