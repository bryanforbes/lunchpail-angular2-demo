import { provide, Observable } from 'angular2/angular2';
import Gasket from '../models/Gasket';
import GasketService from './GasketService';
import MockGasketService from './MockGasketService';

export default class AsyncGasketService extends MockGasketService {
	constructor() {
		super();
	}

	getGaskets(): Observable<Gasket[]> {
		return Observable.create((observer) => {
			super.getGaskets().subscribe((gasket) => {
				setTimeout(() => {
					observer.next(gasket);
				}, 2000);
			});
		}).publishReplay(1, Infinity).refCount();
	}

	getGasket(index: number | string): Observable<Gasket> {
		return Observable.create((observer) => {
			super.getGasket(index).subscribe((gasket) => {
				setTimeout(() => {
					observer.next(gasket);
				}, 2000);
			});
		}).publishReplay(1, Infinity).refCount();
	}
}

export const GASKET_SERVICE_PROVIDER = [
	provide(GasketService, { useClass: AsyncGasketService })
];
