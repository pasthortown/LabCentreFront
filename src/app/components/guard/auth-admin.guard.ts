import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
      let profiles = JSON.parse(sessionStorage.getItem('user')).profiles;
      let can_continue = false;
      profiles.forEach(element => {
        if (element.profile_id == 1) {
          can_continue = true;
        }
      });
      if (!can_continue) {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
      return can_continue;
    }
}
