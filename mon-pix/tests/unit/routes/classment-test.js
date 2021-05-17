import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | classment', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:classment');
    expect(route).to.be.ok;
  });
});
