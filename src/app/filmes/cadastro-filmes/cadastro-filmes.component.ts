import { Alert } from "./../../shared/models/alert";
import { AlertComponent } from "./../../shared/components/alert/alert.component";
import { FilmsService } from "./../../core/films.service";
import { Movie } from "./../../shared/models/Movie";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "dio-cadastro-filmes",
  templateUrl: "./cadastro-filmes.component.html",
  styleUrls: ["./cadastro-filmes.component.scss"],
})
export class CadastroFilmesComponent implements OnInit {
  genders: Array<string>;
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private movieService: FilmsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm()

    this.genders = [
      "Ação",
      "Romance",
      "Aventura",
      "Terror",
      "Ficção cientifica",
      "Comédia",
      "Drama",
    ];
  }

  createForm() {
    this.form = this.fb.group({
      title: ["",[Validators.required,Validators.minLength(4),Validators.maxLength(10),],],
      urlPhoto: ["", Validators.required],
      dtLancamento: ["", Validators.required],
      description: ["", [Validators.maxLength(100)]],
      nota: ["0", [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ["", Validators.required],
      gender: ["", Validators.required],
    });
  }

  resetForm(): void {
    this.form.reset();
  }
  goBack() {
    this.router.navigate(["/filmes"]);
  }



  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    const movie = this.form.getRawValue() as Movie;
    this.save(movie);

    // this.goBack()
  }

  private save(movie: Movie): void {
    this.movieService.save(movie).subscribe(
      () => {
        const config = {
          data: {
            btnSave: "Ir para a listagem",
            btnCancel: "Cadastrar um novo filme",
            btnColorCancel: 'primary',
            // hasCloseBtn: true,
          } as Alert,
        };
        const dialogRef = this.dialog.open(AlertComponent, config);
        dialogRef.afterClosed().subscribe((option: boolean) => {
          if (option) {
            this.router.navigate(['/filmes'])
          } else {
            this.resetForm()
          }
        });
        // this.form.reset()
      },
      () => {
        const config = {
          data: {
            title: "Erro ao salvar o registro",
            description: "Não conseguimos salvar seu registro, tente novamente mais tarde",
            btnColorSucess: 'warn',
            btnSave: "Fechar",
          } as Alert,
        };
        this.dialog.open(AlertComponent, config);
      });
  }
}
