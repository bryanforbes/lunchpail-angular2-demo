import { provide, Observable } from 'angular2/angular2';
import Gasket from '../models/Gasket';
import GasketService from './GasketService';
import MockGasketService from './MockGasketService';
import { ReplaySubject } from '@reactivex/rxjs';

export default class AsyncGasketService extends MockGasketService {
	constructor() {
		super();
	}

	getGaskets(): Observable<Gasket[]> {
		const o = new ReplaySubject<Gasket[]>(1);
		setTimeout(() => {
			super.getGaskets().subscribe((gaskets) => {
				o.next(gaskets);
			});
		}, 2000);
		return o;
	}

	getGasket(index: number | string): Observable<Gasket> {
		const o = new ReplaySubject<Gasket>(1);
		setTimeout(() => {
			super.getGasket(index).subscribe((gasket) => {
				o.next(gasket);
			});
		}, 2000);
		return o;
	}
}

export const GASKET_SERVICE_PROVIDER = [
	provide(GasketService, { useClass: AsyncGasketService })
];
