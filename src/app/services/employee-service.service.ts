import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class EmployeeServiceService {
    nbreEmployee: number = 0;
    arrayP: any[] = [];
    constructor(private http: HttpClient) {}

    // Méthode publique pour lire le nombre d'employés
    getNbreEmployee(): number {
        return this.nbreEmployee;
    }

    // Méthode privée pour lire les employés et mettre à jour nbreEmployee
    private readEmployee(): void {
        this.http
            .get("http://localhost:8080/employee/read")
            .subscribe((data: any) => {
                this.arrayP = data;
                this.nbreEmployee = this.arrayP.length;
            });
    }

    // Exemple d'utilisation : appeler readEmployee() puis obtenir le nombre d'employés
    public updateAndGetNbreEmployee(): number {
        this.readEmployee();
        return this.getNbreEmployee(); // Utilise getNbreEmployee() pour accéder à la valeur
    }
}
