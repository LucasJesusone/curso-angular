import { Alert } from "./../../models/alert";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit {
  alert = {
    title: "Sucesso",
    description: "Deu tudo certo",
    btnSave: "Salvou",
    btnCancel: "Cancelar",
    btnColorSucess: "primary",
    btnColorCancel: 'warn',
    // hasCloseBtn: false,
  } as Alert;

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alert) {}

  ngOnInit() {
    if (this.data) {
      this.alert.title = this.data.title || this.alert.title,
      this.alert.description = this.data.description ||  this.alert.description;
      this.alert.btnSave = this.data.btnSave || this.alert.btnSave;
      this.alert.btnCancel = this.data.btnCancel || this.alert.btnCancel;
      this.alert.btnColorSucess = this.data.btnColorSucess || this.alert.btnColorSucess;
      this.alert.btnColorCancel = this.data.btnColorCancel || this.alert.btnColorCancel;
      // this.alert.hasCloseBtn = this.data.hasCloseBtn || this.alert.hasCloseBtn;
    }
  }
}
