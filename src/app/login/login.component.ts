import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent {
    public etat = false;
    userName: string = "";
    password: string = "";
    erroText: string = "";
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.etat = false;
    }

  onSignIn() {

  const username = this.userName.toLowerCase();
  const password = this.password;

  if (
    (username === "admin" || username === "admin@gmail.com") &&
    password === "admin"
  ) {

    this.authService.signIn(username, password).then(() => {

      this.etat = this.authService.isAuthenticated();

      this.router.navigate(["/client"]);

      this.userName = "";
      this.password = "";
      this.erroText = "";

    });

  } else {

    this.userName = "";
    this.password = "";
    this.erroText = "Nom d'utilisateur ou mot de passe incorrect";

  }
}

onSignOut() {

  this.authService.signOut();

  this.etat = this.authService.isAuthenticated();

  this.erroText = "";

  this.router.navigate(["/login"]);
}
}
