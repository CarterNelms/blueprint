var bcrypt = require('bcrypt');
var userCollection = global.nss.db.collection('users');
var Mongo = require('mongodb');
// var _ = require('lodash');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');

class User{
  constructor(obj)
  {
    this._id = Mongo.ObjectID(obj._id);
    this.email = obj.email;
    this.password = bcrypt.hashSync(obj.password, 8);
  }

  static create(obj, fn){
    userCollection.findOne({email:obj.email}, (e,u)=>
    {
      if(!u){
        Base.create(obj, userCollection, User, fn);
      }else{
        fn(null);
      }
    });
  }

  static login(obj, fn){
    userCollection.findOne({email:obj.email}, (e,u)=>{
      if(u){
        var isMatch = bcrypt.compareSync(obj.password, u.password);
        if(isMatch){
          fn(u);
        }else{
          fn(null);
        }
      }else{
        fn(null);
      }
    });
  }

  static findById(id, fn)
  {
    Base.findById(id, userCollection, User, fn);
  }

  static findAll(fn)
  {
    Base.findAll(userCollection, User, fn);
  }
}

module.exports = User;
