/*
Le service utilisateur contient un ensemble standard de méthodes CRUD pour la gestion des utilisateurs.
Il sert d'interface entre l'application Angular et l'API backend.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}

/* Modification par rapport au tuto :
Ligne 38
  return this.http.XXX(`${config.apiUrl}/users/XXX)

  devient :
  return this.http.XXX(`${environment.apiUrl}/users/XXX)
  (supprimer fonctionne aussi, mais du coup on manque de possibilités de configuration)

*/
