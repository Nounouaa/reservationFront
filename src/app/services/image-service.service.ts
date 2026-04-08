import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ImageServiceService {
    constructor(private http: HttpClient) {}
    uploadImage(file: File): Observable<any> {
        const formData = new FormData();
        formData.append("file", file);
        return this.http.post<any>("http://localhost:8080/upload", formData);
    }
}
