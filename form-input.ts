import {Component, Input, forwardRef, Output, EventEmitter} from '@angular/core';
import {ModeledForm} from 'modules/modeled-form/modeled-form';
import {DataService} from 'modules/data-service/data-service';

@Component({
	selector:					'form-input',
	template:					`
		<div class="form-group">
			<label (click)="hideSubform(property.value)" [ngClass]="{'col-sm-2': !parentIsArray, 'col-sm-1': parentIsArray, 'hover-open': isArrayOrObject(property.value)}">{{property.key}}:</label>
			<div [ngClass]="{'col-sm-10': !parentIsArray, 'col-sm-11': parentIsArray}" class="flex-container-row">
				<div *ngIf="!showSubform" [ngClass]="{'input-group': button}" class="flex-item">
					<input *ngIf="!isArrayOrObject(property.value)" type="text" class="form-control flex-item" placeholder="{{property.alias || property.key}}" [(ngModel)]="property.value">
					<span *ngIf="button" class="input-group-btn"><button class="btn btn-primary" type="button" (click)="addProperty(property.value)">Save</button></span>
					<p *ngIf="isArrayOrObject(property.value) && !showSubform" (click)="hideSubform(property.value)" [ngClass]="{'hover-open': isArrayOrObject(property.value)}">{{property.value.name}}</p>
				</div>
				<modeled-form *ngIf="isArrayOrObject(property.value) && showSubform" [formObject]="property.value"></modeled-form>
				<i class="fa fa-trash red-text fa-lg" *ngIf="!button" (click)="removeProperty(property.key)"></i>
			</div>
		</div>
	`,
	styles:					[`
		.form-group {margin-bottom: 5px;}
		.hover-open:hover {cursor: pointer; text-decoration: underline;}
		i {margin: auto 5px; cursor: pointer;}
		label {margin: auto 0;}
	`],
	directives:			[forwardRef(() => ModeledForm)]
})

export class FormInput {
	@Input() property;
	@Input() parentIsArray:boolean = false;
	@Input() button:boolean = false;
	@Output() addArrayItem = new EventEmitter();

	constructor(data: DataService) {
		this.data = data;
	}

	isArrayOrObject = (val) => {return typeof val === 'object' && val !== null;}
	hideSubform = (val) => {if (this.isArrayOrObject(val)) {this.showSubform = !this.showSubform;} else {return false;}}
	addProperty = (x) => {
		this.data.addClassProperty("Article", x).subscribe(res => {this.addArrayItem.emit(res);});
	}
	removeProperty = (x) => {
		console.log(x);
	}
}