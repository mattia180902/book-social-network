import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  //private routerSubscription: Subscription | undefined;

  constructor() {}

/*   ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveLink();
      });
    this.updateActiveLink(); // Inizializza lo stato attivo al caricamento del componente
  } */

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

 /*  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  } */

  /* private updateActiveLink(): void {
    const linkColor = document.querySelectorAll(".nav-link");
    const currentUrl = this.router.url; // Ottieni l'URL corrente dal router

    linkColor.forEach(link => {
      const linkPath = link.getAttribute("routerLink");
      if (currentUrl.includes(linkPath || "")) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  } */

  logout() {
    throw new Error('Method not implemented.');
  }
}