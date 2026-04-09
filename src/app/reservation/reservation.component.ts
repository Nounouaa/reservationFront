import Swal from "sweetalert2";
import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: "app-reservation",
    templateUrl: "./reservation.component.html",
    styleUrl: "./reservation.component.scss",
})
export class ReservationComponent {
    searchText!: string;
    tableReservation!: [];
    apiURL = "https://reservationchambre-production.up.railway.app/reservation";
    apiURL2 = "https://reservationchambre-production.up.railway.app/client/getReservationByClient";

   getPdf(text: any) {
    this.http.get(`${this.apiURL2}/` + text).subscribe((data: any) => {
        console.log(data);

        const res = data[0];

        const numCli = res[0];
        const nom = res[1];
        const prenom = res[2];
        const numChambre = res[3];
        const dateReserve = res[4];

        const nomEtPrenoms = nom + " " + prenom;

       const documentDefinition: any = {
    content: [
        {
            text: "CONFIRMATION DE RÉSERVATION",
            style: "header",
        },

        {
            text: "Fianaranstoa, le " + dateReserve,
            style: "subheader",
            alignment: "right",
        },

        {
            text: " ",
        },

        {
            style: "tableExample",
            table: {
                widths: ["*", "*"],
                body: [
                    ["Nom et prénoms", nomEtPrenoms],
                    ["N° Client", numCli],
                    ["Numéro de chambre", numChambre],
                ],
            },
        },

        {
            text: "\n\n",
        },

        {
            text: "Nous vous confirmons que votre réservation a été effectuée avec succès.\nNous vous remercions pour votre confiance et nous vous souhaitons un excellent séjour.",
            style: "text",
        },

        {
            text: "\n\n\n",
        },

        {
            columns: [
                {
                    text: "Signature Client",
                    alignment: "center",
                },
                {
                    text: "Signature Hôtel",
                    alignment: "center",
                },
            ],
        },

        {
            columns: [
                {
                    text: "\n" + nomEtPrenoms,
                    alignment: "center",
                },
                {
                    text: "\nHôtel",
                    alignment: "center",
                },
            ],
        },
    ],

    styles: {
        header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
            margin: [0, 0, 0, 10],
        },
        subheader: {
            fontSize: 10,
            italics: true,
            margin: [0, 0, 0, 10],
        },
        text: {
            fontSize: 12,
            alignment: "justify",
        },
        tableExample: {
            margin: [0, 5, 0, 15],
        },
    },
};

        pdfMake.createPdf(documentDefinition)
               .download("Reservation-" + nomEtPrenoms + ".pdf");
    });
}

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) {
        this.read();
    }

    read() {
        this.http.get(`${this.apiURL}/read`).subscribe((data: any) => {
            this.tableReservation = data;
            console.log(data);
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
        }).then((result: any) => {
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
