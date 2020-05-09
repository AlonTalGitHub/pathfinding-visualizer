import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PathfindingVisualizer from '../PathfindingVisualizer';
import Node from '../../Node/Node'

Enzyme.configure({ adapter: new Adapter() });
// import { render, fireEvent } from "@testing-library/react";


describe('PathfindingVsualizer', () => {
    const wrapper = mount(<PathfindingVisualizer />);
    const table = wrapper.find('table');
    const row = table.find('tr')
    const node = table.find(Node);
    
    it('table grid', () => {
        // expect(columns).toHaveLength(2);
        expect(table).toHaveLength(1);
        expect(row).toHaveLength(25);
        expect(node).toHaveLength(1500);
    });
});