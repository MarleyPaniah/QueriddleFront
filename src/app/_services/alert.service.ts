/*
Le service d'alerte permet à n'importe quel composant de l'application d'afficher des messages d'alerte en haut de la
page via le composant d'alerte
 */


import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // efface les messages d'alerte sur les routes sauf si 'keepAfterRouteChange' est vrai
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // ne le garde qu'après un seul changement de route
        this.keepAfterRouteChange = false;
      } else {
        // effacement du message d'alerte
        this.clear();
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', text: message });
  }

  clear() {
    // clear by calling subject.next() without parameters
    this.subject.next();
  }
}
