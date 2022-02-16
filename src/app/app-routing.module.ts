import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//guard
import { CanActivateViaAuthGuard } from './shared/guards/can-activate-via-auth.guard';
import { AuthGuard } from './shared/guards/auth.guard';

// Components
import { AlertsComponent } from './pages/alerts/alerts.component';
import { DemoComponent } from './pages/demo/demo.component';
import { DisputesComponent } from './pages/disputes/disputes.component';
import { DraftListComponent } from './pages/draft-list/draft-list.component';
import { DraftComponent } from './pages/draft/draft.component';
import { ProtectedComponent } from './pages/protected/protected.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProtectedDocumentComponent } from './pages/protected-document/protected-document.component';
import { CertificateComponent } from './pages/certificate/certificate.component';
import { DraftEditorComponent } from './pages/draft-editor/draft-editor.component';


const routes: Routes = [
  {path: '', redirectTo: 'demo', pathMatch: 'full'},
  {path: 'demo', component: DemoComponent, canActivate: [AuthGuard] },

  // Rutas protegidas por la logica interna
  {path: 'alerts', component: AlertsComponent },
  {path: 'disputes', component: DisputesComponent },
  {path: 'draft-list', component: DraftListComponent },
  {path: 'protected', component: ProtectedComponent },
  {path: 'certificate/:uuid', component: CertificateComponent },
  {path: 'certificate/:uuid/:status', component: CertificateComponent },
  
  // Rutas protegidas por login (Crear middleware)
  {path: 'draft', component: DraftComponent, canActivate: [CanActivateViaAuthGuard] },
  {path: 'draft/:uuid', component: DraftComponent, canActivate: [CanActivateViaAuthGuard] },
  {path: 'protected-document/:uuid', component: ProtectedDocumentComponent, canActivate: [CanActivateViaAuthGuard] },
  {path: 'certificate/:uuid', component: CertificateComponent, canActivate: [CanActivateViaAuthGuard] },
  {path: 'settings', component: SettingsComponent, canActivate: [CanActivateViaAuthGuard] },

  {path: 'draft-editor', component: DraftEditorComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
