import Swal from "sweetalert2";
import { Component } from "@angular/core";
import { ImageServiceService } from "../services/image-service.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "app-chambre",
    templateUrl: "./chambre.component.html",
    styleUrl: "./chambre.component.scss",
})
export class ChambreComponent {
    searchText!: string;
    typeC: string = "Simple";
    nbreLit: string = "";
    prix: string = "";
    isCompleted = false;
    isCompleted2 = false;
    id_selected!: string;
    isInscrit = false;

    numCli: string = "";
    numChambre: string = "";

    arrayChambre: any[] = [];

    dateRes: string = "";
    dateDeb: string = "";
    dateFin: string = "";

    apiURL = "https://reservationchambre-production.up.railway.app/reservation/chambre";
    apiURL2 = "https://reservationchambre-production.up.railway.app/reservation/reservation";
    apiClient = "https://reservationchambre-production.up.railway.app/reservation/client";

    tableClient: any = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {
        this.read();
    }

    verifyIm() {
        const arrayClient = this.tableClient.map((e: any) => {
            return e.numCli;
        });

        let index = arrayClient.indexOf(parseInt(this.numCli));

        if (index !== -1) {
            this.isInscrit = true;
            const arrayReservationIm = this.tableClient.map((d: any) => {
                return d.numCli;
            });

            let index = arrayReservationIm.indexOf(parseInt(this.numCli));

            // if (index !== -1) {
            //     console.log("Plus de 2fois");
            //     this.isAlreadyDmd = true;
            // } else {
            //     console.log("1ere fois");
            //     this.isAlreadyDmd = false;
            // }
        } else {
            this.isInscrit = false;
        }
    }

    create(): void {
        const chambre = {
            typeC: this.typeC,
            nbreLit: this.nbreLit,
            prix: this.prix,
            statusC: "disponible",
        };
        this.http
            .post(`${this.apiURL}/create`, chambre)
            .subscribe((data: any) => {
                this.read();
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

    read(): void {
        this.http.get(`${this.apiURL}/read`).subscribe((data: any) => {
            console.log(data);
            this.arrayChambre = data;
        });

        this.http.get(`${this.apiClient}/read`).subscribe((data: any) => {
            console.log(data);
            this.tableClient = data;
        });
    }

    reserver(text: string) {
        this.numChambre = text;
    }

    liberer(text: string) {
        this.numChambre = text;
        this.http
            .post(`${this.apiURL}/changeDispo/${this.numChambre}`, text)
            .subscribe((data: any) => {
                this.read();
            });
    }

    valider() {
        if (
            !(
                this.numCli !== "" &&
                this.dateDeb !== "" &&
                this.dateFin !== "" &&
                this.dateRes !== "" &&
                this.numChambre !== "" &&
                this.isInscrit !== false
            )
        ) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "veuillez renseigner tous le(s) champ(s)",
                timer: 1500,
                showConfirmButton: false,
            });
        } else {
            const reservation = {
                numCli: this.numCli,
                numChambre: this.numChambre,
                dateDeb: this.dateDeb,
                dateFin: this.dateFin,
                dateRes: this.dateRes,
            };

            const numChambre = this.numChambre;

            this.http
                .post(`${this.apiURL2}/create/${numChambre}`, reservation)
                .subscribe((data: any) => {
                    Swal.fire({
                        icon: "success",
                        title: "Effectuée!",
                        text: "Reservation effectuée",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    this.read();
                    this.router.navigate(["/reservation"]);
                });
        }
    }

    update() {}

    isComplete() {
        if (this.nbreLit !== "" && this.prix !== "") {
            this.isCompleted = true;
        } else {
            this.isCompleted = false;
        }
    }

    isComplete2() {
        if (
            this.numCli !== "" &&
            this.dateDeb !== "" &&
            this.dateFin !== "" &&
            this.dateRes !== "" &&
            this.numChambre !== ""
        ) {
            this.isCompleted2 = true;
        } else {
            this.isCompleted2 = false;
        }
    }

    clearChamps() {
        this.nbreLit = "";
        this.prix = "";
        this.isCompleted = false;
        this.id_selected = "";
    }

    regxNumCli(text: any) {
        var valeur = text;
        var valeurSansLettres = valeur.replace(/[a-zA-Z]/g, "");
        this.numCli = valeurSansLettres;
    }

    lenNumChambre(text: any) {
        var valeur = text;
        if (valeur.length > 5) {
            this.numChambre = valeur.substring(0, 5);
        }
    }

    regxNumChambre(text: any) {
        var valeur = text;
        var valeurSansLettres = valeur.replace(/[a-zA-Z]/g, "");
        this.numChambre = valeurSansLettres;
    }

    lenNumCli(text: any) {
        var valeur = text;
        if (valeur.length > 11) {
            this.numCli = valeur.substring(0, 11);
        }
    }

    regxNbLit(text: any) {
        var valeur = text;
        var valeurSansLettres = valeur.replace(/[a-zA-Z]/g, "");
        this.nbreLit = valeurSansLettres;
    }

    lenNbLit(text: any) {
        var valeur = text;
        if (valeur.length > 2) {
            this.nbreLit = valeur.substring(0, 2);
        }
    }

    regxPrix(text: any) {
        var valeur = text;
        var valeurSansLettres = valeur.replace(/[a-zA-Z]/g, "");
        this.prix = valeurSansLettres;
    }

    lenNbPrix(text: any) {
        var valeur = text;
        if (valeur.length > 11) {
            this.prix = valeur.substring(0, 11);
        }
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
