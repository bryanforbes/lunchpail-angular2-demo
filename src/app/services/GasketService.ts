import { Observable } from 'angular2/angular2';
import Gasket from '../models/Gasket';

abstract class GasketService {
	abstract getGaskets(): Observable<Gasket[]>;
	abstract getGasket(index: number | string): Observable<Gasket>;
}

export default GasketService;
