import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login/login.guard';
import { ConfirmEmailGuard } from './confirm-email/confirm-email.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [LoginGuard, ConfirmEmailGuard]
  },
  {
    path: 'drill-timer',
    loadChildren: () => import('./drill-timer/drill-timer.module').then(m => m.DrillTimerPageModule), canActivate: [LoginGuard, ConfirmEmailGuard]
  },
  {
    path: 'practice-plans',
    loadChildren: () => import('./practice-plans/practice-plans.module').then(m => m.PracticePlansPageModule), canActivate: [LoginGuard, ConfirmEmailGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule), canActivate: [LoginGuard, ConfirmEmailGuard]
  },
  {
    path: 'add-plan',
    loadChildren: () => import('./add-plan/add-plan.module').then(m => m.AddPlanPageModule)
  },
  {
    path: 'view-notes',
    loadChildren: () => import('./view-notes/view-notes.module').then(m => m.ViewNotesPageModule)
  },
  {
    path: 'plan',
    loadChildren: () => import('./plan/plan.module').then(m => m.PlanPageModule)
  },
  {
    path: 'edit-activity',
    loadChildren: () => import('./edit-activity/edit-activity.module').then(m => m.EditActivityPageModule)
  },
  {
    path: 'add-activity',
    loadChildren: () => import('./add-activity/add-activity.module').then(m => m.AddActivityPageModule)
  },
  {
    path: 'confirm-email',
    loadChildren: () => import('./confirm-email/confirm-email.module').then(m => m.ConfirmEmailPageModule), canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
