webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/admin/admin.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".hightext{\r\n    font-weight:bold;\r\n}\r\n.inlinediv{\r\n    display: inline-block;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/admin.html":
/***/ (function(module, exports) {

module.exports = "    <div class=\"w3-container w3-blue w3-padding-24 \">\r\n        <h1 class=\"hightext\">Welcome Admin</h1>\r\n    </div>\r\n    <div class=\"w3-panel \">\r\n      <div class=\"inlinediv\">\r\n      <h3 class=\"hightext\">List Of Users</h3>\r\n      </div>\r\n    <div class=\"inlinediv\">\r\n      <input type=\"button\" class=\"w3-button w3-blue\" value=\"Update\" (click)=\"promoteToAdmin()\"/>\r\n    </div>\r\n    <div *ngIf=\"providerCookie!=''\">\r\n\t\t\t<input type=\"button\" (click) =\"logOut()\" class=\"w3-bar-item w3-btn w3-blue glyphicon glyphicon-log-out w3-right\" value=\"LogOut\"/>\r\n\t\t</div>\r\n    </div>\r\n<table class=\"table\">\r\n  <thead>\r\n    <tr class=\"w3-text-blue\">\r\n      <th>User Name</th>\r\n      <th>User Id</th>\r\n      <th>First Name</th>\r\n      <th>Last Name</th>\r\n      <th>Date Of Birth</th>\r\n      <th>Industry</th>\r\n      <th>Creation Date</th>\r\n      <th>Promote To Admin</th>\r\n    </tr>\r\n  </thead>\r\n    <tbody>\r\n      <tr *ngFor=\"let row of result\">\r\n        <td>{{ row.username}}</td>\r\n        <td>{{ row.id }}</td>\r\n        <td>{{ row.firstname }}</td>\r\n        <td>{{ row.lastname }}</td>\r\n        <td>{{ row.birthday }}</td>\r\n        <td>{{ row.industry }}</td>\r\n        <td>{{ row.creationDate }}</td>\r\n        <td>\r\n            <input type=\"checkbox\" id=\"{{row.id}}\" name=\"{{row.id}}\" value=\"{{row.id}}\" (change)=\"checked(row.id)\"/>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n</table>"

/***/ }),

/***/ "../../../../../src/app/admin/admin.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cookies__ = __webpack_require__("../../../../ng2-cookies/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_cookies__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminComponent = (function () {
    function AdminComponent(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        this.valuesForMove = [];
        this.cookies = __WEBPACK_IMPORTED_MODULE_3_ng2_cookies__["Cookie"].getAll();
        this.providerCookie = this.cookies["provider_cookie"];
        this.authcookie = this.cookies["AUTH-TOKEN"];
        this.headers.set("x-auth-token", this.authcookie);
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        this.http.post("/statelesssocial/api/user/showallusers", this.options)
            .map(function (res) { return res.json(); })
            .subscribe(function (json) {
            console.log(json);
            _this.result = json;
            _this.result.forEach(function (e) {
                if (e.role == 'admin') {
                    e.isAdmin = true;
                }
            });
            console.log(_this.result);
        }, function (err) {
            console.error(err);
        });
    }
    AdminComponent.prototype.promoteToAdmin = function () {
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('x-auth-token', this.authcookie);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        console.log(this.valuesForMove);
        var localData = [];
        this.valuesForMove.forEach(function (e) {
            localData.push({ userId: e });
        });
        this.http.post('/statelesssocial/api/user/promoteUsers', localData, options)
            .map(function (res) {
            res.json();
        }).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };
    AdminComponent.prototype.logOut = function () {
        this.providerCookie = '';
        this.cookies = null;
        this.authcookie = null;
        this.deleteCookie('AUTH-TOKEN');
        this.deleteCookie('provider_cookie');
        this.router.navigateByUrl('/login');
    };
    AdminComponent.prototype.deleteCookie = function (name) {
        this.setCookie(name, '', -1, '/');
    };
    AdminComponent.prototype.setCookie = function (name, value, expireDays, path) {
        if (path === void 0) { path = ''; }
        var d = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        var cpath = path ? "; path=" + path : '';
        document.cookie = name + "=" + value + "; " + expires + cpath;
    };
    AdminComponent.prototype.getCookie = function (name) {
        var ca = document.cookie.split(';');
        var caLen = ca.length;
        var cookieName = name + "=";
        var c;
        for (var i = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    };
    AdminComponent.prototype.checked = function (id) {
        this.valuesForMove.push(id);
        console.log(this.valuesForMove);
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: "user-view",
        template: __webpack_require__("../../../../../src/app/admin/admin.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/admin.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AdminComponent);

var _a, _b;
//# sourceMappingURL=admin.js.map

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guards_index__ = __webpack_require__("../../../../../src/app/guards/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__welcome_welcome__ = __webpack_require__("../../../../../src/app/welcome/welcome.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_index__ = __webpack_require__("../../../../../src/app/login/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_admin__ = __webpack_require__("../../../../../src/app/admin/admin.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__forgetPassword_index__ = __webpack_require__("../../../../../src/app/forgetPassword/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_4__login_index__["a" /* LoginComponent */] },
    { path: 'welcome', component: __WEBPACK_IMPORTED_MODULE_3__welcome_welcome__["a" /* WelcomeComponent */] },
    { path: 'test', component: __WEBPACK_IMPORTED_MODULE_3__welcome_welcome__["a" /* WelcomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__guards_index__["a" /* AuthGuard */]] },
    { path: '', redirectTo: 'test', pathMatch: 'full' },
    { path: 'adminPage', component: __WEBPACK_IMPORTED_MODULE_5__admin_admin__["a" /* AdminComponent */] },
    { path: 'forgetPassword', component: __WEBPACK_IMPORTED_MODULE_6__forgetPassword_index__["a" /* ForgetPasswordComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_2__guards_index__["a" /* AuthGuard */]
        ]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html")
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__welcome_welcome__ = __webpack_require__("../../../../../src/app/welcome/welcome.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__guards_index__ = __webpack_require__("../../../../../src/app/guards/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_index__ = __webpack_require__("../../../../../src/app/login/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__admin_admin__ = __webpack_require__("../../../../../src/app/admin/admin.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__forgetPassword_index__ = __webpack_require__("../../../../../src/app/forgetPassword/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__login_index__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_6__welcome_welcome__["a" /* WelcomeComponent */],
            __WEBPACK_IMPORTED_MODULE_9__admin_admin__["a" /* AdminComponent */],
            __WEBPACK_IMPORTED_MODULE_11__forgetPassword_index__["a" /* ForgetPasswordComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormsModule */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__guards_index__["a" /* AuthGuard */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/forgetPassword/forgetpassword.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/forgetPassword/forgetpassword.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n    \r\n    \r\n    <form (ngSubmit)=\"onSubmit(forgetPasswordForm.value)\" #forgetPasswordForm=\"ngForm\">\r\n            <h2 class=\"w3-text-blue w3-panel\">Please Enter the following details And Submit to fetch Security Question</h2>\r\n            <table style=\"border-collapse: collapse;border-spacing: 10px;\">\r\n                <tr>\r\n                    \r\n\t\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;margin-left:2%;\"><i\r\n\t\t\t\t\t\t\t\t\tclass=\"fa fa-user  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;margin-left:2%;\"><input\r\n\t\t\t\t\t\t\t\t\tplaceholder=\"User Name\" [(ngModel)]=\"userdetails.username\" name=\"username\" required\r\n\t\t\t\t\t\t\t\t\tstyle=\"width: 100%; border-radius: 25px;\" class=\"w3-input\"\r\n                                    type=\"text\" #username=\"ngModel\"/>\r\n                                <div [hidden]=\"username.valid || username.pristine\"   class=\"showerror\">\r\n\t\t\t\t\t\t\t\t\t\tusername required\r\n\t\t\t\t\t\t\t\t</div> \r\n                                </td>\t\r\n                </tr>\r\n            </table>\r\n            <input type=\"submit\" [disabled]=\"forgetPasswordForm.invalid\" value=\"Submit\" name=\"submit\" class=\"w3-button w3-blue\" />\r\n        </form>\r\n        <div *ngIf=\"secQuestionFlag=='no question found'\">\r\n            <h1> No Security Question Found </h1>\r\n        </div>\r\n        <div *ngIf=\"secQuestionFlag=='question found'\">\r\n            <h2 class=\"w3-text-blue w3-panel\"> Answer The Following Security Question for Password reset </h2>\r\n            <table>\r\n                <tr>\r\n                    <td  style=\"padding-bottom: 10%; padding-left: 2%;\"><b>Question: </b></td>\r\n                    <td  style=\"padding-bottom: 10%; padding-left: 2%;\"><b>{{regmodel.question}}</b></td>\r\n                </tr>\r\n                <tr>\r\n                    <td  style=\"padding-bottom: 10%; padding-left: 2%;\"><b>Answer: </b></td>\r\n                    <td  style=\"padding-bottom: 10%; padding-left: 2%;\"><input class=\"w3-input\" type=\"text\" id=\"originalAnswer\" name=\"originalAnswer\"/></td>\r\n                </tr>\r\n                <tr>\r\n                    <td><input type=\"hidden\" value=\"{{regmodel.answer}}\" id=\"hiddenAnswer\" name=\"hiddenAnswer\"></td>\r\n                    <td  style=\"padding-bottom: 10%; padding-left: 2%;\"><input type=\"button\" (click)=\"checkAnswer()\" value=\"Answer\" name=\"submit\" class=\"w3-button w3-blue\"/></td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n<div *ngIf=\"correctAnswer==true\">\r\n    <h2 class=\"w3-text-blue w3-panel\">Enter Your New Password</h2>\r\n    <form #changePasswordForm=\"ngForm\" (ngSubmit)=\"changePasswordFormSubmit(changePasswordForm.value)\">\r\n        <table>\r\n            <tr>\r\n                <td style=\"padding-bottom: 10%; padding-left: 2%;\"><input type=\"hidden\" #username=ngModel value=\"{{regmodel.username}}\" name=\"username\" [(ngModel)]=\"newregmodel.username\"/></td>\r\n                <td style=\"padding-bottom: 10%; padding-left: 2%;\"><input type=\"text\" #passwd=ngModel value=\"{{newregmodel.passwd}}\" name=\"passwd\" [(ngModel)]=\"newregmodel.passwd\"/></td>\r\n                <td style=\"padding-bottom: 10%; padding-left: 2%;\"> <input type=\"submit\" [disabled]=\"changePasswordForm.invalid\" value=\"Submit\" name=\"submit\" class=\"w3-button w3-blue\" /></td>\r\n            </tr>\r\n        </table>\r\n    </form>\r\n</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/forgetPassword/forgetpassword.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_UserDetails__ = __webpack_require__("../../../../../src/app/models/UserDetails.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_register_model__ = __webpack_require__("../../../../../src/app/login/register_model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ForgetPasswordComponent = (function () {
    function ForgetPasswordComponent(http, router) {
        this.http = http;
        this.router = router;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        this.userdetails = new __WEBPACK_IMPORTED_MODULE_3__models_UserDetails__["a" /* UserDetails */]();
        this.headers.set('Content-Type', 'application/json');
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        this.secQuestionFlag = 'empty';
        this.regmodel = new __WEBPACK_IMPORTED_MODULE_4__login_register_model__["a" /* RegistrationModel */]();
        this.newregmodel = new __WEBPACK_IMPORTED_MODULE_4__login_register_model__["a" /* RegistrationModel */]();
        this.correctAnswer = false;
    }
    ForgetPasswordComponent.prototype.onSubmit = function (data) {
        var _this = this;
        this.http.post('/statelesssocial/api/resetPassword', JSON.stringify(data), this.options)
            .map(function (res) { return res.json(); })
            .subscribe(function (json) {
            console.log(json);
            if (json == 'error') {
                _this.secQuestionFlag = 'no question found';
            }
            else {
                _this.secQuestionFlag = 'question found';
                _this.regmodel.question = json['quest'];
                _this.regmodel.answer = json['ans'];
                _this.regmodel.username = json['user_id'];
            }
        }, function (err) { console.error(err); });
    };
    ForgetPasswordComponent.prototype.checkAnswer = function () {
        var ans1 = (document.getElementById("originalAnswer").value);
        var ans2 = (document.getElementById("hiddenAnswer").value);
        if (ans1 == ans2) {
            this.correctAnswer = true;
        }
        else {
            this.correctAnswer = false;
        }
    };
    ForgetPasswordComponent.prototype.changePasswordFormSubmit = function (data) {
        this.http.post('/statelesssocial/api/verifySecurityQuestion', JSON.stringify(data), this.options)
            .map(function (res) { return res; })
            .subscribe(function (json) {
            //let body:string = JSON.parse(json['_body']);
            // console.log(body);
        }, function (err) {
            console.log(err);
        });
    };
    return ForgetPasswordComponent;
}());
ForgetPasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'forgetpassword-view',
        template: __webpack_require__("../../../../../src/app/forgetPassword/forgetpassword.component.html"),
        styles: [__webpack_require__("../../../../../src/app/forgetPassword/forgetpassword.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], ForgetPasswordComponent);

var _a, _b;
//# sourceMappingURL=forgetpassword.component.js.map

/***/ }),

/***/ "../../../../../src/app/forgetPassword/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forgetpassword_component__ = __webpack_require__("../../../../../src/app/forgetPassword/forgetpassword.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__forgetpassword_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__ = __webpack_require__("../../../../ng2-cookies/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_cookies__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
        // console.log("constructor");
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        this.cookies = __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].getAll();
        this.authcookie = this.cookies['AUTH-TOKEN'];
        if (this.authcookie != null) {
            console.log(this.authcookie);
            this.router.navigateByUrl('/welcome');
            return true;
        }
        else {
            this.router.navigateByUrl('/login');
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], AuthGuard);

var _a;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/guards/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__auth_guard__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/login/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__login_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".social-network a.icoRss:hover {\r\n\tbackground-color: #F56505;\r\n}\r\n\r\n.social-network a.icoFacebook:hover {\r\n\tbackground-color: #3B5998;\r\n}\r\n\r\n.social-network a.icoTwitter:hover {\r\n\tbackground-color: #33ccff;\r\n}\r\n\r\n.social-network a.icoGoogle:hover {\r\n\tbackground-color: #BD3518;\r\n}\r\n\r\n.social-network a.icoVimeo:hover {\r\n\tbackground-color: #0590B8;\r\n}\r\n\r\n.social-network a.icoLinkedin:hover {\r\n\tbackground-color: #007bb7;\r\n}\r\n.social-network a.icoGithub:hover {\r\n\tbackground-color: black;\r\n}\r\n\r\n.social-network a.icoRss:hover i, .social-network a.icoFacebook:hover i,\r\n\t.social-network a.icoTwitter:hover i, .social-network a.icoGoogle:hover i,\r\n\t.social-network a.icoVimeo:hover i, .social-network a.icoLinkedin:hover i\r\n\t{\r\n\tcolor: #fff;\r\n}\r\n\r\na.socialIcon:hover, .socialHoverClass {\r\n\tcolor: #44BCDD;\r\n}\r\n\r\n.social-circle li a {\r\n\tdisplay: inline-block;\r\n\tposition: relative;\r\n\tmargin: 0 auto 0 auto;\r\n\tborder-radius: 50%;\r\n\ttext-align: center;\r\n\twidth: 50px;\r\n\theight: 50px;\r\n\tfont-size: 20px;\r\n}\r\n\r\n.social-circle li i {\r\n\tmargin: 0;\r\n\tline-height: 50px;\r\n\ttext-align: center;\r\n}\r\n\r\n.social-circle li a:hover i, .triggeredHover {\r\n\t-moz-transform: rotate(360deg);\r\n\t-webkit-transform: rotate(360deg);\r\n\t-ms--transform: rotate(360deg);\r\n\ttransform: rotate(360deg);\r\n\ttransition: all 0.2s;\r\n}\r\n\r\n.social-circle i {\r\n\tcolor: #fff;\r\n\ttransition: all 0.8s;\r\n}\r\n\r\na {\r\n\tbackground-color: #D3D3D3;\r\n}\r\n\r\nul.social-network {\r\n\tlist-style: none;\r\n\tdisplay: inline;\r\n\tmargin-left: 0 !important;\r\n\tpadding: 0;\r\n}\r\n\r\nul.social-network li {\r\n\tdisplay: inline;\r\n\tmargin: 0 3px;\r\n}\r\n\r\n/* footer social icons */\r\n.social-network a.icoRss:hover {\r\n\tbackground-color: #F56505;\r\n}\r\n\r\n.social-network a.icoFacebook:hover {\r\n\tbackground-color: #3B5998;\r\n}\r\n\r\n.social-network a.icoTwitter:hover {\r\n\tbackground-color: #33ccff;\r\n}\r\n\r\n.social-network a.icoGoogle:hover {\r\n\tbackground-color: #BD3518;\r\n}\r\n\r\n.social-network a.fa-github:hover {\r\n\tbackground-color: black;\r\n}\r\n\r\n.social-network a.icoVimeo:hover {\r\n\tbackground-color: #0590B8;\r\n}\r\n.social-network a.icoLinkedin:hover {\r\n\tbackground-color: #007bb7;\r\n}\r\n\r\n\r\n.social-network a.icoRss:hover i, .social-network a.icoFacebook:hover i,\r\n\t.social-network a.icoTwitter:hover i, .social-network a.icoGoogle:hover i,\r\n\t.social-network a.icoVimeo:hover i, .social-network a.icoLinkedin:hover i\r\n\t{\r\n\tcolor: #fff;\r\n}\r\n\r\na.socialIcon:hover, .socialHoverClass {\r\n\tcolor: #44BCDD;\r\n}\r\n\r\n.social-circle li a {\r\n\tdisplay: inline-block;\r\n\tposition: relative;\r\n\tmargin: 5px;\r\n\t/*margin:0 auto 0 auto;*/\r\n\tborder-radius: 50%;\r\n\ttext-align: center;\r\n\twidth: 50px;\r\n\theight: 50px;\r\n\tfont-size: 20px;\r\n}\r\n\r\n.social-circle li i {\r\n\tmargin: 0;\r\n\tline-height: 50px;\r\n\ttext-align: center;\r\n}\r\n\r\n.social-circle li a:hover i, .triggeredHover {\r\n\t-moz-transform: rotate(360deg);\r\n\t-webkit-transform: rotate(360deg);\r\n\t-ms--transform: rotate(360deg);\r\n\ttransform: rotate(360deg);\r\n\ttransition: all 0.2s;\r\n}\r\n\r\n.social-circle i {\r\n\tcolor: #fff;\r\n\ttransition: all 0.8s;\r\n}\r\n\r\na {\r\n\tbackground-color: #D3D3D3;\r\n}\r\n\r\n.login-wrap {\r\n\twidth: 100%;\r\n\tmargin: auto;\r\n\tmax-width: 650px;\r\n\tmin-height: 670px;\r\n\tposition: relative;\r\n\tbox-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0\r\n\t\trgba(0, 0, 0, .19);\r\n}\r\n.showerror{\r\n\tcolor: red;\r\n\tfont-weight: bold;\r\n\tpadding-left: 5px;\r\n\tpadding-top: 5px;  \r\n}\r\n.setError{\r\n\tcolor: red;\r\n\tfont-weight: bold;\r\n}\r\n.setSuccess{\r\n\tcolor:green;\r\n\tfont-weight: bold;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n\t\t<div class=\"container login-wrap\">\r\n\t\t\t<div class=\"w3-border-bottom\">\r\n\t\t\t\t<button class=\"w3-bar-item w3-button w3-white\" onclick=\"openLoginTab()\"\r\n\t\t\t\t\tstyle=\"width: 50%; float: left;\">\r\n\t\t\t\t\t<h4>Login</h4>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button class=\"w3-bar-item w3-button w3-white\" onclick=\"openRegisterTab()\"\r\n\t\t\t\t\tstyle=\"width: 50%;\">\r\n\t\t\t\t\t<h4>Register</h4>\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t\t<div id=\"login\" style=\"padding: 10% 15% 10% 15%;\">\r\n\t\t\t\t<form class=\"loginForm\" (ngSubmit)=\"onSubmit(loginForm.value)\" #loginForm=\"ngForm\">\r\n\t\t\t\t\t<input type=\"hidden\" name=\"${_csrf.parameterName}\"\r\n\t\t\t\t\t\tvalue=\"${_csrf.token}\" />\r\n\t\t\t\t\t<table style=\"width: 100%;\">\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><i\r\n\t\t\t\t\t\t\t\tclass=\"fa fa-user  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><input\r\n\t\t\t\t\t\t\t\tplaceholder=\"Username\" class=\"w3-input\" name=\"username\"\r\n\t\t\t\t\t\t\t\tvalue=\"{{userdetails.username}}\" [(ngModel)]=\"userdetails.username\" \r\n\t\t\t\t\t\t\t\trequired #username=\"ngModel\"\r\n\t\t\t\t\t\t\t\tstyle=\"border-radius: 25px;\" type=\"text\" />\r\n\t\t\t\t\t\t\t\t<div [hidden]=\"username.valid || username.pristine\" class=\"showerror\">\r\n\t\t\t\t\t\t\t\t\tUser Name required\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><i\r\n\t\t\t\t\t\t\t\tclass=\"fa fa-lock w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><input\r\n\t\t\t\t\t\t\t\ttype=\"password\" style=\"border-radius: 25px;\" name=\"password\"\r\n\t\t\t\t\t\t\t\tplaceholder=\"Password\" class=\"w3-input\" \r\n\t\t\t\t\t\t\t\tvalue=\"{{userdetails.password}}\" \r\n\t\t\t\t\t\t\t\t[(ngModel)]=\"userdetails.password\" \r\n\t\t\t\t\t\t\t\trequired #password=\"ngModel\"\r\n\t\t\t\t\t\t\t\t />\r\n\t\t\t\t\t\t\t\t<div [hidden]=\"password.valid || password.pristine\" class=\"showerror\">\r\n\t\t\t\t\t\t\t\t\t\t\tPassword required\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t\t<br /> <input type=\"submit\" value=\"Login\" name=\"login\"\r\n\t\t\t\t\t\tclass=\"w3-button w3-blue\"\r\n\t\t\t\t\t\tstyle=\"padding: 15px 20px; border-radius: 25px; width: 100%;\" />\r\n\t\t\t\t\t<br /> <br /> <br />\r\n\t\t\t\t</form>\r\n\t\t\t\t<br />\r\n\t\t\t\t<br/>\r\n\t\t\t\t<div class=\"col-md-12 col-sm-12 col-xs-12\">\r\n\t\t\t\t\t<a href=\"\" (click)=\"forgetPasswordOpen()\" style=\"background-color: white;\" data-toggle=\"modal\"\r\n\t\t\t\t\t\tdata-target=\"#forgotPasswordModal\"><b>Forget Password?</b></a>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<ul style=\"border-collapse: separate; border-spacing: 2px\"\r\n\t\t\t\t\tclass=\"social-network social-circle\">\r\n\t\t\t\t\t<li><a href=\"/statelesssocial/auth/facebook\" class=\"icoFacebook\"\r\n\t\t\t\t\t\ttitle=\"Facebook\"><i class=\"fa fa-facebook\"></i></a></li>\r\n\t\t\t\t\t<li><a href=\"/statelesssocial/auth/google?scope=https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile\"\r\n\t\t\t\t\t\tclass=\"icoGoogle\" title=\"Google +\"><i\r\n\t\t\t\t\t\t\tclass=\"fa fa-google-plus\"></i></a></li>\r\n\t\t\t\t\t<li><a href=\"/statelesssocial/auth/twitter\" class=\"icoTwitter\"\r\n\t\t\t\t\t\ttitle=\"Twitter\"><i class=\"fa fa-twitter\"></i></a></li>\r\n\t\t\t\t\t<li><a href=\"/statelesssocial/auth/linkedin\" class=\"icoLinkedin\"\r\n\t\t\t\t\t\ttitle=\"Linkedin\"><i class=\"fa fa-linkedin\"></i></a></li>\r\n\r\n\t\t\t\t</ul>\r\n\t\t\t\t\t\t\r\n\t\t\t</div>\r\n\t\t\t<div id=\"register\" style=\"display: none; padding: 10% 15% 10% 15%;\">\r\n\r\n\r\n\t\t\t\t<form class=\"registerForm\" name=\"registerForm\" id=\"registerForm\" #registerForm=\"ngForm\">\r\n\t\t\t\t\t<table style=\"width: 100%;\">\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><i\r\n\t\t\t\t\t\t\t\tclass=\"fa fa-user  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\">\r\n\t\t\t\t\t\t\t<input placeholder=\"First Name\" [(ngModel)]=\"regmodel.fname\" name=\"fname\" required\r\n\t\t\t\t\t\t\t\tstyle=\"width: 100%; border-radius: 25px;\" class=\"w3-input\"\r\n\t\t\t\t\t\t\t\ttype=\"text\"  #fname=\"ngModel\" />\r\n\t\t\t\t\t\t\t<div [hidden]=\"fname.valid || fname.pristine\"   class=\"showerror\">\r\n\t\t\t\t\t\t\t\t\t\tFirst Name required\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><i\r\n\t\t\t\t\t\t\t\tclass=\"fa fa-user  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><input\r\n\t\t\t\t\t\t\t\tplaceholder=\"Last Name\" [(ngModel)]=\"regmodel.lname\" name=\"lname\" required\r\n\t\t\t\t\t\t\t\tstyle=\"width: 100%; border-radius: 25px;\" class=\"w3-input\"\r\n\t\t\t\t\t\t\t\ttype=\"text\" #lname=\"ngModel\" />\r\n\t\t\t\t\t\t\t<div [hidden]=\"lname.valid || lname.pristine\"   class=\"showerror\">\r\n\t\t\t\t\t\t\t\t\t\tLast Name required\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><i\r\n\t\t\t\t\t\t\t\t\tclass=\"fa fa-user  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><input\r\n\t\t\t\t\t\t\t\t\tplaceholder=\"User Name\" [(ngModel)]=\"regmodel.username\" \r\n\t\t\t\t\t\t\t\t\tname=\"username\" required\r\n\t\t\t\t\t\t\t\t\tstyle=\"width: 100%; border-radius: 25px;\" class=\"w3-input\"\r\n\t\t\t\t\t\t\t\t\ttype=\"text\"  #username=\"ngModel\" />\r\n\t\t\t\t\t\t\t\t<div [hidden]=\"username.valid || username.pristine\"   class=\"showerror\">\r\n\t\t\t\t\t\t\t\t\t\tUser Name required\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t</tr>\r\n\r\n\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><i\r\n\t\t\t\t\t\t\t\tclass=\"w3-xxlarge w3-text-blue fa fa-envelope-o\"></i></td>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><input\r\n\t\t\t\t\t\t\t\tplaceholder=\"Email Id\" \r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t[(ngModel)]=\"regmodel.email\" name=\"email\" required style=\"width: 100%; border-radius: 25px;\"\r\n\t\t\t\t\t\t\t\tclass=\"w3-input\" type=\"text\"   #email=\"ngModel\" />\r\n\t\t\t\t\t\t\t<div [hidden]=\"email.valid || email.pristine\"   class=\"showerror\">\r\n\t\t\t\t\t\t\t\t\t\tEmail Id required\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><i\r\n\t\t\t\t\t\t\t\tclass=\"fa fa-lock \tw3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><input\r\n\t\t\t\t\t\t\t\tplaceholder=\"Password\" [(ngModel)]=\"regmodel.passwd\" ng-minlength=\"8\" ng-maxlength=\"20\" name=\"passwd\" required style=\"width: 100%; border-radius: 25px;\"\r\n\t\t\t\t\t\t\t\tclass=\"w3-input\" type=\"password\"    #passwd=\"ngModel\" />\r\n\t\t\t\t\t\t\t<div [hidden]=\"passwd.valid || passwd.pristine\"   class=\"showerror\">\r\n\t\t\t\t\t\t\t\t\t\tInvalid Password required\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><i\r\n\t\t\t\t\t\t\t\tclass=\"w3-xxlarge fa fa-home w3-text-blue\"></i></td>\r\n\t\t\t\t\t\t\t<td style=\"padding-bottom: 10%; padding-left: 2%;\"><input\r\n\t\t\t\t\t\t\t\tplaceholder=\"Location\" [(ngModel)]=\"regmodel.location\" \r\n\t\t\t\t\t\t\t\tname=\"location\" required style=\"width: 100%; border-radius: 25px;\"\r\n\t\t\t\t\t\t\t\tclass=\"w3-input\" type=\"text\" #location=\"ngModel\" />\r\n\t\t\t\t\t\t\t<div [hidden]=\"location.valid || location.pristine\"   class=\"showerror\">\r\n\t\t\t\t\t\t\t\t\t\tLocation required\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t\t<b><h4>Create One security question For Completion.</h4></b>\r\n\t\t\t\t\t<table>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td  style=\"padding-bottom: 10%; padding-left: 2%;\"><i class=\"w3-xxlarge w3-text-blue glyphicon glyphicon-ok-circle\"></i></td>\r\n\t\t\t\t\t\t\t<td  style=\"padding-bottom: 10%; padding-left: 2%;\">\r\n\t\t\t\t\t\t\t\t<select [(ngModel)]=\"quesArray[0].qval\" (ngModelChange)=\"onChangeObj($event)\" name=\"question\" #question=\"ngModel\">\r\n\t\t\t\t\t\t\t\t<option *ngFor=\"let ques of quesArray\" [ngValue]= \"ques.qval\">{{ques.qval}}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td><i class=\"material-icons w3-text-blue\">&#xe8af;</i></td>\r\n\t\t\t\t\t\t\t<td  style=\"padding-bottom: 10%; padding-left: 2%;\">\r\n\t\t\t\t\t\t\t\t<input placeholder=\"Answer Here\" [(ngModel)]=\"regmodel.answer\" \r\n\t\t\t\t\t\t\t\tname=\"answer\" required style=\"width: 100%; border-radius: 25px;\"\r\n\t\t\t\t\t\t\t\tclass=\"w3-input\" type=\"text\" #answer=\"ngModel\" required/>\r\n\t\t\t\t\t\t\t\t<div [hidden]=\"answer.valid || answer.pristine\"   class=\"showerror\">\r\n\t\t\t\t\t\t\t\t\t\tAnswer required\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>-->\r\n\t\t\t\t</form>\r\n\t\t\t\t<br /> <input [disabled]=\"registerForm.invalid\" type=\"submit\" value=\"Register\" name=\"register\"\r\n\t\t\t\t\tclass=\"w3-button w3-blue\"\r\n\t\t\t\t\tstyle=\"padding: 15px 20px; border-radius: 25px; width: 100%;\" (click)=\"registerNewUser()\" /> <br />\r\n\t\t\t\t<br /> <br /> <br />\r\n\t\t\t\t<div *ngIf=\"this.regSuccess ==true\" class=\"setSuccess\">\r\n\t\t\t\t\t<h3>Registration sucessfull</h3>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div *ngIf=\"this.regError ==true\" class=\"setError\">\r\n\t\t\t\t\t<h3>Registration unsucessfull</h3>\r\n\t\t\t\t</div>\r\n\t\t\t\t<br/><br/>\r\n\t\t\t\t<ul style=\"border-collapse: separate; border-spacing: 2px\"\r\n\t\t\t\t\tclass=\"social-network social-circle\">\r\n\t\t\t\t\t<li><a href=\"/statelesssocial/auth/facebook\" class=\"icoFacebook\"\r\n\t\t\t\t\t\ttitle=\"Facebook\"><i class=\"fa fa-facebook\"></i></a></li>\r\n\t\t\t\t\t<li><a href=\"/statelesssocial/auth/google?scope=https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile\"\r\n\t\t\t\t\t\tclass=\"icoGoogle\" title=\"Google +\"><i\r\n\t\t\t\t\t\t\tclass=\"fa fa-google-plus\"></i></a></li>\r\n\t\t\t\t\t<li><a href=\"/statelesssocial/auth/twitter\" class=\"icoTwitter\"\r\n\t\t\t\t\t\ttitle=\"Twitter\"><i class=\"fa fa-twitter\"></i></a></li>\r\n\t\t\t\t\t<li><a href=\"/statelesssocial/auth/linkedin\" class=\"icoLinkedin\"\r\n\t\t\t\t\t\ttitle=\"Linkedin\"><i class=\"fa fa-linkedin\"></i></a></li>\r\n\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_model__ = __webpack_require__("../../../../../src/app/login/register_model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__ = __webpack_require__("../../../../../src/app/models/UserDetails.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_QuestionConstants__ = __webpack_require__("../../../../../src/app/utils/QuestionConstants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginComponent = (function () {
    function LoginComponent(http, router) {
        this.http = http;
        this.router = router;
        this.quesArray = [
            new __WEBPACK_IMPORTED_MODULE_5__utils_QuestionConstants__["a" /* QuestionConstants */]('Select A Question'),
            new __WEBPACK_IMPORTED_MODULE_5__utils_QuestionConstants__["a" /* QuestionConstants */]('What is your Nickname?'),
            new __WEBPACK_IMPORTED_MODULE_5__utils_QuestionConstants__["a" /* QuestionConstants */]('What is your place of birth?'),
            new __WEBPACK_IMPORTED_MODULE_5__utils_QuestionConstants__["a" /* QuestionConstants */]('In which year you cleared your high school?'),
            new __WEBPACK_IMPORTED_MODULE_5__utils_QuestionConstants__["a" /* QuestionConstants */]('In which year your father was born?'),
            new __WEBPACK_IMPORTED_MODULE_5__utils_QuestionConstants__["a" /* QuestionConstants */]('In which year your mother was born?'),
            new __WEBPACK_IMPORTED_MODULE_5__utils_QuestionConstants__["a" /* QuestionConstants */]('From which place you completed your high school?'),
            new __WEBPACK_IMPORTED_MODULE_5__utils_QuestionConstants__["a" /* QuestionConstants */]('You own a smartphone of which brand?'),
            new __WEBPACK_IMPORTED_MODULE_5__utils_QuestionConstants__["a" /* QuestionConstants */]('Which is your favourite subject?')
        ];
        this.regmodel = new __WEBPACK_IMPORTED_MODULE_3__register_model__["a" /* RegistrationModel */]();
        this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]();
    }
    LoginComponent.prototype.registerNewUser = function () {
        var _this = this;
        var headersInfo = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        headersInfo.set('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headersInfo });
        this.http.post('/statelesssocial/api/registerNewUser', JSON.stringify(this.regmodel), options)
            .map(function (res) { return res; }).subscribe(function (result) {
            _this.regSuccess = true;
            console.log(_this.regmodel);
            console.log('registration sucess');
        }, function (error) {
            _this.regError = true;
            console.log('registration unsucessfull');
        });
    };
    LoginComponent.prototype.onChangeObj = function (obj) {
        this.regmodel.question = obj;
        console.log(obj);
    };
    LoginComponent.prototype.validateUser = function () {
        this.http.get('/statelesssocial/validateUser').map(function (res) { return res.json; })
            .subscribe(function (result) {
        }, function (error) {
            console.log('error');
        });
    };
    LoginComponent.prototype.forgetPasswordOpen = function () {
        this.router.navigateByUrl('/forgetPassword');
    };
    LoginComponent.prototype.onSubmit = function (data) {
        var _this = this;
        var headersInfo = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        headersInfo.set('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headersInfo });
        this.http.post('/statelesssocial/auth/normaluser', JSON.stringify(data), options)
            .map(function (res) { return res; })
            .subscribe(function (json) {
            _this.router.navigateByUrl('/welcome');
        }, function (err) {
            console.log(err);
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: "app-root",
        template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/register_model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationModel; });
var RegistrationModel = (function () {
    function RegistrationModel() {
        this.fname = '';
        this.lname = '';
        this.email = '';
        this.passwd = '';
        this.cpasswd = '';
        this.location = '';
        this.username = '';
        this.question = '';
        this.answer = '';
    }
    RegistrationModel.prototype.fromJSON = function (json) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    };
    return RegistrationModel;
}());

//# sourceMappingURL=register_model.js.map

/***/ }),

/***/ "../../../../../src/app/models/UserDetails.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDetails; });
var UserDetails = (function () {
    function UserDetails() {
        this.id = '';
        this.username = '';
        this.birthday = '';
        this.creationDate = '';
        this.email = '';
        this.firstname = '';
        this.gender = '';
        this.lastname = '';
        this.industry = '';
        this.flag = '';
        this.gender = '';
        this.updateDate = '';
        this.role = '';
        this.providerUserId = '';
        this.location = '';
        this.password = '';
        this.confirmPassword = '';
    }
    UserDetails.prototype.fromJSON = function (json) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    };
    return UserDetails;
}());

//# sourceMappingURL=UserDetails.js.map

/***/ }),

/***/ "../../../../../src/app/utils/QuestionConstants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionConstants; });
var QuestionConstants = (function () {
    function QuestionConstants(qval) {
        this.qval = qval;
    }
    return QuestionConstants;
}());

//# sourceMappingURL=QuestionConstants.js.map

/***/ }),

/***/ "../../../../../src/app/welcome/welcome.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "td{\r\n  padding-bottom: 10%; padding-left: 2%;\r\n }\r\n .one{\r\n\tpadding-left:10%;\r\n\tpadding-right:10%;\r\n }\r\n.customlink{\r\n\tbackground-color: white;\r\n\ttext-decoration: none;\r\n\tcolor: #ff3300;\r\n}\r\n.showerror{\r\n\tcolor: red;\r\n\tfont-weight: bold;\r\n\tpadding-left: 5px;\r\n\tpadding-top: 5px;  \r\n}\r\n.hightext{\r\n    font-weight:bold;\r\n}\r\n.w3-btn:hover{\r\n\tbox-shadow:none !important;\t\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/welcome/welcome.html":
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"onSubmit(detailsForm.value)\" #detailsForm=\"ngForm\">\r\n<div class=\"w3-bar w3-blue\">\r\n     <div *ngIf=\"userdetails?.role==='admin'\">\r\n\t\t  <p class=\"w3-bar-item w3-blue\">Welcome Admin</p>\r\n\t</div>\r\n\t<div *ngIf=\"userdetails?.role==='user'\">\r\n\t\t  <p class=\"w3-bar-item w3-blue\">Welcome User</p>\r\n\t</div>\r\n\t\t  <input type=\"button\" value=\"Click To Enable Editing\" name=\"enablebutton\" (click)=\"enableFieldEdit()\" class=\"w3-bar-item w3-btn w3-blue\"/>\r\n\t\t  <div *ngIf=\"userdetails?.role==='admin'\">\r\n\t\t\t\t<input type=\"button\" (click) =\"viewuserdetailpage()\" class=\"w3-bar-item w3-btn w3-blue\" value=\"Click Here to View Users\"/>\r\n\t\t\t</div>\r\n\t\r\n\t\t\t<div *ngIf=\"userdetails?.flag==false\">\r\n\t\t\t\t<input [disabled]=\"detailsForm.invalid\" type=\"submit\" value=\"Save Fields\" name=\"save\" class=\"w3-bar-item w3-btn w3-blue\"/>\r\n\t\t\t</div>\r\n\t\t\t<div *ngIf=\"userdetails?.flag==true\">\r\n\t\t\t\t<input [disabled]=\"detailsForm.invalid\" type=\"submit\" value=\"Update Fields\" name=\"update\" class=\"w3-bar-item w3-btn w3-blue\"/>\r\n\t\t\t</div>\r\n\t\t<div *ngIf=\"providerCookie!=''\">\r\n\t\t\t<input type=\"button\" (click) =\"logOut()\" class=\"w3-bar-item w3-btn w3-blue glyphicon glyphicon-log-out w3-right\" value=\"LogOut\"/>\r\n\t\t</div>\r\n</div>\r\n<div class=\"container\">\r\n\t<div *ngIf=\"userdetails?.flag==false\">\r\n\t\t<h3 class=\"w3-text-teal\">New Registration Found... Want to keep the following settings?</h3>\r\n\t</div>\r\n\t<h1 class=\"w3-text-blue\">Welcome {{userdetails?.username}}</h1>\r\n\t\r\n\t\t<table style=\"border-collapse: collapse;border-spacing: 10px;\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"fa fa-user  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t<td class=\"one\"><b><label for=\"username\" >UserName</label></b></td>\r\n\t\t\t\t<td><input placeholder=\"User Name\" class=\"form-control\" name=\"username\" \r\n\t\t\t\t\tid=\"username\" style=\"width: 150%; border-radius: 25px;\"\r\n\t\t\t\t\ttype=\"text\" value=\"{{userdetails.username}}\" [(ngModel)]=\"userdetails.username\" \r\n\t\t\t\t\trequired #username=\"ngModel\" readonly/>\r\n\t\t\t\t\t<div [hidden]=\"username.valid || username.pristine\" class=\"showerror\">\r\n\t\t\t\t\t\tUser Name required\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\t\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"fa fa-user-circle  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t<td class=\"one\"><b>FirstName</b></td>\r\n\t\t\t\t<td><div [hidden]=\"isEditable\"><input placeholder=\"First Name\" class=\"form-control w3-input\" name=\"firstname\" id=\"firstname\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\"\r\n\t\t\t\t\t[(ngModel)]=\"userdetails.firstname\" type=\"text\" value=\"{{userdetails.firstname}}\" \r\n\t\t\t\t\trequired #firstname=\"ngModel\" readonly/></div>\r\n\t\t\t\t<div [hidden]=\"!isEditable\"><input placeholder=\"First Name\" class=\"form-control w3-input\" name=\"firstname\" id=\"firstname\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\"\r\n\t\t\t\t\t[(ngModel)]=\"userdetails.firstname\" type=\"text\" value=\"{{userdetails.firstname}}\" \r\n\t\t\t\t\trequired #firstname=\"ngModel\" /></div>\r\n\r\n\t\t\t\t<div [hidden]=\"firstname.valid || firstname.pristine\"  class=\"showerror\">\r\n\t\t\t\t\t\tFirst Name required\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"fa fa-user-o  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t<td class=\"one\"><b>LastName</b></td>\r\n\t\t\t\t<td><div [hidden]=\"isEditable\"><input placeholder=\"Last Name\" name=\"lastname\" id=\"lastname\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\"\r\n\t\t\t\t\t type=\"text\" value=\"{{userdetails.lastname}}\" [(ngModel)]=\"userdetails.lastname\" \r\n\t\t\t\t\t  required #lastname=\"ngModel\" readonly/></div>\r\n\t\t\t\t\t<div [hidden]=\"!isEditable\"><input placeholder=\"Last Name\" name=\"lastname\" id=\"lastname\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\"\r\n\t\t\t\t\t type=\"text\" value=\"{{userdetails.lastname}}\" [(ngModel)]=\"userdetails.lastname\" \r\n\t\t\t\t\t  required #lastname=\"ngModel\" /></div>\r\n\t\t\t\t\t  <div [hidden]=\"lastname.valid || lastname.pristine\"  class=\"showerror\">\r\n\t\t\t\t\t\tLast Name required\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"glyphicon glyphicon-envelope  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t<td class=\"one\"><b>Email</b></td>\r\n\t\t\t\t<td><div [hidden]=\"isEditable\"><input placeholder=\"Email\" name=\"email\" id=\"email\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\" type=\"text\"\r\n\t\t\t\t\t value=\"{{userdetails.email}}\" [(ngModel)]=\"userdetails.email\" \r\n\t\t\t\t\t  required #email=\"ngModel\" readonly/></div>\r\n\t\t\t\t\t<div [hidden]=\"!isEditable\"><input placeholder=\"Email\" name=\"email\" id=\"email\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\" type=\"text\"\r\n\t\t\t\t\t value=\"{{userdetails.email}}\" [(ngModel)]=\"userdetails.email\" \r\n\t\t\t\t\t  required #email=\"ngModel\" /></div>\r\n\t\t\t\t\t <div [hidden]=\"email.valid || email.pristine\"  class=\"showerror\">\r\n\t\t\t\t\t\tEmail required\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"material-icons  w3-xxlarge w3-text-blue\">location_on</i></td>\r\n\t\t\t\t<td class=\"one\"><b>Location</b></td>\r\n\t\t\t\t<td><div [hidden]=\"isEditable\"><input placeholder=\"Location\" name=\"location\" id=\"location\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\"\r\n\t\t\t\t\t type=\"text\" value=\"{{userdetails.location}}\" [(ngModel)]=\"userdetails.location\" \r\n\t\t\t\t\t  required #location=\"ngModel\" readonly/></div>\r\n\t\t\t\t\t<div [hidden]=\"!isEditable\"><input placeholder=\"Location\" name=\"location\" id=\"location\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\"\r\n\t\t\t\t\t type=\"text\" value=\"{{userdetails.location}}\" [(ngModel)]=\"userdetails.location\" \r\n\t\t\t\t\t  required #location=\"ngModel\" /></div>\r\n\t\t\t\t\t  <div [hidden]=\"location.valid || location.pristine\"  class=\"showerror\">\r\n\t\t\t\t\t\tLocation required\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"fa fa-industry  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t<td class=\"one\"><b>Industry</b></td>\r\n\t\t\t\t<td><div [hidden]=\"isEditable\"><input placeholder=\"Industry\" name=\"industry\" id=\"industry\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\"\r\n\t\t\t\t\t type=\"text\" value=\"{{userdetails.industry}}\" [(ngModel)]=\"userdetails.industry\" \r\n\t\t\t\t\t  required #industry=\"ngModel\" readonly/></div>\r\n\t\t\t\t\t<div [hidden]=\"!isEditable\"><input placeholder=\"Industry\" name=\"industry\" id=\"industry\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\"\r\n\t\t\t\t\t type=\"text\" value=\"{{userdetails.industry}}\" [(ngModel)]=\"userdetails.industry\" \r\n\t\t\t\t\t  required #industry=\"ngModel\" /></div>\r\n\t\t\t\t\t  <div [hidden]=\"industry.valid || industry.pristine\"  class=\"showerror\">\r\n\t\t\t\t\t\tIndustry required\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"fa fa-birthday-cake  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t<td class=\"one\"><b>Birthday</b></td>\r\n\t\t\t\t<td><div [hidden]=\"isEditable\"><input placeholder=\"Birthday\" name=\"birthday\" id=\"birthday\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\"\r\n\t\t\t\t\t type=\"text\" value=\"{{userdetails.birthday}}\" [(ngModel)]=\"userdetails.birthday\" \r\n\t\t\t\t\t  required #birthday=\"ngModel\" readonly/></div>\r\n\t\t\t\t\t<div [hidden]=\"!isEditable\"><input placeholder=\"Birthday\" name=\"birthday\" id=\"birthday\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\"\r\n\t\t\t\t\t type=\"text\" value=\"{{userdetails.birthday}}\" [(ngModel)]=\"userdetails.birthday\" \r\n\t\t\t\t\t  required #birthday=\"ngModel\" /></div>\r\n\t\t\t\t\t  <div [hidden]=\"birthday.valid || birthday.pristine\"  class=\"showerror\">\r\n\t\t\t\t\t\tBirthday required\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"fa fa-envira  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t<td class=\"one\"><b>Creation Date</b></td>\r\n\t\t\t\t<td><input placeholder=\"Creation Date\" \r\n\t\t\t\t\tname=\"creationDate\" id=\"creationDate\" style=\"width: 150%; border-radius: 25px;\" \r\n\t\t\t\t\tclass=\"form-control w3-input\"\r\n\t\t\t\t\t type=\"text\" value=\"{{userdetails.creationDate}}\" \r\n\t\t\t\t\t  [(ngModel)]=\"userdetails.creationDate\" required #creationDate=\"ngModel\" readonly/>\r\n\t\t\t\t\t  <div [hidden]=\"creationDate.valid || creationDate.pristine\"  class=\"showerror\">\r\n\t\t\t\t\t\tCreation Date required\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\t \r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"fa fa-repeat  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t<td class=\"one\"><b>Last Modified Date</b></td>\r\n\t\t\t\t<td><input placeholder=\"Last Modified Date\" \r\n\t\t\t\t\tname=\"updateDate\" id=\"updateDate\" style=\"width: 150%; border-radius: 25px;\" \r\n\t\t\t\t\tclass=\"form-control w3-input\"\r\n\t\t\t\t\t type=\"text\" value=\"{{userdetails.updateDate}}\" [(ngModel)]=\"userdetails.updateDate\" \r\n\t\t\t\t\t  required #updateDate=\"ngModel\" readonly/>\r\n\t\t\t\t\t  \r\n\t\t\t\t\t <div [hidden]=\"updateDate.valid || updateDate.pristine\"  class=\"showerror\">\r\n\t\t\t\t\t\tLast Modified Date required\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"fa fa-universal-access  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t<td class=\"one\"><b>Gender</b></td>\r\n\t\t\t\t<td><div [hidden]=\"isEditable\"><input placeholder=\"Gender\" \r\n\t\t\t\t\tname=\"gender\" id=\"gender\" style=\"width: 150%; border-radius: 25px;\" \r\n\t\t\t\t\tclass=\"form-control w3-input\" type=\"text\"\r\n\t\t\t\t\t value=\"{{userdetails.gender}}\" \r\n\t\t\t\t\t  [(ngModel)]=\"userdetails.gender\" required #gender=\"ngModel\" readonly/></div>\r\n\t\t\t\t\t<div [hidden]=\"!isEditable\"><input placeholder=\"Gender\" name=\"gender\" id=\"gender\" style=\"width: 150%; border-radius: 25px;\" \r\n\t\t\t\t\tclass=\"form-control w3-input\" type=\"text\"\r\n\t\t\t\t\t value=\"{{userdetails.gender}}\" \r\n\t\t\t\t\t  [(ngModel)]=\"userdetails.gender\" required #gender=\"ngModel\" /></div>\r\n\t\t\t\t<div [hidden]=\"gender.valid || gender.pristine\"   class=\"showerror\">\r\n\t\t\t\t\t\tGender required\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"fa fa-hand-o-right  w3-xxlarge w3-text-blue\"></i></td>\r\n\t\t\t\t<td class=\"one\"><b>User Id</b></td>\r\n\t\t\t\t<td><input placeholder=\"User ID\" [(ngModel)]=\"userdetails.id\" name=\"id\" id=\"id\" \r\n\t\t\t\t\tstyle=\"width: 150%; border-radius: 25px;\" #id=\"ngModel\" class=\"form-control w3-input\" type=\"text\"\r\n\t\t\t\t\t value=\"{{userdetails.id}}\" required readonly/></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><i class=\"material-icons  w3-xxlarge w3-text-blue\">perm_identity</i></td>\r\n\t\t\t\t<td class=\"one\"><b>Role</b></td>\r\n\t\t\t\t<td><input placeholder=\"Role\" name=\"role\"\r\n\t\t\t\t\t #role=\"ngModel\"  [(ngModel)]=\"userdetails.role\"\r\n\t\t\t\t\tid=\"role\" style=\"width: 150%; border-radius: 25px;\" class=\"form-control w3-input\" type=\"text\"\r\n\t\t\t\t\t value=\"{{userdetails.role}}\" required readonly/></td>\r\n\t\t\t</tr>\r\n\t\t\t<input type=\"hidden\" value=\"userdetails?.flag\" [(ngModel)]=\"userdetails.flag\" #flag=\"ngModel\" name=\"flag\" id=\"flag\"/>\r\n\t\t\t<input type=\"hidden\" value=\"userdetails?.providerUserId\" \r\n\t\t\t[(ngModel)]=\"userdetails.providerUserId\" #providerUserId=\"ngModel\" name=\"providerUserId\" providerUserId=\"providerUserId\"/>\r\n\t\t</table>\t\r\n\t\t\r\n\t\t\t\t\r\n\t\t\r\n\t\t<div *ngIf=\"savesuccessFlag==true\">\r\n\t\t\t<h3>Details Successfully Saved</h3>\r\n\t\t</div>\r\n\t\t<div *ngIf=\"errorFlag==true\">\r\n\t\t\t<h3>Details Not Saved</h3>\r\n\t\t</div>\r\n\t</div>\r\n</form>\r\n"

/***/ }),

/***/ "../../../../../src/app/welcome/welcome.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cookies__ = __webpack_require__("../../../../ng2-cookies/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_cookies__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__ = __webpack_require__("../../../../../src/app/models/UserDetails.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WelcomeComponent = (function () {
    function WelcomeComponent(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Headers */]();
        this.submitted = false;
        this.isEditable = false;
        this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]();
        this.cookies = __WEBPACK_IMPORTED_MODULE_3_ng2_cookies__["Cookie"].getAll();
        this.savesuccessFlag = false;
        this.errorFlag = false;
        this.providerCookie = this.cookies['provider_cookie'];
        this.authcookie = this.cookies['AUTH-TOKEN'];
        this.headers.set('x-auth-token', this.authcookie);
        this.options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        if (this.providerCookie === 'facebook') {
            this.http.get('/statelesssocial/api/facebook/details', this.options)
                .map(function (res) { return res; })
                .subscribe(function (json) {
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(json);
                var body = JSON.parse(json['_body']);
                console.log(body);
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(body);
                console.log(_this.userdetails);
            }, function (err) { console.error(err); });
        }
        if (this.providerCookie === 'google') {
            this.http.get('/statelesssocial/api/google/details', this.options)
                .map(function (res) { return res; })
                .subscribe(function (json) {
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(json);
                var body = JSON.parse(json['_body']);
                console.log(body);
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(body);
                console.log(_this.userdetails);
            }, function (err) { console.error(err); });
        }
        if (this.providerCookie === 'live') {
            this.http.get('/statelesssocial/api/live/details', this.options)
                .map(function (res) { return res; })
                .subscribe(function (json) {
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(json);
                var body = JSON.parse(json['_body']);
                console.log(body);
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(body);
                console.log(_this.userdetails);
            }, function (err) { console.error(err); });
        }
        if (this.providerCookie === 'twitter') {
            this.http.get('/statelesssocial/api/twitter/details', this.options)
                .map(function (res) { return res; })
                .subscribe(function (json) {
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(json);
                var body = JSON.parse(json['_body']);
                console.log(body);
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(body);
                console.log(_this.userdetails);
            }, function (err) { console.error(err); });
        }
        if (this.providerCookie === 'linkedin') {
            this.authcookie = this.cookies['linkedin_code'];
            console.log(this.authcookie);
            this.http.get('/statelesssocial/api/linkedin/details', this.options)
                .map(function (res) { return res; })
                .subscribe(function (json) {
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(json);
                var body = JSON.parse(json['_body']);
                console.log(body);
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(body);
                console.log(_this.userdetails);
            }, function (err) { console.error(err); });
        }
        if (this.providerCookie === 'normaluser') {
            this.http.get('/statelesssocial/api/user/details', this.options)
                .map(function (res) { return res; })
                .subscribe(function (json) {
                console.log("json");
                var temp = json['_body'];
                console.log(temp);
                var tempOne = JSON.parse(temp);
                console.log(tempOne);
                _this.userdetails = new __WEBPACK_IMPORTED_MODULE_4__models_UserDetails__["a" /* UserDetails */]().fromJSON(tempOne);
                console.log(_this.userdetails);
            }, function (err) { console.error(err); });
        }
    }
    WelcomeComponent.prototype.onSubmit = function (data) {
        var _this = this;
        this.submitted = true;
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('x-auth-token', this.authcookie);
        this.options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        this.http.post('/statelesssocial/api/user/saveUser', JSON.stringify(data), this.options)
            .map(function (res) { return res; })
            .subscribe(function (json) {
            var body = JSON.parse(json['_body']);
            console.log(body);
            if (body == "success") {
                _this.savesuccessFlag = true;
            }
            else {
                _this.errorFlag = true;
            }
        }, function (err) {
            _this.errorFlag = true;
            console.log(err);
        });
    };
    WelcomeComponent.prototype.logOut = function () {
        this.providerCookie = '';
        this.cookies = null;
        this.authcookie = null;
        this.deleteCookie('AUTH-TOKEN');
        this.deleteCookie('provider_cookie');
        this.router.navigateByUrl('/login');
    };
    WelcomeComponent.prototype.deleteCookie = function (name) {
        this.setCookie(name, '', -1, '/');
    };
    WelcomeComponent.prototype.setCookie = function (name, value, expireDays, path) {
        if (path === void 0) { path = ''; }
        var d = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        var cpath = path ? "; path=" + path : '';
        document.cookie = name + "=" + value + "; " + expires + cpath;
    };
    WelcomeComponent.prototype.getCookie = function (name) {
        var ca = document.cookie.split(';');
        var caLen = ca.length;
        var cookieName = name + "=";
        var c;
        for (var i = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    };
    WelcomeComponent.prototype.enableFieldEdit = function () {
        this.isEditable = true;
    };
    WelcomeComponent.prototype.viewuserdetailpage = function () {
        this.router.navigateByUrl('/adminPage');
    };
    return WelcomeComponent;
}());
WelcomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_14" /* Component */])({
        selector: 'profile-view',
        template: __webpack_require__("../../../../../src/app/welcome/welcome.html"),
        styles: [__webpack_require__("../../../../../src/app/welcome/welcome.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]) === "function" && _b || Object])
], WelcomeComponent);

var _a, _b;
//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map