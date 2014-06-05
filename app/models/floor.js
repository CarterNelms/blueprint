var floorCollection = global.nss.db.collection('floors');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');
var fs = require('fs');
// var path = require('path');

class Floor
{
  constructor(obj)
  {
    this.name = obj.name[0];
    this.rate = obj.rate[0];
    this.photo = obj.photo[0].originalFilename;

    var imgDir = __dirname + '/../../app/static/img/flooring/';

    if(fs.existsSync(imgDir))
    {
      fs.renameSync(obj.photo[0].path, __dirname + '/../../app/static/img/flooring/' + obj.photo[0].originalFilename);
    }
  }

  static create(obj, fn)
  {
    Base.create(obj, floorCollection, Floor, fn);
  }

  static findById(id, fn)
  {
    Base.findById(id, floorCollection, Floor, fn);
  }

  static findAll(fn)
  {
    Base.findAll(floorCollection, Floor, fn);
  }
}

module.exports = Floor;