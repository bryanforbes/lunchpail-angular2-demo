import { Component, AsyncPipe, Observable, CORE_DIRECTIVES } from 'angular2/angular2';
import { RouterLink, ComponentInstruction } from 'angular2/router';
import Gasket from '../models/Gasket';
import GasketService from '../services/GasketService';
import GasketComponent from '../components/Gasket';
import GasketModelForm from '../components/GasketModelForm';

@Component({
	selector: 'gasket-viewer',
	templateUrl: 'package:app/views/GasketViewer.html',
	styleUrls: [ 'package:app/views/GasketViewer.css' ],
	directives: [ CORE_DIRECTIVES, GasketComponent, GasketModelForm, RouterLink ],
	pipes: [ AsyncPipe ]
})
export default class GasketViewer {
	private gasketService: GasketService;
	private gaskets: Observable<Gasket[]>;
	private gasket: Observable<Gasket>;
	private loading: boolean = false;

	constructor(gasketService: GasketService) {
		this.gasketService = gasketService;
	}

	canReuse() {
		return true;
	}

	onActivate(instruction: ComponentInstruction) {
		this.onRouterAction(instruction);
	}

	onReuse(instruction: ComponentInstruction) {
		this.onRouterAction(instruction);
	}

	private onRouterAction(instruction: ComponentInstruction) {
		const id = instruction.params['id'];
		if (id != null) {
			if (!this.gaskets) {
				this.gaskets = this.gasketService.getGaskets();
			}
			this.gasket = this.gasketService.getGasket(id);
			this.loading = true;
			this.gasket.subscribe(() => {
				this.loading = false;
			});
		}
		else {
			this.gaskets = this.gasketService.getGaskets();
			this.gasket = null;
		}
	}

	private onGasketChange(value: any) {
		console.log(value);
	}
}
