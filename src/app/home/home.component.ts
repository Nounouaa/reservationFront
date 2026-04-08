import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
    URLCLIENT: any = "https://reservationchambre-production.up.railway.app/reservation/client";
    URLCOMMANDE: any = "https://reservationchambre-production.up.railway.app/reservation/commande";
    URLPRODUIT: any = "https://reservationchambre-production.up.railway.app/reservation/produit";
    URLSOMME: any = "https://reservationchambre-production.up.railway.app/reservation/client/getAllCommande";

    tab_client: any[] = [];
    tab_commande: any[] = [];
    tab_produit: any[] = [];
    tab_chart_produit: any[] = [];

    clientDATA: any[] = [];
    commandeDATA: any[] = [];
    produitDATA: any[] = [];
    dataChartProduit: any[] = [];
    dataChartSomme: any[] = [];

    position: any = "right";
    view0: any[number] = [900, 600];
    view: any[number] = [800, 500];
    view1: any[number] = [300, 250];

    // options
    legend: boolean = true;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = "Products";
    yAxisLabel: string = "Sales";
    timeline: boolean = true;
    gradient: any = true;
    cardColor: any = "#fff";
    // options
    showLegend: any = true;

    isDoughnut: any = true;

    legendPosition: any = "right";

    labelFormatting(c: any) {
        return `${c.label} Sales`;
    }

    colorScheme: any = {
        domain: ["#704FC4", "#4B852C", "#B67A3D", "#5B6FC8", "#25706F"],
    };
    colorScheme1: any = {
        domain: ["#704FC4"],
    };
    colorScheme2: any = {
        domain: ["#25706F"],
    };

    colorScheme3: any = {
        domain: ["#5B6FC8"],
    };
    colorScheme4: any = {
        domain: ["#4B852C"],
    };

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) {
        this.getClient();
        this.getCommande();
        this.getProduit();
        this.chartProduit();
    }

    ngOnInit(): void {}

    chartProduit() {
        this.http.get(`${this.URLPRODUIT}/read`).subscribe((data: any) => {
            if (data.length == 0) {
                console.log("zero taille");
            }
            this.tab_chart_produit = data;
            var tab: any[] = this.tab_chart_produit;
            var dataChartProduit: any[] = [];
            for (let i = 0; i < this.tab_chart_produit.length; i++) {
                dataChartProduit.push({
                    name: tab[i].libelle,
                    value: tab[i].nombre,
                });
            }

            this.dataChartProduit = dataChartProduit;
        });
    }

    getProduit() {
        this.http.get(`${this.URLPRODUIT}/read`).subscribe((data: any) => {
            this.tab_produit = data;
            let nb = this.tab_produit.length;
            this.produitDATA = [{ name: "PRODUIT", value: nb }];
        });
    }

    getCommande() {
        this.http.get(`${this.URLCOMMANDE}/read`).subscribe((data: any) => {
            this.tab_commande = data;
            if (this.tab_commande.length !== 0) {
                let nb = this.tab_commande.length;
                this.commandeDATA = [{ name: "COMMANDE", value: nb }];
                console.log(data);
                const infoCommande: any[] = data;
                let numbers = infoCommande.map((p) => {
                    return p.prixTotal;
                });

                var sum: number = numbers.reduce(myFunction);

                function myFunction(total: any, value: any) {
                    return total + value;
                }

                var count = numbers.length;

                this.dataChartSomme = [
                    {
                        name: "SOMME TOTAL D'ARGENT",
                        value: sum.toString() + " ARIARY",
                    },
                    {
                        name: "DEMANDE",
                        value: count,
                    },
                ];
            }
        });
    }

    getClient() {
        this.http.get(`${this.URLCLIENT}/read`).subscribe((data: any) => {
            this.tab_client = data;
            let nb = this.tab_client.length;
            this.clientDATA = [{ name: "CLIENT", value: nb }];
        });
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
