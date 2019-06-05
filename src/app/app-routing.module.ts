import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DisplayQuizComponent } from './display-quiz/display-quiz.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { DisplayQuizzesComponent } from './display-quizzes/display-quizzes.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { UpdateQuizComponent } from './update-quiz/update-quiz.component';
import { PortalIndexComponent } from './portal-index/portal-index.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/login', pathMatch: 'full' }, // if baseUrl => go to login

  {path: 'home', component: HomeComponent, children: [
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
  ]},
  
  {path: 'portal', component:PortalComponent,/* canActivate: [AuthGuard],*/ children: [
    {path: 'display-quiz/:id', component:DisplayQuizComponent},  
    {path: 'create-quiz', component:CreateQuizComponent},  
    {path: 'display-quizzes', component:DisplayQuizzesComponent},  
    {path: 'update-quiz/:id', component:UpdateQuizComponent},
    {path: 'index', component: PortalIndexComponent},  
  ]},
  

  { path: '**', component: PageNotFoundComponent } // wildcard - if no routes matched, display this
 ];
 

// Define available routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
