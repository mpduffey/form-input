"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var modeled_form_1 = require('modules/modeled-form/modeled-form');
var data_service_1 = require('modules/data-service/data-service');
var FormInput = (function () {
    function FormInput(data) {
        var _this = this;
        this.parentIsArray = false;
        this.button = false;
        this.addArrayItem = new core_1.EventEmitter();
        this.isArrayOrObject = function (val) { return typeof val === 'object' && val !== null; };
        this.hideSubform = function (val) { if (_this.isArrayOrObject(val)) {
            _this.showSubform = !_this.showSubform;
        }
        else {
            return false;
        } };
        this.addProperty = function (x) {
            _this.data.addClassProperty("Article", x).subscribe(function (res) { _this.addArrayItem.emit(res); });
        };
        this.removeProperty = function (x) {
            console.log(x);
        };
        this.data = data;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormInput.prototype, "property", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FormInput.prototype, "parentIsArray", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FormInput.prototype, "button", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FormInput.prototype, "addArrayItem", void 0);
    FormInput = __decorate([
        core_1.Component({
            selector: 'form-input',
            template: "\n\t\t<div class=\"form-group\">\n\t\t\t<label (click)=\"hideSubform(property.value)\" [ngClass]=\"{'col-sm-2': !parentIsArray, 'col-sm-1': parentIsArray, 'hover-open': isArrayOrObject(property.value)}\">{{property.key}}:</label>\n\t\t\t<div [ngClass]=\"{'col-sm-10': !parentIsArray, 'col-sm-11': parentIsArray}\" class=\"flex-container-row\">\n\t\t\t\t<div *ngIf=\"!showSubform\" [ngClass]=\"{'input-group': button}\" class=\"flex-item\">\n\t\t\t\t\t<input *ngIf=\"!isArrayOrObject(property.value)\" type=\"text\" class=\"form-control flex-item\" placeholder=\"{{property.alias || property.key}}\" [(ngModel)]=\"property.value\">\n\t\t\t\t\t<span *ngIf=\"button\" class=\"input-group-btn\"><button class=\"btn btn-primary\" type=\"button\" (click)=\"addProperty(property.value)\">Save</button></span>\n\t\t\t\t\t<p *ngIf=\"isArrayOrObject(property.value) && !showSubform\" (click)=\"hideSubform(property.value)\" [ngClass]=\"{'hover-open': isArrayOrObject(property.value)}\">{{property.value.name}}</p>\n\t\t\t\t</div>\n\t\t\t\t<modeled-form *ngIf=\"isArrayOrObject(property.value) && showSubform\" [formObject]=\"property.value\"></modeled-form>\n\t\t\t\t<i class=\"fa fa-trash red-text fa-lg\" *ngIf=\"!button\" (click)=\"removeProperty(property.key)\"></i>\n\t\t\t</div>\n\t\t</div>\n\t",
            styles: ["\n\t\t.form-group {margin-bottom: 5px;}\n\t\t.hover-open:hover {cursor: pointer; text-decoration: underline;}\n\t\ti {margin: auto 5px; cursor: pointer;}\n\t\tlabel {margin: auto 0;}\n\t"],
            directives: [core_1.forwardRef(function () { return modeled_form_1.ModeledForm; })]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof data_service_1.DataService !== 'undefined' && data_service_1.DataService) === 'function' && _a) || Object])
    ], FormInput);
    return FormInput;
    var _a;
}());
exports.FormInput = FormInput;
//# sourceMappingURL=form-input.js.map