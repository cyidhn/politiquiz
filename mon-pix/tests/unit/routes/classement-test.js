import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | classement', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:classement');
    expect(route).to.be.ok;
  });
});
