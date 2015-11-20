import { provide, Observable } from 'angular2/angular2';
import Gasket from '../models/Gasket';
import GasketService from './GasketService';
import { ReplaySubject } from '@reactivex/rxjs';

export default class MockGasketService extends GasketService {
	private gaskets: Map<number, Gasket>;

	constructor() {
		super();

		this.gaskets = new Map<number, Gasket>();
		this.gaskets.set(0, new Gasket({ id: 0, outerDiameter: 50, innerDiameter: 10 }));
		this.gaskets.set(1, new Gasket({ id: 1, outerDiameter: 20, innerDiameter: 5 }));
	}

	getGaskets(): Observable<Gasket[]> {
		const iter = this.gaskets.values();
		const gaskets: Gasket[] = [];
		while (true) {
			const result = iter.next();
			if (result.done) {
				break;
			}
			gaskets.push(result.value);
		}
		const o = new ReplaySubject<Gasket[]>(1);
		o.next(gaskets);
		return o;
	}

	getGasket(index: number | string): Observable<Gasket> {
		let indexAsNumber: number;
		if (typeof index === 'string') {
			indexAsNumber = parseInt(index, 10);
		}
		else {
			indexAsNumber = index;
		}
		const o = new ReplaySubject<Gasket>(1);
		o.next(this.gaskets.get(indexAsNumber));
		return o;
	}
}

export const GASKET_SERVICE_PROVIDER = [
	provide(GasketService, { useClass: MockGasketService })
];
