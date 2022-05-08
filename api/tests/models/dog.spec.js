const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name and weight and height are sent.', () => {
        Dog.create({ 
          name: 'Pug', 
          weightMin: 1,
          weightMax: 1,
          heightMin: 1,
          heightMax: 1,
        })
          .then(() => done())
          .catch(() => done(new Error('Not null violation')))
      });
      it('should not work when its a repeted name', (done) => {
        Dog.bulkCreate([{ name: 'Pug', weightMin: 1, weightMax: 1, heightMin: 1, heightMax: 1 }, { name: 'Pug', weightMin: 1, weightMax: 1, heightMin: 1, heightMax: 1 }])
          .then(() =>  done(new Error('It requires a unique name')))
          .catch(() =>  done())

      });
      it('should not work if  heightMax is not sent.', (done) => {
        Dog.create({ name: 'New Dog', weightMin: 1, weightMax: 1, heightMin: 1 })
          .then(() => done(new Error('Not null violation. It requires heightMax')))
          .catch((e) => done());
      });
      it('should not work if heightMin is not sent.', (done) => {
        Dog.create({ name: 'New Dog', weightMin: 1, weightMax: 1, heightMax: 1 })
          .then(() => done(new Error('Not null violation. It requires heightMin')))
          .catch(() => done());
      });
      it('should not work if weightMin is not sent.', (done) => {
        Dog.create({ name: 'New Dog', heightMin: 1, weightMax: 1, heightMax: 1 })
          .then(() => done(new Error('Not null violation. It requires weightMin')))
          .catch(() => done());
      });
      it('should not work if weightMax is not sent.', (done) => {
        Dog.create({ name: 'New Dog', heightMin: 1, weightMin: 1, heightMax: 1 })
          .then(() => done(new Error('Not null violation. It requires weightMax')))
          .catch(() => done());
      });

      it('should not work when weightMin is not a number', (done) => {
        Dog.create({ name: 'Pug', weightMin: 'abc', weightMax: 1, heightMin: 1, heightMax: 1 })
          .then(() =>  done(new Error('weightMin must be a number')))
          .catch(() =>  done())

      });
      it('should not work when weightMax is not a number', (done) => {
        Dog.create({ name: 'Pug', weightMin: 25, weightMax: 'abc', heightMin: 1, heightMax: 1 })
          .then(() =>  done(new Error('weightMax must be a number')))
          .catch(() =>  done())
      });
      it('should not work when heightMin is not a number', (done) => {
        Dog.create({ name: 'Pug', weightMin: 25, weightMax: 30, heightMin: 'abc', heightMax: 1 })
          .then(() =>  done(new Error('heightMin must be a number')))
          .catch(() =>  done())
      });
      it('should not work when heightMax is not a number', (done) => {
        Dog.create({ name: 'Pug', weightMin: 25, weightMax: 30, heightMin: 10, heightMax: 'abc' })
          .then(() =>  done(new Error('heightMax must be a number')))
          .catch(() =>  done())
      });
      it('should not work when life_spanMax is not a number', (done) => {
        Dog.create({ name: 'Pug', weightMin: 25, weightMax: 30, heightMin: 10, heightMax: 15, life_spanMax: 'abc',life_spanMin: 15 })
          .then(() =>  done(new Error('life_spanMax must be a number')))
          .catch(() =>  done())
      });
      it('should not work when life_spanMin is not a number', (done) => {
        Dog.create({ name: 'Pug', weightMin: 25, weightMax: 30, heightMin: 10, heightMax: 15, life_spanMax: 10,life_spanMin: 'abc' })
          .then(() =>  done(new Error('life_spanMin must be a number')))
          .catch(() =>  done())
      });


    });
  });


});
