import { Component, Input, FORM_DIRECTIVES } from 'angular2/angular2';
import Gasket from '../models/Gasket';

@Component({
	selector: 'gasket-form',
	templateUrl: 'package:app/components/GasketForm.html',
	directives: [ FORM_DIRECTIVES ]
})
export default class GasketForm {
	@Input() private gasket: Gasket;

	onSubmit() {
		console.log(this.gasket);
	}
}
