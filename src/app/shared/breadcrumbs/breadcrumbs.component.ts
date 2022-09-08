import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo: string = '';
  public tituloSubs$: Subscription;
  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentoRuta()
                            .subscribe(({ titulo }) => {
                              this.titulo = titulo;
                              document.title = `AdminPro - ${this.titulo}`
                            });;
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }


  getArgumentoRuta(): Observable<any> {
    return this.router.events
      .pipe(
        filter((event: any) =>
          event instanceof ActivationEnd &&
          event.snapshot.firstChild === null
        ),
        map((event: ActivationEnd) => event.snapshot.data));
  }

}
