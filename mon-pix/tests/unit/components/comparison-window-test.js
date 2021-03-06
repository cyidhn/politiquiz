import EmberObject from '@ember/object';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupTest } from 'ember-mocha';
import setupIntl from '../../helpers/setup-intl';
import createGlimmerComponent from '../../helpers/create-glimmer-component';

describe('Unit | Component | comparison-window', function() {

  setupTest();
  setupIntl();

  let component;
  let answer;
  let resultItem;

  const challengeQroc = EmberObject.create({ type: 'QROC', autoReply: false });
  const challengeQrocWithAutoReply = EmberObject.create({ type: 'QROC', autoReply: true });
  const challengeQcm = EmberObject.create({ type: 'QCM' });
  const challengeQrocmInd = EmberObject.create({ type: 'QROCM-ind' });
  const challengeQrocmDep = EmberObject.create({ type: 'QROCM-dep' });

  beforeEach(function() {
    answer = EmberObject.create();
    component = createGlimmerComponent('component:comparison-window', { answer });
  });

  describe('#isAssessmentChallengeTypeQroc', function() {

    it('should be true when the challenge is QROC', function() {
      // given
      answer.set('challenge', challengeQroc);
      // when
      const isAssessmentChallengeTypeQroc = component.isAssessmentChallengeTypeQroc;
      // then
      expect(isAssessmentChallengeTypeQroc).to.be.true;
    });

    it('should be false when the challenge is not QROCM-ind', function() {
      // given
      answer.set('challenge', challengeQrocmInd);
      // when
      const isAssessmentChallengeTypeQroc = component.isAssessmentChallengeTypeQroc;
      // then
      expect(isAssessmentChallengeTypeQroc).to.be.false;
    });
  });

  describe('#isAssessmentChallengeTypeQcm', function() {

    it('should be true when the challenge is QCM', function() {
      // given
      answer.set('challenge', challengeQcm);
      // when
      const isAssessmentChallengeTypeQcm = component.isAssessmentChallengeTypeQcm;
      // then
      expect(isAssessmentChallengeTypeQcm).to.be.true;
    });

    it('should be false when the challenge is not QCM', function() {
      // given
      answer.set('challenge', challengeQroc);
      // when
      const isAssessmentChallengeTypeQcm = component.isAssessmentChallengeTypeQcm;
      // then
      expect(isAssessmentChallengeTypeQcm).to.be.false;
    });
  });

  describe('#isAssessmentChallengeTypeQrocmInd', function() {

    it('should be true when the challenge is QROCM-ind', function() {
      // given
      answer.set('challenge', challengeQrocmInd);
      // when
      const isAssessmentChallengeTypeQrocmInd = component.isAssessmentChallengeTypeQrocmInd;
      // then
      expect(isAssessmentChallengeTypeQrocmInd).to.be.true;
    });

    it('should be true when the challenge is not QROCM-ind', function() {
      // given
      answer.set('challenge', challengeQroc);
      // when
      const isAssessmentChallengeTypeQrocmInd = component.isAssessmentChallengeTypeQrocmInd;
      // then
      expect(isAssessmentChallengeTypeQrocmInd).to.be.false;
    });
  });

  describe('#isAssessmentChallengeTypeQrocmDep', function() {

    it('should be true when the challenge is QROCM-dep', function() {
      // given
      answer.set('challenge', challengeQrocmDep);
      // when
      const isAssessmentChallengeTypeQrocmDep = component.isAssessmentChallengeTypeQrocmDep;
      // then
      expect(isAssessmentChallengeTypeQrocmDep).to.be.true;
    });

    it('should be true when the challenge is not QROCM-dep', function() {
      // given
      answer.set('challenge', challengeQroc);
      // when
      const isAssessmentChallengeTypeQrocmDep = component.isAssessmentChallengeTypeQrocmDep;
      // then
      expect(isAssessmentChallengeTypeQrocmDep).to.be.false;
    });

  });

  describe('#resultItem', function() {
    beforeEach(function() {
      answer.set('challenge', challengeQcm);
    });

    [
      { validationStatus: 'unavailable (i.e. empty)', result: '', expectedTitle: '', expectedTooltip: 'Correction automatique en cours de d??veloppement ;)' },
      { validationStatus: 'unknown', result: 'xxx', expectedTitle: '', expectedTooltip: 'Correction automatique en cours de d??veloppement ;)' },
      { validationStatus: 'undefined', result: undefined, expectedTitle: '', expectedTooltip: 'Correction automatique en cours de d??veloppement ;)' },
      { validationStatus: 'ok', result: 'ok', expectedTitle: 'Vous avez la bonne r??ponse !', expectedTooltip: 'R??ponse correcte' },
      { validationStatus: 'ko', result: 'ko', expectedTitle: 'Vous n???avez pas la bonne r??ponse', expectedTooltip: 'R??ponse incorrecte' },
      { validationStatus: 'aband', result: 'aband', expectedTitle: 'Vous n???avez pas donn?? de r??ponse', expectedTooltip: 'Sans r??ponse' },
      { validationStatus: 'partially', result: 'partially', expectedTitle: 'Vous avez donn?? une r??ponse partielle', expectedTooltip: 'R??ponse partielle' },
      { validationStatus: 'timedout', result: 'timedout', expectedTitle: 'Vous avez d??pass?? le temps imparti', expectedTooltip: 'Temps d??pass??' },
    ].forEach((data) => {
      it(`should return adapted title and tooltip when validation is ${data.validationStatus}`, function() {
        // given
        answer.set('result', `${data.result}`);

        // when
        resultItem = component.resultItem;

        // then
        expect(this.intl.t(resultItem.title)).to.equal(`${data.expectedTitle}`);
        expect(this.intl.t(resultItem.tooltip)).to.equal(`${data.expectedTooltip}`);
      });
    });

    [
      { result: 'ko', expectedTitle: 'Vous n???avez pas r??ussi l?????preuve', expectedTooltip: '??preuve non r??ussie' },
      { result: 'ok', expectedTitle: 'Vous avez r??ussi l?????preuve', expectedTooltip: '??preuve r??ussie' },
      { result: 'aband', expectedTitle: 'Vous avez pass?? l?????preuve', expectedTooltip: '??preuve pass??e' },
    ].forEach((data) => {
      it(`should return adapted title and tooltip when challenge is auto validated and validation is ${data.result}`, function() {
        // given
        answer.set('result', `${data.result}`);
        answer.set('challenge', challengeQrocWithAutoReply);

        // when
        resultItem = component.resultItem;

        // then
        expect(this.intl.t(resultItem.title)).to.equal(`${data.expectedTitle}`);
        expect(this.intl.t(resultItem.tooltip)).to.equal(`${data.expectedTooltip}`);
      });
    });
  });
});
