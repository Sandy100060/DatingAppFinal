import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../_services/Auth.service";
import { AlertifyServiceService } from "../_services/AlertifyService.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyServiceService
  ) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertifyService.success("registered successfully");
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
