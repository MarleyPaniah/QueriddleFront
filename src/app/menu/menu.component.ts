import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AuthenticationService } from '../_services';
import { User } from '../_models';

import '../_content/app.less';

@Component({ selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'] })

export class MenuComponent implements OnInit {
  currentUser: User;
  searchDocForm;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.searchDocForm = this.formBuilder.group({
      anneeScol: '',
      matiere: '',
      sujet: ''
    });
  }

    ngOnInit(): void {}

    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }

    onSubmit(docQuery) {
      this.searchDocForm.reset();
      console.warn('searchDocForm marche !', docQuery);
    }
}

// TODO: Faire les validations (validators) pour le formulaire
