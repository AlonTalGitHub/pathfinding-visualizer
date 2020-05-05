import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Node from '../Node';
 
Enzyme.configure({ adapter: new Adapter() });

describe('Node', () => {
    const wrapper = shallow(<Node />);
    const td = wrapper.find('td');
    it('table grid cell', () => {
        expect(td).toHaveLength(1);        
    });
});