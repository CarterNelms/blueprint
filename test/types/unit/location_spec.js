/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');

var Location;

describe('Location', function(){
  before(function(done){
    db(function(){
      Location = traceur.require(__dirname + '/../../../app/models/location.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('locations').drop(function(){
      factory('location', function(locations){
        done();
      });
    });
  });

  describe('.create', function(){
    it('should successfully create a location', function(done){
      Location.create({name: 'nashville', rate: 100}, function(l){
        expect(l).to.be.ok;
        expect(l).to.be.an.instanceof(Location);
        expect(l._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(l.name).to.be.equal('nashville');
        expect(l.rate).to.be.equal(100);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should successfully find one location', function(done){
      Location.create({name: 'nashville', rate: 100}, function(location){
        Location.findById(location._id, function(l){
          expect(l).to.be.ok;
          expect(l).to.be.an.instanceof(Location);
          expect(l._id).to.be.an.instanceof(Mongo.ObjectID);
          expect(l.name).to.be.equal('nashville');
          expect(l.rate).to.be.equal(100);
          done();
        });
      });
    });

    it('should NOT successfully find one location with a non-existing ID', function(done){
      Location.findById('123456789012345678901234', function(l){
        expect(l).to.be.null;
        done();
      });
    });

    it('should NOT successfully find one location with a bad ID', function(done){
      Location.findById('bad ID', function(l){
        expect(l).to.be.null;
        done();
      });
    });

    it('should NOT successfully find one location with a null ID', function(done){
      Location.findById(null, function(l){
        expect(l).to.be.null;
        done();
      });
    });
  });

  describe('.findAll', function()
  {
    it('should find all locations', function(done)
    {
      Location.findAll(function(locations)
      {
        expect(locations).to.have.length(5);
        expect(locations[0]).to.be.ok;
        expect(locations[0]).to.be.instanceof(Location);
        done();
      });
    });
  });

});