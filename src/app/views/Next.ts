import { Component } from 'angular2/angular2';

@Component({
	selector: 'next',
	template: `
		<div class="header">
			<ng-content select="header"></ng-content>
		</div>
		<div class="body">
			<ng-content select="main"></ng-content>
		</div>
		<div class="footer">
			<ng-content select="footer"></ng-content>
		</div>
	`
})
export default class Next {
}
