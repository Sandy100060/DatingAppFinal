import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertifyServiceService } from "../_services/AlertifyService.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  values: any = {};
  registerMode: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyServiceService
  ) {}

  ngOnInit() {
    this.getValues();
  }

  registerToggle() {
    this.registerMode = true;
  }

  getValues() {
    return this.httpClient.get("http://localhost:5000/api/values").subscribe(
      response => {
        this.values = response;
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
