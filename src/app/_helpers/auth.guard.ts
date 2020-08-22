/*
La garde d'authentification est utilisée pour empêcher les utilisateurs non authentifiés d'accéder aux itinéraires
restreints. Ici, elle est utilisée dans app.routing.ts pour protéger l'itinéraire de la page d'accueil.

CanActivate : interface pour savoir si une route peut être activée
ActivatedRouteSnapshot : Contient les infos à propos d'une route associée à un component
RouterStateSnapshot : Représente l'état d'un routeur à un moment donné
*/


import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  /* fctn canActivate : autoriser la création d'une route si l'utilisateur est enregistré */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // autorisé donc renvoie true
      return true;
    }

    // non enregistré donc redirigé vers la page de login avec l'url de retour
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
