/*
Le module d'application définit le module racine de l'application ainsi que les métadonnées relatives au module

C’est là que le faux fournisseur d’API backend est ajouté à l’application. Pour passer à une véritable API,
supprimez simplement les fournisseurs situés en dessous du commentaire // providers used to create fake backend.
 */


import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';

import { appRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertComponent } from './_components';


import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { MenuComponent} from './menu/menu.component';
import { RegisterComponent } from './register';
import { DocumentComponent } from './document';
import { ChatModule } from './chatClient/chat/chat.module';
import { SharedModule } from './chatClient/shared/shared.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';

// utlisé pour créer fake backend
import { fakeBackendProvider } from './_helpers';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        PdfViewerModule,
        appRoutingModule,
        ChatModule,
        SharedModule,
        MatMenuModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        DocumentComponent,
        MenuComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
