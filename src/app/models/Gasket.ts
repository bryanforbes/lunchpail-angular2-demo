import { Validators } from 'angular2/angular2';

export interface GasketArgs {
	id: number;
	outerDiameter?: number;
	innerDiameter?: number;
}

export default class Gasket {
	static validators = {
		innerDiameter: Validators.required,
		outerDiameter: Validators.required
	};

	id: number = -1;
	outerDiameter: number = 1;
	innerDiameter: number = 0;

	constructor(args: GasketArgs) {
		Object.assign(this, args);
	}
}
