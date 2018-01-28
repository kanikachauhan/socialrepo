import { Component } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { UserDetails } from '../models/UserDetails';
import { RegistrationModel } from "../login/register_model";
import 'rxjs/Rx';
@Component({
    moduleId: module.id,
    selector: 'forgetpassword-view',
    templateUrl: 'forgetpassword.component.html',
    styleUrls: ['forgetpassword.component.css']
})
    export class ForgetPasswordComponent {
        userdetails: UserDetails;
        headers = new Headers();
        options:RequestOptions;
        secQuestionFlag:String;
        regmodel: RegistrationModel;
        newregmodel : RegistrationModel;
        correctAnswer:boolean;
        constructor(private http: Http, private router: Router) {
            this.userdetails = new UserDetails();
            this.headers.set('Content-Type','application/json');
            this.options = new RequestOptions({ headers: this.headers });
            this.secQuestionFlag = 'empty';
            this.regmodel = new RegistrationModel();
            this.newregmodel = new RegistrationModel();
            this.correctAnswer = false;
        }
        onSubmit(data){
            this.http.post('/statelesssocial/api/resetPassword',JSON.stringify(data), this.options)
            .map((res: Response) => res.json())
                .subscribe((json: Object) => {
                    console.log(json);
                    if(json== 'error') {
                        this.secQuestionFlag ='no question found';
                    }else{
                        this.secQuestionFlag = 'question found';
                        this.regmodel.question = json['quest'];
                        this.regmodel.answer = json['ans'];
                        this.regmodel.username = json['user_id']; 
                    }
                },
                err => { console.error(err) }
                );
        }
        checkAnswer(){
            var   ans1= ((document.getElementById("originalAnswer") as HTMLInputElement).value);
            var   ans2= ((document.getElementById("hiddenAnswer") as HTMLInputElement).value);
            if(ans1 == ans2){
                this.correctAnswer = true;
            }else{
                this.correctAnswer = false;
            }
        }    
        changePasswordFormSubmit(data){
         this.http.post('/statelesssocial/api/verifySecurityQuestion', JSON.stringify(data) , this.options )
            .map((res: Response) => res)
                .subscribe((json: Object) => {
                    //let body:string = JSON.parse(json['_body']);
                   // console.log(body);
                },
                err => { 
                    console.log(err);
                }
        );



        }
    }