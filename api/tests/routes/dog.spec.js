/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'DogPrueba',
  weightMin: 8,
  weightMax: 10,
  heightMin: 35,
  heightMax: 40
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));

    describe('GET /dogs', () => {
      it('should get 200', () =>
        agent.get('/dogs').expect(200)
        .expect('Content-Type', /json/)
        
      );
      it('should get the dog Pug from the api', () =>
      agent.get('/dogs?name=Pug').expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res){
        expect(res.body).to.eql([{
              height: "25 - 30",
              heightMax: 30,
              heightMin: 25,
              id: 201,
              image: "https://cdn2.thedogapi.com/images/HyJvcl9N7.jpg",
              life_span: "12 - 14 years",
              life_spanMin: 12,
              name: "Pug",
              temperament: "Docile, Clever, Charming, Stubborn, Sociable, Playful, Quiet, Attentive",
              weight: "6 - 8",
              weightMax: 8,
              weightMin: 6
            }])
      })
      );
      it('should get the dog DogPrueba from the db', () =>
        agent.get('/dogs?name=DogPrueba').expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res){
          expect(res.body[0].name).to.eql('Dogprueba')
          expect(res.body).to.have.length(1);
        })
      );
      it('should get all the dogs from the api', () =>
        agent.get('/dogs?source=api').expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res){
          expect(res.body).to.have.length(172);
        })
      );
      it('should get all the dogs from the db', () =>
        agent.get('/dogs?source=db').expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res){
          expect(res.body).to.have.length(1);
        })
      );
      it('should get all the dogs from the db and from the api', () =>
        agent.get('/dogs').expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res){
          expect(res.body).to.have.length(173);
        })
      );
      it('should get one dog from db', () =>
        agent.get('/dogs?name=dog&source=db').expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res){
          expect(res.body).to.have.length(1);
        })
      );
      it('should not get the dog from de api', () =>
        agent.get('/dogs?name=papillon&source=db').expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res){
          expect(res.body).to.have.length(0);
        })
      );
      it('should get the dog from de api', () =>
        agent.get('/dogs?name=papillon&source=api').expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res){
          expect(res.body).to.have.length(1);
        })
      );
      it('should get an error.', () =>
        agent.get('/do?name=papillon&source=api').expect(404)

      );
  });
});
