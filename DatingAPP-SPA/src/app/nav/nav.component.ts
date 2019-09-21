import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/Auth.service";
import { AlertifyServiceService } from "../_services/AlertifyService.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyServiceService
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      result => {
        this.alertifyService.success("Logged In successfully");
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    this.alertifyService.message("user logged out");
  }
}
