import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 searchText: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  confirm_deconnect() {
    Swal.fire({
      title: "Déconnexion?",
      text: "Voulez-vous se déconnecter ?",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.signOut();
        this.router.navigate(['/']);
      }
    });
  }

  menuOpen: boolean = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

closeMenu() {
  this.menuOpen = false;
}
}
