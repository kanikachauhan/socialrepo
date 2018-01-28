import { Component } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { RegistrationModel } from "./register_model";
import { UserDetails } from '../models/UserDetails';
import {QuestionConstants} from '../utils/QuestionConstants';
import 'rxjs/Rx';
@Component({
  moduleId: module.id,
  selector: "app-root",
  templateUrl: "login.component.html",
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  quesArray: Array<QuestionConstants> =[
    new QuestionConstants('Select A Question'),
    new QuestionConstants('What is your Nickname?'),
    new QuestionConstants('What is your place of birth?'),
    new QuestionConstants('In which year you cleared your high school?'),
    new QuestionConstants('In which year your father was born?'),
    new QuestionConstants('In which year your mother was born?'),
    new QuestionConstants('From which place you completed your high school?'),
    new QuestionConstants('You own a smartphone of which brand?'),
    new QuestionConstants('Which is your favourite subject?')
];
  regmodel: RegistrationModel;
  regSuccess:boolean;
  regError:boolean;
  userdetails: UserDetails;
  constructor(private http: Http, private router: Router) {
    this.regmodel = new RegistrationModel();
    this.userdetails = new UserDetails();
  }

  registerNewUser() {
    let headersInfo = new Headers();
    headersInfo.set('Content-Type', 'application/json');
    let options =   new RequestOptions({ headers: headersInfo });
    this.http.post('/statelesssocial/api/registerNewUser',JSON.stringify(this.regmodel),options)
    .map(res=>res).subscribe(result=>{
      this.regSuccess = true;
      console.log(this.regmodel);
      console.log('registration sucess');
    },
    error=>{
      this.regError = true;
      console.log('registration unsucessfull');
    });

  }
    onChangeObj(obj){
      this.regmodel.question = obj;
      console.log(obj);
    }

  validateUser(){
      this.http.get('/statelesssocial/validateUser').map(res=> res.json)
      .subscribe(result=>{

      },
      error=>{
        console.log('error');
      });
  }
  forgetPasswordOpen(){
    this.router.navigateByUrl('/forgetPassword');
  }
  onSubmit(data) { 
    let headersInfo = new Headers();
    headersInfo.set('Content-Type', 'application/json');
    let options =   new RequestOptions({ headers: headersInfo });
        this.http.post('/statelesssocial/auth/normaluser', JSON.stringify(data) , options )
        .map((res: Response) => res)
                .subscribe((json: Object) => {
                     this.router.navigateByUrl('/welcome');
                },
                err => { 
                    console.log(err);
                }
        );
    }
}