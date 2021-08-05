import { AlertComponent } from "./../../shared/components/alert/alert.component";
import { Router } from "@angular/router";
import { Alert } from "./../../shared/models/alert";
import { Movie } from "./../../shared/models/Movie";
import { FilmsService } from "./../../core/films.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "visualizar-filmes",
  templateUrl: "./visualizar-filmes.component.html",
  styleUrls: ["./visualizar-filmes.component.scss"],
})
export class VisualizarFilmesComponent implements OnInit {
  readonly noPhoto =
    "https://termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg";

  movie: Movie;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private service: FilmsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.visualizar();
  }

  edit():void {
    this.router.navigate(['/filmes/cadastro/' + this.id])
  }

  excluir() {
    const config = {
      data: {
        title: "Are you sure about delete?",
        description: "If you have sure about it, click on the button OK",
        hasCloseBtn: true,
        btnColorCancel: 'primary',
        btnColorSucess: 'warn'
      } as Alert,
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((option: boolean) => {
      if (option) {
        this.service.delete(this.id).subscribe(() => this.router.navigate(['/filmes']))
      }
    });
  }

  goBack() {
    this.router.navigate(['/filmes'])
  }

  private visualizar(): void {
    this.service
      .view(this.id)
      .subscribe((filme: Movie) => (this.movie = filme));
  }
}
