import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//env
import { environment } from './../environments/environment';

// Packages Modules
import { NgxKjuaModule } from 'ngx-kjua';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BlockUIModule } from 'ng-block-ui';
import { GoogleApiModule, NgGapiClientConfig, NG_GAPI_CONFIG } from 'ng-gapi'

let gapiClientConfig = {
    client_id: environment.gapi.client_id,
};
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// App Modules
import { AlertModule } from './components/alert/alert.module';

// Interceptors http
import { HttpRequestInterceptor } from './shared/http-request-interceptor';


// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { VerticalNavComponent } from './components/layout/vertical-nav/vertical-nav.component';
import { DemoComponent } from './pages/demo/demo.component';
import { LoginSelectComponent } from './components/auth/login-select/login-select.component';
import { LoginEmailComponent } from './components/auth/login-email/login-email.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginRecoverPasswordComponent } from './components/auth/login-recover-password/login-recover-password.component';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { AlertsNewComponent } from './pages/alerts/new/new.component';
import { AlertsNotactualComponent } from './pages/alerts/notactual/notactual.component';
import { DisputesComponent } from './pages/disputes/disputes.component';
import { DisputesActionNeedComponent } from './pages/disputes/action-need/action-need.component';
import { DisputesEndedComponent } from './pages/disputes/ended/ended.component';
import { DisputesProviderComponent } from './pages/disputes/provider/provider.component';
import { DisputesSearchComponent } from './pages/disputes/search/search.component';
import { DisputesWebsiteComponent } from './pages/disputes/website/website.component';
import { DraftComponent } from './pages/draft/draft.component';
import { DraftListComponent } from './pages/draft-list/draft-list.component';
import { DraftListWorkingComponent } from './pages/draft-list/working/working.component';
import { DraftListDeleteComponent } from './pages/draft-list/delete/delete.component';
import { ProtectedComponent } from './pages/protected/protected.component';
import { ProtectedTrackingComponent } from './pages/protected/tracking/tracking.component';
import { ProtectedNotrackingComponent } from './pages/protected/notracking/notracking.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsAccountComponent } from './pages/settings/account/account.component';
import { SettingsBillingComponent } from './pages/settings/billing/billing.component';
import { SettingsNamesComponent } from './pages/settings/names/names.component';
import { SettingsSafelistComponent } from './pages/settings/safelist/safelist.component';
import { SettingsTeamComponent } from './pages/settings/team/team.component';
import { TermsConditionsComponent } from './components/modal/terms-conditions/terms-conditions.component';
import { ProtectedDocumentComponent } from './pages/protected-document/protected-document.component';
import { DocumentAboutComponent } from './pages/protected-document/about/about.component';
import { DocumentAlertComponent } from './pages/protected-document/alert/alert.component';
import { DocumentDisputeComponent } from './pages/protected-document/dispute/dispute.component';
import { ModalSafeListComponent } from './components/modal/safe-list/safe-list.component';
import { CertificateComponent } from './pages/certificate/certificate.component';
import { OnboardingComponent } from './components/modal/onboarding/onboarding.component';
import { DraftEditorComponent } from './pages/draft-editor/draft-editor.component';
import { EditorComponent } from './pages/draft-editor/core/editor/editor.component';
import { AlertGroupByDateComponent } from './components/table/alert-group-by-date/alert-group-by-date.component';
import { AlertNotactualGroupByDateComponent } from './components/table/alert-notactual-group-by-date/alert-notactual-group-by-date.component';
import { ProtectedTrackingGroupByDateComponent } from './components/table/protected-trackin-group-by-date/protected-tracking-group-by-date.component';
import { ProtectedNotTrackingGroupByDateComponent } from './components/table/protected-not-tracking-group-by-date/protected-not-tracking-group-by-date.component';
import { TranslateExtensionModule } from './shared/translate/translate-extension.module';
import { BootstrapModule } from './shared/bootstrap/bootstrap.module';
import { IconComponent } from './shared/components/icon/icon.component';
import { CopyDirective } from './shared/directives/copy.directive';
import { CertificateHeaderComponent } from './pages/certificate/certificate-header/certificate-header.component';
import { CertificateBodyComponent } from './pages/certificate/certificate-body/certificate-body.component';
import { CoreModule } from './core/core.module';
import { CertificateQuestionsComponent } from './pages/certificate/certificate-questions/certificate-questions.component';
import { CertificateFooterComponent } from './pages/certificate/certificate-footer/certificate-footer.component';
import { CertificateApplicationSuggestionComponent } from './pages/certificate/certificate-application-suggestion/certificate-application-suggestion.component';
import { CertificateContentLockedComponent } from './pages/certificate/certificate-content-locked/certificate-content-locked.component';
import { CertificateContentComponent } from './pages/certificate/certificate-content/certificate-content.component';
import { CertificateHistoryModalComponent } from './pages/certificate/certificate-history-modal/certificate-history-modal.component';
import { DateUtcPipe } from './shared/pipes/date-utc.pipe';
import { FilterTabComponent } from './shared/components/filter-tab/filter-tab.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        VerticalNavComponent,
        DemoComponent,
        TermsConditionsComponent,
        LoginSelectComponent,
        LoginEmailComponent,
        SignupComponent,
        LoginRecoverPasswordComponent,
        AlertsComponent,
        AlertsNewComponent,
        AlertsNotactualComponent,
        DisputesComponent,
        DisputesActionNeedComponent,
        DisputesEndedComponent,
        DisputesProviderComponent,
        DisputesSearchComponent,
        DisputesWebsiteComponent,
        DraftComponent,
        DraftListComponent,
        DraftListWorkingComponent,
        DraftListDeleteComponent,
        ProtectedComponent,
        ProtectedTrackingComponent,
        ProtectedNotrackingComponent,
        SettingsComponent,
        SettingsAccountComponent,
        SettingsBillingComponent,
        SettingsNamesComponent,
        SettingsSafelistComponent,
        SettingsTeamComponent,
        ProtectedDocumentComponent,
        DocumentAboutComponent,
        DocumentAlertComponent,
        DocumentDisputeComponent,
        ModalSafeListComponent,
        CertificateComponent,
        OnboardingComponent,
        DraftEditorComponent,
        EditorComponent,
        AlertGroupByDateComponent,
        AlertNotactualGroupByDateComponent,
        ProtectedTrackingGroupByDateComponent,
        ProtectedNotTrackingGroupByDateComponent,
        CertificateHeaderComponent,
        IconComponent,
        CopyDirective,
        CertificateBodyComponent,
        CertificateQuestionsComponent,
        CertificateFooterComponent,
        CertificateApplicationSuggestionComponent,
        CertificateContentLockedComponent,
        CertificateContentComponent,
        CertificateHistoryModalComponent,
        DateUtcPipe,
        FilterTabComponent,
    ],
    imports: [
        CoreModule,
        BrowserModule,
        AppRoutingModule,
        BlockUIModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AlertModule,
        TranslateExtensionModule,
        BootstrapModule,
        NgScrollbarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => {
                    return new TranslateHttpLoader(http);
                },
                deps: [HttpClient],
            },
        }),
        GoogleApiModule.forRoot({
            provide: NG_GAPI_CONFIG,
            useValue: gapiClientConfig,
        }),
        NgxKjuaModule,
        CKEditorModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
