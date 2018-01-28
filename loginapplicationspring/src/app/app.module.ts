import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes ,provideRoutes} from '@angular/router';
import { AppRoutingModule} from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome';
import { AuthGuard } from './guards/index';
import { LoginComponent } from './login/index';
import { AdminComponent } from './admin/admin';
import { FormsModule }   from '@angular/forms';
import { ForgetPasswordComponent } from './forgetPassword/index';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    AdminComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
