import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";
import { FilterPersonnelPipe } from "./filter-personnel.pipe";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { HomeComponent } from "./home/home.component";
import { ClientComponent } from "./client/client.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FilterClientPipe } from "./filter-client.pipe";
import { ReservationComponent } from "./reservation/reservation.component";
import { ChambreComponent } from "./chambre/chambre.component";
import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },

  { path: "login", component: LoginComponent },

  // 🔐 routes protégées
  {
    path: "client",
    component: ClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "chambre",
    component: ChambreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reservation",
    component: ReservationComponent,
    canActivate: [AuthGuard]
  },

  { path: "**", redirectTo: "login" }
];


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        FilterPersonnelPipe,
        HomeComponent,
        ClientComponent,
        FilterClientPipe,
        ReservationComponent,
        ChambreComponent,
        NavbarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes),
        NgxChartsModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [AuthService, AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
