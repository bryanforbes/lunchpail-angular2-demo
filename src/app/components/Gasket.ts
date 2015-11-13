import { Component, Input } from 'angular2/angular2';

@Component({
	selector: 'gasket',
	templateUrl: 'package:app/components/Gasket.html',
	styleUrls: [ 'package:app/components/Gasket.css' ]
})
export default class Gasket {
	@Input() private outerDiameter: number;
	@Input() private innerDiameter: number;

	private get strokeWidth(): number {
		if (isNaN(this.outerDiameter) || isNaN(this.innerDiameter)) {
			return 0;
		}
		return this.outerDiameter - this.innerDiameter;
	}
}
