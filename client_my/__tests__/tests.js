// import React from 'react';
// import { expect } from 'chai';
// const UsersList = require ('../containers/components/UsersList');
// import React from 'react';
// import expect from 'chai';
// import renderer from 'react-test-renderer';
const LoadingPage = require( '../containers/LoadingPage');
// const Login = require( '../containers/LoadingPage');
const Admin = require( '../containers/Admin');
const React = require('react');
// import React from 'react';
// import {shallow, mount} from 'enzyme';
// const assert = require('chai');
const sinon = require('sinon');
const mount = require('enzyme');
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
// import { shallow, mount, render } from 'enzyme';
// import muiTheme from 'themes/base';

// describe("A suite", function() {
//
//
//     it("2nd", function() {
//         expect(shallow(LoadingPage).is('.foo')).to.equal(false);
//     });
//
//     it("3rd", function() {
//         expect(mount(LoadingPage).find('.foo').length).to.equal(0);
//     });
// });

const assertMocha = require('assert');
describe('LoadingPage', function() {
    describe('getElementsByClassName()', function() {
        it('should return 1 in LoadingPage', function() {
            assertMocha.equal(1, LoadingPage.prototype.testing());
        });
    });
});

    describe('<Admin/>', function() {
        it('calls componentDidMount() lifecycle method', function() {
            const componentDidMountSpy = sinon.spy(Admin.prototype, 'componentDidMount');
            // chai.assert.ok(Admin.prototype.componentDidMount.calledOnce);
            componentDidMountSpy.restore();
        });
    });

// test('Can see header', () => {
//     const component = renderer.create(
//         <ExitBtn/>
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });

// describe('<ExitBtn />', () => {
//
//     it('calls componentDidMount', () => {
//         // const wrapper = mount(ExitBtn);
//         // expect(ExitBtn.prototype.componentDidMount.calledOnce).to.equal(false);
//     });
//
// });