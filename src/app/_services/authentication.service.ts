/*
Le service d'authentification est utilisé pour se connecter et se déconnecter de l'application. Pour se connecter,
il affiche les informations d'identification de l'utilisateur sur l'API et vérifie la réponse pour un jeton JWT.
S'il en existe un, cela signifie que l'authentification a réussi et que les détails de l'utilisateur,
y compris le jeton, sont ajoutés. au stockage local.

Le service d'authentification présente deux propriétés permettant d'accéder à l'utilisateur actuellement connecté.
L'observable currentUser peut être utilisé lorsque vous souhaitez qu'un composant se mette à jour de manière réactive
lorsqu'un utilisateur se connecte ou se déconnecte, par exemple dans le fichier app.component.ts, afin qu'il puisse
afficher / masquer la barre de navigation principale lorsque l'utilisateur se connecte / déconnecte. La propriété
currentUserValue peut être utilisée lorsque vous souhaitez simplement obtenir la valeur actuelle de l'utilisateur
connecté, mais que vous n'avez pas besoin de mettre à jour de manière réactive lorsqu'elle change, par exemple dans
auth.guard.ts, qui restreint l'accès aux itinéraires en vérifiant si l'utilisateur est actuellement connecté.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import {environment} from "../../environments/environment";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}

/* Modification par rapport au tuto :
Ligne 38
  return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })

  devient :
  return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
  (supprimer fonctionne aussi, mais du coup on manque de possibilités de configuration)

*/
