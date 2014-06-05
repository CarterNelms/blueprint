var Mongo = require('mongodb');
var _ = require('lodash');

class Base
{
  static create(obj, collection, Model, fn)
  {
    var object = new Model(obj);
    collection.save(object, ()=>fn(object));
  }

  static findAll(collection, Model, fn)
  {
    collection.find().toArray((e, objs)=>
    {
      if(objs)
      {
        objs = objs.map(o=>_.create(Model.prototype, o));
        fn(objs);
      }
      else
      {
        fn(null);
      }
    });    
  }

  static findById(id, collection, Model, fn)
  {
    if(typeof id === 'string')
    {
      if(id.length !== 24)
      {
        fn(null);
        return;
      }
      id = Mongo.ObjectID(id);
    }

    if(!(id instanceof Mongo.ObjectID))
    {
      fn(null);
      return;
    }

    collection.findOne({_id:id}, (e,o)=>
    {
      if(o)
      {
        o = _.create(Model.prototype, o);
        fn(o);
      }
      else
      {
        fn(null);
      }
    });
  }
}

module.exports = Base;