import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/index';
import { WelcomeComponent } from './welcome/welcome';
import { LoginComponent } from './login/index';
import { AdminComponent } from './admin/admin';
import { ForgetPasswordComponent } from './forgetPassword/index';
const routes: Routes = [
{ path: 'login'  ,component: LoginComponent},
{ path: 'welcome'  ,component: WelcomeComponent },
{ path: 'test'  ,component: WelcomeComponent,canActivate: [AuthGuard] },
{ path: '', redirectTo:'test', pathMatch:'full'},
{ path:'adminPage',component:AdminComponent },
{ path: 'forgetPassword',component:ForgetPasswordComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers:[
    AuthGuard
  ]
})
export class AppRoutingModule {

}