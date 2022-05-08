import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {shallow, configure, mount } from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { DogCreate } from './components/create/DogCreate';
import * as types from './redux/types/types'
// import * as actions from './redux/actions/actions'

// configure({ adapter: new Adapter() });

describe('Tests on <DogCreate />', () => { 
  
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
  // const { GET_TEMPERAMENTS } = types;
  const temperaments = [{id:5, temperament: 'Active'}, {id:2, temperament: 'Adaptable'}]

  describe('Create dog form html tags', () => { 
    let createDog;
    let store = mockStore(state, temperaments);
    beforeEach(() => {
      createDog = mount(
          <Provider store={store}>
             <MemoryRouter initialEntries={['/dogs/create']}>
                <DogCreate />
             </MemoryRouter>
          </Provider>,
       );
    });
    
    it('Must render a form.', () => {
      expect(createDog.find('form').length).toBe(1);
    });

    it('Must render a label with text Name"', () => {
      expect(createDog.find('label').at(0).text()).toEqual('Name:  ');
   });

    it('Must render an input type text name "name"', () => {
        expect(createDog.find('input[name="name"]').length).toBe(1);
        expect(createDog.find('input[type="text"]').length).toBe(2);
    });

    it('Must render labels with texts "Weight", "max" and "min"', () => {
      expect(createDog.find('label').at(1).text()).toBe(' Weight ');
      expect(createDog.find('label').at(2).text()).toBe(' min: ');
      expect(createDog.find('label').at(3).text()).toBe(' max: ');
    });
    it('Must render labels with texts "Height", "max" and "min"', () => {
      expect(createDog.find('label').at(4).text()).toBe(' Height ');
      expect(createDog.find('label').at(5).text()).toBe(' min: ');
      expect(createDog.find('label').at(6).text()).toBe(' max: ');
    });
    it('Must render labels with texts "Life expectancy", "max" and "min"', () => {
      expect(createDog.find('label').at(7).text()).toBe(' Life expectancy ');
      expect(createDog.find('label').at(8).text()).toBe(' min: ');
      expect(createDog.find('label').at(9).text()).toBe(' max: ');
    });
    it('Must rednder six inputs type number', () => {
      expect(createDog.find('input[name="weightMin"]').length).toBe(1);
      expect(createDog.find('input[name="weightMax"]').length).toBe(1);
      expect(createDog.find('input[name="heightMin"]').length).toBe(1);
      expect(createDog.find('input[name="heightMax"]').length).toBe(1);
      expect(createDog.find('input[name="life_spanMin"]').length).toBe(1);
      expect(createDog.find('input[name="life_spanMax"]').length).toBe(1);
      expect(createDog.find('input[type="number"]').length).toBe(6);
    });
    it('Must render all the inicial error spans', () => {
      expect(createDog.find('span').at(0).text()).toBe('  Required');
      expect(createDog.find('span').at(1).text()).toBe('  min: Required ');
      expect(createDog.find('span').at(2).text()).toBe('  max: Required');
      expect(createDog.find('span').at(3).text()).toBe('  min: Required ');
      expect(createDog.find('span').at(4).text()).toBe('  max: Required');
      expect(createDog.find('span').at(5).text()).toBe('');
    });
    it('Must render the tags for new temperaments',() => {
      expect(createDog.find('label').at(10).text()).toBe('New temperament: ');
      expect(createDog.find('input[name="addTemp"]').length).toBe(1);
      expect(createDog.find('button[type="button"]').length).toBe(1);
      expect(createDog.find('button[name="addNewTemperament"]').text()).toBe('  add');
    })

    it('Must render one checkbox for each database temperament',() => {
      expect(createDog.find('input[name="newTemperaments"]').length).toBe(0); //Inicialemnte, hasta que cargue lo temperamentos tiene que ser cero
    });
    it('Must render the submit input',() => {
      expect(createDog.find('input[type="submit"]').length).toBe(1); 
      expect(createDog.find('input[value="Create"]').length).toBe(1); 
      
    });
  });
  describe('Local states management', () => { 
    let useState, useStateSpy, createDog;
    let store = mockStore(state, temperaments);
    beforeEach(() => {
      useState = jest.fn();
       useStateSpy = jest.spyOn(React, 'useState');
       useStateSpy.mockImplementation((initialState) => [
          initialState,
          useState
       ]);

       createDog = mount(
        <Provider store={store}>
           <MemoryRouter initialEntries={['/dogs/create']}>
              <DogCreate />
           </MemoryRouter>
        </Provider>,
     );
       
    });

    it('It should correctly initialize the form values',() => {
      expect(useStateSpy).toHaveBeenCalledWith({
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
      });
    });

    describe('name input', () => {
      it('Must recognize when there is a change in the value of the input "name"', () =>{
        createDog.find('input[name="name"]').simulate('change', {
          target:{name: 'name', value: 'Perro de las Pampas'}
        });
        expect(useState).toHaveBeenCalledWith({
          name: 'Perro de las Pampas',
          weightMin: '',
          weightMax: '',
          heightMin:'',
          heightMax:'',
          life_spanMin:'',
          life_spanMax: '',
          temp:[],
          addTemp: '',
          newTemps: []
        });
      });
      
    });
    describe('Input weightMin and WeightMax', () => {
      it('Must recognize when there is a change in the value of the input "weightMin" and "weightMax"', () =>{
        createDog.find('input[name="weightMin"]').simulate('change', {
          target:{name: 'weightMin', value: 10}
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          weightMin: 10,
          weightMax: '',
          heightMin:'',
          heightMax:'',
          life_spanMin:'',
          life_spanMax: '',
          temp:[],
          addTemp: '',
          newTemps: []
        });
        createDog.find('input[name="weightMax"]').simulate('change', {
          target:{name: 'weightMax', value: 10}
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          weightMin: '',
          weightMax: 10,
          heightMin:'',
          heightMax:'',
          life_spanMin:'',
          life_spanMax: '',
          temp:[],
          addTemp: '',
          newTemps: []
        });
      });
    });
    describe('Input heightMin and heightMax', () => {
      it('Must recognize when there is a change in the value of the input "heightMin" and "heightMax"', () =>{
        createDog.find('input[name="heightMin"]').simulate('change', {
          target:{name: 'heightMin', value: 25}
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          weightMin: '',
          weightMax: '',
          heightMin:25,
          heightMax:'',
          life_spanMin:'',
          life_spanMax: '',
          temp:[],
          addTemp: '',
          newTemps: []
        });
        createDog.find('input[name="heightMax"]').simulate('change', {
          target:{name: 'heightMax', value: 35}
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          weightMin: '',
          weightMax: '',
          heightMin:'',
          heightMax:35,
          life_spanMin:'',
          life_spanMax: '',
          temp:[],
          addTemp: '',
          newTemps: []
        });
      });
    });
    describe('Input life_spanMin and life_spanMax', () => {
      it('Must recognize when there is a change in the value of the input "life_spanMin" and "life_spanMax"', () =>{
        createDog.find('input[name="life_spanMin"]').simulate('change', {
          target:{name: 'life_spanMin', value: 10}
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          weightMin: '',
          weightMax: '',
          heightMin:'',
          heightMax:'',
          life_spanMin:10,
          life_spanMax: '',
          temp:[],
          addTemp: '',
          newTemps: []
        });
        createDog.find('input[name="life_spanMax"]').simulate('change', {
          target:{name: 'life_spanMax', value: 15}
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          weightMin: '',
          weightMax: '',
          heightMin:'',
          heightMax:'',
          life_spanMin:'',
          life_spanMax: 15,
          temp:[],
          addTemp: '',
          newTemps: []
        });
      });
    });
    describe('Add new temperament', () => {
      it('Must recognize when there is a change in the value of the input "addTemp"', () =>{
        createDog.find('input[name="addTemp"]').simulate('change', {
          target:{name: 'addTemp', value: 'Amigable'}
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          weightMin: '',
          weightMax: '',
          heightMin:'',
          heightMax:'',
          life_spanMin:'',
          life_spanMax: '',
          temp:[],
          addTemp: 'Amigable',
          newTemps: []
        });
      });


    });
  });
});


//ESTO ERA LO QUE VENÍA HECHO //por las dudas NO BORRAR
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
