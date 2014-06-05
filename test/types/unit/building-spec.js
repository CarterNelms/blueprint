/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');

var User;
var Location;
var Building;
var existingUser;
var existingLocation;

describe('Building', function(){
  before(function(done){
    db(function(){
      User = traceur.require(__dirname + '/../../../app/models/user.js');
      Location = traceur.require(__dirname + '/../../../app/models/location.js');
      Building = traceur.require(__dirname + '/../../../app/models/building.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      global.nss.db.collection('locations').drop(function(){
        global.nss.db.collection('buildings').drop(function(){
          User.create({email:'sue@sue.com', _id: '0123456789abcdef01234568', password: '1234'},function(user){
            existingUser = user;
            Location.create({name: 'zambia', rate: 25}, function(location){
              existingLocation = location;
              factory('building', function(buildings){
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('.create', function(){
    it('should successfully create a building', function(done){
      Building.create({name: 'death star', x: 100, y: 150, locationId:existingLocation._id, userId: existingUser._id}, function(b){
        expect(b).to.be.ok;
        expect(b).to.be.an.instanceof(Building);
        expect(b._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(b.name).to.be.equal('death star');
        expect(b.x).to.be.equal(100);
        expect(b.y).to.be.equal(150);
        expect(b.locationId).to.be.an.instanceof(Mongo.ObjectID);
        expect(b.userId).to.be.an.instanceof(Mongo.ObjectID);
        expect(b.userId).to.deep.equal(existingUser._id);
        expect(b.locationId).to.deep.equal(existingLocation._id);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should successfully find one building', function(done){
      Building.create({name: 'death star', x: 100, y: 150, locationId:existingLocation._id, userId: existingUser._id}, function(building){
        Building.findById(building._id, function(b){
          expect(b).to.be.ok;
          expect(b).to.be.an.instanceof(Building);
          expect(b._id).to.be.an.instanceof(Mongo.ObjectID);
          done();
        });
      });
    });

    it('should NOT successfully find one building with a non-existing ID', function(done){
      Building.findById('123456789012345678901234', function(b){
        expect(b).to.be.null;
        done();
      });
    });

    it('should NOT successfully find one building with a bad ID', function(done){
      Building.findById('bad ID', function(b){
        expect(b).to.be.null;
        done();
      });
    });

    it('should NOT successfully find one building with a null ID', function(done){
      Building.findById(null, function(b){
        expect(b).to.be.null;
        done();
      });
    });
  });

  describe('.findAll', function()
  {
    it('should find all buildings', function(done)
    {
      Building.findAll(function(buildings)
      {
        expect(buildings).to.have.length(5);
        expect(buildings[0]).to.be.ok;
        expect(buildings[0]).to.be.instanceof(Building);
        done();
      });
    });
  });

});