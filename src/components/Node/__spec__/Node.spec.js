import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Node from '../Node';
 
Enzyme.configure({ adapter: new Adapter() });

describe('Node', () => {
    const wrapper = shallow(<Node />);
    const node = wrapper.find('td');
    it('table grid cell', () => {
        expect(node).toHaveLength(1);        
    });
    it('check Node props', () => {
        expect(node.prop('className').trim()).toBe('node');
    });
});