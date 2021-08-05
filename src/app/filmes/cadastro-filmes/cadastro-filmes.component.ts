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
import { ActivatedRoute, Router } from "@angular/router";
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
  id: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private movieService: FilmsService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.movieService
        .view(this.id)
        .subscribe((movie: Movie) => this.createForm(movie));
    } else {
      this.createForm(this.createBlankForm());
    }

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
    const movie = this.form.getRawValue() as Movie;
    if (this.id) {
      movie.id = this.id
      this.edit(movie);
    } else {
      this.save(movie);
    }
  }

  private createForm(movie: Movie) {
    this.form = this.fb.group({
      title: [
        movie.title,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      urlPhoto: [movie.urlPhoto, Validators.required],
      dtLancamento: [movie.dtLancamento, Validators.required],
      description: [movie.description, [Validators.maxLength(100)]],
      nota: [
        movie.nota,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      urlIMDb: [movie.urlIMDb, Validators.required],
      gender: [movie.gender, Validators.required],
    });
  }

  private createBlankForm(): Movie {
    return {
      id: null,
      title: null,
      dtLancamento: null,
      gender: null,
      nota: null,
      description: null,
      urlPhoto: null,
      urlIMDb: null,
    } as Movie;
  }

  private save(movie: Movie): void {
    this.movieService.save(movie).subscribe(
      () => {
        const config = {
          data: {
            btnSave: "Ir para a listagem",
            btnCancel: "Cadastrar um novo filme",
            btnColorCancel: "primary",
            // hasCloseBtn: true,
          } as Alert,
        };
        const dialogRef = this.dialog.open(AlertComponent, config);
        dialogRef.afterClosed().subscribe((option: boolean) => {
          if (option) {
            this.router.navigate(["/filmes"]);
          } else {
            this.resetForm();
          }
        });
        // this.form.reset()
      },
      () => {
        const config = {
          data: {
            title: "Erro ao salvar o registro",
            description:
              "Não conseguimos salvar seu registro, tente novamente mais tarde",
            btnColorSucess: "warn",
            btnSave: "Fechar",
          } as Alert,
        };
        this.dialog.open(AlertComponent, config);
      }
    );
  }

  private edit(movie: Movie): void {
    this.movieService.edit(movie).subscribe(
      () => {
        const config = {
          data: {
            description: "Seu Registro foi atualizado com sucesso",
            btnColorSucess: "primary",
            // hasCloseBtn: true,
          } as Alert,
        };
        const dialogRef = this.dialog.open(AlertComponent, config);
        dialogRef
          .afterClosed()
          .subscribe(() => this.router.navigate(["/filmes"]));

      },

      () => {
        const config = {
          data: {
            title: "Erro ao editar o registro",
            description:
              "Não conseguimos editar seu registro, tente novamente mais tarde",
            btnColorSucess: "warn",
            btnSave: "Fechar",
          } as Alert,
        };
        this.dialog.open(AlertComponent, config);
      }
    );
  }
  
}
