import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: "app-client",
    templateUrl: "./client.component.html",
    styleUrl: "./client.component.scss",
})
export class ClientComponent implements OnInit {
    tableClient: any = [];

    nom: string = "";
    prenom: string = "";
    adresse: string = "";
    tel: string = "";

    apiURL = "http://localhost:8081/client";
    apiCommande = "http://localhost:8081/commande/delete";

    id_selected: string = "";

    isCompleted = false;

    searchText: any = "";

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) {
        this.getClient();
    }

    ngOnInit(): void {}

    // CRUD

    // LIST CLIENT

    createClient() {
        const client = {
            nom: this.nom,
            prenom: this.prenom,
            adresse: this.adresse,
            tel: this.tel,
        };
        this.http
            .post(`${this.apiURL}/create`, client)
            .subscribe((data: any) => {
                this.getClient();
                Swal.fire({
                    icon: "success",
                    title: "INSERTION",
                    text: "Insertion effectuée",
                    timer: 1500,
                    showConfirmButton: false,
                });
                this.clearChamps();
            });
    }

    getClient() {
        this.http.get(`${this.apiURL}/read`).subscribe((data: any) => {
            this.tableClient = data;
            console.log(data);

            this.clearChamps();
        });
    }

    prepareACTION(client: any) {
        this.isCompleted = true;
        this.id_selected = client.numCli;
        this.nom = client.nom;
        this.prenom = client.prenom;
        this.adresse = client.adresse;
        this.tel = client.tel;
    }

    updateClient() {
        let id_to_update = this.id_selected;
        const client = {
            nom: this.nom,
            prenom: this.prenom,
            adresse: this.adresse,
            tel: this.tel,
        };
        this.http
            .put(`${this.apiURL}/update/${id_to_update}`, client)
            .subscribe((data: any) => {
                this.getClient();
                Swal.fire({
                    icon: "success",
                    title: "MISE À JOUR",
                    text: "Mise à jour effectuée",
                    timer: 1500,
                    showConfirmButton: false,
                });
            });
    }

    deleteClient() {
        let id_to_delete = this.id_selected;
        Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Voulez vous vraiment le supprimer ? ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Non",
            confirmButtonColor: "green",
            cancelButtonColor: "black",
        }).then((result) => {
            if (result.isConfirmed) {
                this.http
                    .delete(`${this.apiURL}/delete/${id_to_delete}`)
                    .subscribe((data: any) => {
                        if (data == 1) {
                            this.getClient();
                            Swal.fire({
                                icon: "success",
                                title: "SUPPRESSION",
                                text: "Suppression effectuée",
                                timer: 1500,
                                showConfirmButton: false,
                                background: "light",
                                iconColor: "light",
                            });
                            // must deleting client in commande - requete personnalisée dans spring boot
                            /*this.http
                                .delete(`${this.apiCommande}/${id_to_delete}`)
                                .subscribe((data: any) => {
                                    if (data == 1) {
                                        console.log(
                                            "suppresion de client effectuée sur la table commande"
                                        );

                                        // must deleting client in commande
                                    }
                                });*/
                        }
                    });
            }
        });
    }

    regxNumberOnly(text: any) {
        var valeur = text;
        var valeurSansLettres = valeur.replace(
            /[a-zA-Z-²&é"'(-è_çà)=!:;,$^]/g,
            ""
        );
        this.nom = valeurSansLettres;
    }

    regexNom(text: any) {
        var valeur = text;
        var valeurSansChiffres = valeur.replace(/[0-9]/g, "");
        this.nom = valeurSansChiffres;
    }

    lenNom(text: any) {
        var valeur = text;
        if (valeur.length > 255) {
            this.nom = valeur.substring(0, 255);
        }
    }

    regexPrenom(text: any) {
        var valeur = text;
        var valeurSansChiffres = valeur.replace(/[0-9]/g, "");
        this.prenom = valeurSansChiffres;
    }

    lenPrenom(text: any) {
        var valeur = text;
        if (valeur.length > 155) {
            this.prenom = valeur.substring(0, 155);
        }
    }

    lenAdresse(text: any) {
        var valeur = text;
        if (valeur.length > 155) {
            this.prenom = valeur.substring(0, 155);
        }
    }

    regxTel(text: any) {
        var valeur = text;
        var valeurSansLettres = valeur.replace(/[a-zA-Z]/g, "");
        this.tel = valeurSansLettres;
    }

    lenTel(text: any) {
        var valeur = text;
        if (valeur.length > 13) {
            this.tel = valeur.substring(0, 13);
        }
    }

    isComplete() {
        if (
            this.nom !== "" &&
            this.prenom !== "" &&
            this.adresse !== "" &&
            this.tel !== ""
        ) {
            this.isCompleted = true;
        } else {
            this.isCompleted = false;
        }
    }

    clearChamps() {
        this.nom = "";
        this.prenom = "";
        this.adresse = "";
        this.tel = "";
        this.isCompleted = false;
        this.id_selected = "";
    }

    confirm_deconnect() {
        Swal.fire({
            title: "Déconnexion?",
            text: "Voulez-vous se deconnecter ? ",
            showCancelButton: true,
            confirmButtonText: "Oui, se déconnecter!",
            cancelButtonText: "Non",
            position: "bottom-right",
            background: "light",
            iconColor: "light",
            confirmButtonColor: "green",
            cancelButtonColor: "black",
        }).then((result) => {
            if (result.isConfirmed) {
                this.onSignOut();
            }
        });
    }

    onSignOut() {
        this.authService.signOut();
        this.router.navigate(["/"]);
    }
}
