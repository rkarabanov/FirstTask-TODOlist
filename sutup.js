import React from 'react';
import {shallow, mount} from 'enzyme';
import expect from 'expect';
import {spy} from 'sinon';

import Admin from './client_my/containers/Admin';

describe('Admin Comp',()=>{
   it('calls componentDidMount',()=>{
       spy(Profile.prototype,'componentDidMount');
       const wrapper = mount(<Profile/>);
       expect(Profile.prototype.componentDidMount.calledOnce).toEqual(true);
   });
});
