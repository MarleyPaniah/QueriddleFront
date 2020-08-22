/*
Le routage pour l'application Angular est configuré comme un tableau de Routes, chaque composant est mappé sur un
chemin afin que le routeur angulaire sache quel composant afficher en fonction de l'URL dans la barre d'adresse du
navigateur. La route de la page d'accueil est sécurisée en passant AuthGuard à la propriété canActivate de la route.
Le tableau Routes est transmis à la méthode RouterModule.forRoot() qui crée un module de routage avec toutes les routes
d'application configurées et inclut également tous les fournisseurs de routeurs angulaires et les directives telles que
<router-outlet></router-outlet> directive.
 */

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { DocumentComponent} from './document';
import { AuthGuard } from './_helpers';
import { ChatComponent } from './chatClient/chat/chat.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'document', component: DocumentComponent, canActivate: [AuthGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    // sinon rediriger vers home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
