import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import 'rxjs/Rx';
import { UserModel } from "./admin_model";
@Component({
  moduleId: module.id,
  selector: "user-view",
  templateUrl: "admin.html",
  styleUrls: ["admin.css"]
})
export class AdminComponent {
  headers = new Headers();
  providerCookie: string;
  authcookie: string;
  cookies: Object;
  options: RequestOptions;
  result: UserModel[];
  valuesForMove : string[] = [];
  updateUserString :string;
  constructor(private http: Http, private router: Router) {
    this.cookies = Cookie.getAll();
    this.providerCookie = this.cookies["provider_cookie"];
    this.authcookie = this.cookies["AUTH-TOKEN"];
    this.headers.set("x-auth-token", this.authcookie);
    this.options = new RequestOptions({ headers: this.headers });
    this.http.post("/statelesssocial/api/user/showallusers",this.options)
      .map((res: Response) => res.json())
      .subscribe(
        json => {
          console.log(json);
          this.result = json;
          this.result.forEach(e=>{
            if(e.role=='admin'){
                e.isAdmin=true;
            }
          });
          console.log(this.result);
        },
        err => {
          console.error(err);
        }
      );
  }
  promoteToAdmin() {
      this.headers.set('Content-Type', 'application/json');
      this.headers.set('x-auth-token', this.authcookie);
      let options = new RequestOptions({ headers: this.headers });
      console.log(this.valuesForMove);
      let localData = [];
      this.valuesForMove.forEach(e=>{
          localData.push({userId:e});
      });
      this.http.post('/statelesssocial/api/user/promoteUsers',localData,options)
      .map((res:Response)=>{
          res.json()}
        ).subscribe(res=>{
            console.log(res);
        },
        err=>{
            console.log(err);
        });

  }
    logOut(){
        this.providerCookie='';
        this.cookies = null;
        this.authcookie=null;
        this.deleteCookie('AUTH-TOKEN');
        this.deleteCookie('provider_cookie');
        this.router.navigateByUrl('/login');
    }
    private deleteCookie(name) {
        this.setCookie(name, '', -1,'/');
    }
    private setCookie(name: string, value: string, expireDays: number, path: string = '') {
        let d:Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires:string = `expires=${d.toUTCString()}`;
        let cpath:string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }


    private getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }
    checked(id:string){
        this.valuesForMove.push(id);
        console.log(this.valuesForMove);
    }
}