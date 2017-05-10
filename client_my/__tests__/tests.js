// import React from 'react';
// import { expect } from 'chai';
// const UsersList = require ('../containers/components/UsersList');
// import React from 'react';
// import expect from 'chai';
// import renderer from 'react-test-renderer';
const LoadingPage = require( '../containers/LoadingPage');
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

const assert = require('assert');
describe('LoadingPage', function() {
    describe('getElementsByClassName()', function() {
        it('should return 1 in LoadingPage', function() {
            assert.equal(1, LoadingPage.prototype.testing());
        });
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