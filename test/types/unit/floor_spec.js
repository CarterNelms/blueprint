/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
// var factory = traceur.require(__dirname + '/../../helpers/factory.js');
var cp = require('child_process');
var fs = require('fs');

var Floor;

describe('Floor', function(){
  before(function(done){
    db(function(){
      Floor = traceur.require(__dirname + '/../../../app/models/floor.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('floors').drop(function(){
      // factory('floor', function(floors){
        cp.execFile(__dirname + '/../../fixtures/clean.sh', {cwd: __dirname + '/../../fixtures'}, function(err, stdout, stderr)
        {
          console.log(stdout);
          done();
        });
      // });
    });
  });

  describe('.create', function()
  {
    it('should create a new floor', function(done)
    {
      var fields = {name:['tile'], rate:['4.35']};
      var files = {photo:[{originalFilename: 'tile.png', path: __dirname + '/../../fixtures/copy/tile.png'}]};
      fields.photo = files.photo;


      Floor.create(fields, function(f){
        expect(f).to.be.ok;
        expect(f).to.be.an.instanceof(Floor);
        expect(f._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(f.name).to.be.equal('tile');
        expect(f.rate).to.be.within(4.34, 4.36);
        expect(f.photo).to.be.equal('tile.png');
        var path = __dirname + '/../../../app/static/img/flooring/' + f.photo;
        var doesExist = fs.existsSync(path);
        expect(doesExist).to.be.true;
        if(doesExist)
        {
          fs.unlinkSync(path);
        }
        done();
      });
    });
  });

  describe('.findAll', function()
  {
    it('should find all floors', function(done)
    {
      var fields = {name:['tile'], rate:['4.35']};
      var files = {photo:[{originalFilename: 'tile.png', path: __dirname + '/../../fixtures/copy/tile.png'}]};
      fields.photo = files.photo;


      Floor.create(fields, function(f){
        Floor.findAll(function(floors){
          expect(floors).to.have.length(1);
          expect(floors[0]).to.be.instanceof(Floor);

          var path = __dirname + '/../../../app/static/img/flooring/' + floors[0].photo;
          var doesExist = fs.existsSync(path);
          expect(doesExist).to.be.true;
          if(doesExist)
          {
            fs.unlinkSync(path);
          }

          done();
        });
      });
    });
  });

  describe('.findById', function()
  {
    it('should find one floor by its ID', function(done)
    {
      var fields = {name:['tile'], rate:['4.35']};
      var files = {photo:[{originalFilename: 'tile.png', path: __dirname + '/../../fixtures/copy/tile.png'}]};
      fields.photo = files.photo;


      Floor.create(fields, function(f){
        Floor.findById(f._id, function(floor){
          expect(floor).to.be.ok;
          expect(floor).to.be.instanceof(Floor);

          var path = __dirname + '/../../../app/static/img/flooring/' + floor.photo;
          var doesExist = fs.existsSync(path);
          expect(doesExist).to.be.true;
          if(doesExist)
          {
            fs.unlinkSync(path);
          }
          
          done();
        });
      });
    });
    
    it('should NOT find one floor by a non-existing ID', function(done)
    {
      var fields = {name:['tile'], rate:['4.35']};
      var files = {photo:[{originalFilename: 'tile.png', path: __dirname + '/../../fixtures/copy/tile.png'}]};
      fields.photo = files.photo;


      Floor.create(fields, function(f){
        Floor.findById('123456789012345678901234', function(floor){
          expect(floor).to.be.null;

          var doesExist;
          
          if(floor)
          {
            var path = __dirname + '/../../../app/static/img/flooring/' + floor.photo;
            doesExist = fs.existsSync(path);
            expect(doesExist).to.be.false;
            if(doesExist)
            {
              fs.unlinkSync(path);
            }
          }
          var existingFloorPath = __dirname + '/../../../app/static/img/flooring/' + f.photo;
          doesExist = fs.existsSync(existingFloorPath);
          if(doesExist)
          {
            fs.unlinkSync(existingFloorPath);
          }
          
          done();
        });
      });
    });
    
    it('should NOT find one floor by an invalid ID', function(done)
    {
      var fields = {name:['tile'], rate:['4.35']};
      var files = {photo:[{originalFilename: 'tile.png', path: __dirname + '/../../fixtures/copy/tile.png'}]};
      fields.photo = files.photo;


      Floor.create(fields, function(f){
        Floor.findById('bad id', function(floor){
          expect(floor).to.be.null;

          var doesExist;
          
          if(floor)
          {
            var path = __dirname + '/../../../app/static/img/flooring/' + floor.photo;
            doesExist = fs.existsSync(path);
            expect(doesExist).to.be.false;
            if(doesExist)
            {
              fs.unlinkSync(path);
            }
          }
          var existingFloorPath = __dirname + '/../../../app/static/img/flooring/' + f.photo;
          doesExist = fs.existsSync(existingFloorPath);
          if(doesExist)
          {
            fs.unlinkSync(existingFloorPath);
          }
          
          done();
        });
      });
    });
    
    it('should NOT find one floor by a null ID', function(done)
    {
      var fields = {name:['tile'], rate:['4.35']};
      var files = {photo:[{originalFilename: 'tile.png', path: __dirname + '/../../fixtures/copy/tile.png'}]};
      fields.photo = files.photo;


      Floor.create(fields, function(f){
        Floor.findById(null, function(floor){
          expect(floor).to.be.null;

          var doesExist;
          
          if(floor)
          {
            var path = __dirname + '/../../../app/static/img/flooring/' + floor.photo;
            doesExist = fs.existsSync(path);
            expect(doesExist).to.be.false;
            if(doesExist)
            {
              fs.unlinkSync(path);
            }
          }
          var existingFloorPath = __dirname + '/../../../app/static/img/flooring/' + f.photo;
          doesExist = fs.existsSync(existingFloorPath);
          if(doesExist)
          {
            fs.unlinkSync(existingFloorPath);
          }
          
          done();
        });
      });
    });
  });
});