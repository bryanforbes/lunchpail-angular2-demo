import { Component, UrlResolver, bootstrap, provide, FORM_PROVIDERS } from 'angular2/angular2';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { ELEMENT_PROBE_PROVIDERS } from 'angular2/angular2';

import Index from './views/Index';
import Next from './views/Next';
import GasketViewer from './views/GasketViewer';
import GasketCreator from './views/GasketCreator';
import { GASKET_SERVICE_PROVIDER } from './services/HttpGasketService';

export class AppUrlResolver extends UrlResolver {
	resolve(baseUrl: string, url: string): string {
		if (url.startsWith('package:app/')) {
			return 'dist/' +  url.substring(8);
		}
		return super.resolve(baseUrl, url);
	}
}

@Component({
	selector: 'app',
	templateUrl: 'package:app/main.html',
	styleUrls: [ 'package:app/main.css' ],
	directives: [ ROUTER_DIRECTIVES ]
})
@RouteConfig([
	{ path: '/', redirectTo: '/index' },
	{ path: '/index', component: Index, as: 'Index' },
	{ path: '/next', component: Next, as: 'Next' },
	{ path: '/gaskets', component: GasketViewer, as: 'GasketList' },
	{ path: '/gaskets/creator/...', component: GasketCreator, as: 'GasketCreator' },
	{ path: '/gaskets/:id', component: GasketViewer, as: 'GasketItem' },
])
export class App { }

bootstrap(App, [
	GASKET_SERVICE_PROVIDER,
	provide(UrlResolver, { useValue: new AppUrlResolver() }),
	FORM_PROVIDERS,
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy }),
	ELEMENT_PROBE_PROVIDERS
]);
