import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class OrganizationForm extends Component {

  organizationTypes = [
    { value: 'PRO', label: 'Organisation professionnelle' },
    { value: 'SCO', label: '√Čtablissement scolaire' },
    { value: 'SUP', label: '√Čtablissement sup√©rieur' },
  ];

  @tracked selectedOrganizationType;

  @action
  selectOrganizationType(organizationType) {
    this.selectedOrganizationType = organizationType;
    this.args.organization.type = organizationType.value;
  }
}
