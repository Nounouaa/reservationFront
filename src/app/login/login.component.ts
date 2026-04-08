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
        if (
            (this.userName.toLowerCase() == "admin" ||
                this.userName == "admin@gmail.com") &&
            this.password === "admin"
        ) {
            this.authService.signIn().then(() => {
                this.etat = this.authService.isAuth;
                this.router.navigate(["/client"]);
                this.userName = "";
                this.password = "";
            });
            this.erroText = "";
        } else {
            this.userName = "";
            this.password = "";
            this.erroText = "Nom d'utilisateur ou mot de passe incorrecte";
        }
    }

    onSignOut() {
        this.erroText = "";
        this.authService.signOut();
        this.etat = this.authService.isAuth;
    }
}
