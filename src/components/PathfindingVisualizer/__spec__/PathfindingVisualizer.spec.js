import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PathfindingVisualizer from '../PathfindingVisualizer';
import Node from '../../Node/Node'
 
Enzyme.configure({ adapter: new Adapter() });
// import { render, fireEvent } from "@testing-library/react";


describe('PathfindingVsualizer', () => {
    const wrapper = shallow(<PathfindingVisualizer />);
    const table = wrapper.find('table');
    const row = shallow(<tr/>)
    const node = shallow(<td/>)

    it('table grid', () => {
        expect(table).toHaveLength(1);
        expect(row).toHaveLength(1);
        expect(node).toHaveLength(1);
    });
});