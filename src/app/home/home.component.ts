import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
export class HomeComponent {
  constructor(private router: Router) {}

  recipes = [
    {
      id: 1,
      title: 'Sushi Easy Recipe',
      description: 'Delicious and simple sushi recipe for beginners.',
      image: 'path-to-sushi-image.jpg',
    },
    {
      id: 2,
      title: 'Homemade Burger',
      description: 'Juicy and flavorful homemade burger.',
      image: 'path-to-burger-image.jpg',
    },
    // Add more recipes here...
  ];

  images = [
    'path-to-image1.jpg',
    'path-to-image2.jpg',
    'path-to-image3.jpg',
    'path-to-image4.jpg',
    // Add more image URLs here...
  ];

  viewRecipe(id: number): void {
    this.router.navigate(['/recipe', id]);
  }
}
