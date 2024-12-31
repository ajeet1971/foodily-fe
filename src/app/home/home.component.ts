import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Recipe } from '../models/recipe.model';
import { SingleRecipeCardComponent } from '../componants/single-recipe-card/single-recipe-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SingleRecipeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate(
          '0.5s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiServiceService,
    private ngxUiLoderService: NgxUiLoaderService
  ) {}

  recipes!: Recipe[];
  silder!: Recipe[];
  imageUrl = 'https://localhost:7088/';
  ngOnInit(): void {
    this.getRecipe();
  }

  viewRecipe(id: number | undefined): void {
    this.router.navigate(['/recipe-details', id]);
  }

  async getRecipe() {
    try {
      this.ngxUiLoderService.start();
      let data = await this.apiService.getRecipe().toPromise();
      if (data?.result.length) {
        this.recipes = data.result;
        this.recipes.map((x) => (x.photo = this.apiService.getImageUrl(x)));
        this.silder = this.recipes.slice(0, 4);
      }
      this.ngxUiLoderService.stop();
    } catch (e: any) {
      // this.toastService.addMessage('warning', e.message);
    }
  }
}
