const chai   = require('chai');
const sinon  = require('sinon');
const expect = chai.expect;

const CanCan = require('../index');

const getResourceName = (req) => req.baseUrl;
const getPolicyFake = (policy) => () => policy
const fakeRequest = { jwt: 'emixsupertoken', baseUrl: '/emix' };

describe('CanCan', () => {

  it.skip('It should call getResourceName with the parameter request', () => {
    const fakePolicy = {};
    const Can = CanCan({ getResourceName: getResourceNameMock });


    const can = Can(getPolicyFake, 'jwt');
    // Vérification que getResourceName soit bien call
  });

  describe('The before policy function should take the control', () => {

    it('It should calls the before function with the corrects arguments', () => {
      const fakePolicy = {
        before: () => true,
        show: () => false
      };
      const fakeData = {};

      const beforeSpy = sinon.spy(fakePolicy, 'before');

      const can = CanCan(fakePolicy);
      can(fakeRequest.jwt)('show')(fakeData);
      expect(beforeSpy.withArgs(fakeRequest.jwt, fakeData).calledOnce, 'The before function should be always call with the request token and the data').to.be.true;
      beforeSpy.restore();
    });

    it('It should returns true when the before function returns true, even if the action function returns false because this function should\'t be called', () => {
      const fakePolicy = {
        before: () => true,
        show: () => false
      };
      const fakeData = {};

      const spy = sinon.spy(fakePolicy, 'show');

      const can = CanCan(fakePolicy);

      expect(spy.called, "The action policy function shouldn't be called when the before function returns true").to.be.false;

      const result = can(fakeRequest)('show')(fakeData);
      expect(result).to.be.true;
      spy.restore();
    });

  });

  it('It should returns true if the action function is undefined into the Policy (even if the before function returns true)', () => {
    const fakePolicy = {
      before: () => false,
    };
    const fakeData = {};

    const can = CanCan(fakePolicy);

    const result = can(fakeRequest)('show')(fakeData);
    expect(result).to.be.true;
  });

});
