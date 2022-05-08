import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {shallow, configure, mount } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { DogCard } from './components/card/DogCard';
// import * as types from './redux/types/types'


describe('Tests on <DogCard />', () => {
    const state = {
        name: '',
        weightMin: '',
        weightMax: '',
        heightMin:'',
        heightMax:'',
        life_spanMin:'',
        life_spanMax: '',
        temp:[],
        addTemp: '',
        newTemps: []
      }
    const mockStore = configureStore([thunk]);
    let showDog;
    let store = mockStore(state);
    let dog = {
        id: 1,
        name: 'Afghan Hound',
        weight: '23 - 27',
        temperament: 'Aloof, Clownish, Dignified, Independent, Happy',
        image: 'https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg'
    }
    beforeEach(() => {
        showDog = ( dog ) => mount(
          <Provider store={store}>
             <MemoryRouter >
                <DogCard 
                key = { dog.id }
                id = { dog.id }
                name = { dog.name }
                weight =  { dog.weight }
                temperament = { dog.temperament }
                image = { dog.image }
                />
             </MemoryRouter>
          </Provider>,
       );
    });

    afterEach(() => jest.restoreAllMocks());
    describe('Structure', () => {

        it('Must reder the name', () => {
            const wrapper = showDog(dog);
            expect(wrapper.find('h3').at(0).text()).toBe(dog.name);
        });

        it('Must render the dog picture', () => {
            const wrapper = showDog(dog);
            expect(wrapper.find('img').prop('src')).toBe(dog.image);
            expect(wrapper.find('img').prop('alt')).toBe(dog.name);
        });
        it('Must render the weight', () => {
            const wrapper = showDog(dog);
            expect(wrapper.find('span').at(0).text()).toBe(`Weight: ${ dog.weight } kg`);
            
        });
        it('Must render the temperaments', () => {
            const wrapper = showDog(dog);
            expect(wrapper.find('span').at(1).text()).toBe(dog.temperament);
            
        });
        it('Must render the link to the dog detail', () => {
            const wrapper = showDog(dog);
            expect(wrapper.find('span').at(2).text()).toBe(`Details`);
            expect(wrapper.find('Link').prop('to')).toBe(`/dogs/detail/${dog.id}`);
            
        });

        it('Must render three divs', () => {
            const wrapper = showDog(dog);
            expect(wrapper.find('div').length).toBe(3);
        });
    })
})