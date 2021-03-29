import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pets: { id: number, nombre: string, tipo: string, urlimg: string}[] = [];

  constructor() { }

  async ngOnInit() {

    const response = await fetch('http://localhost:3000/mascotas');
    const json = await response.json();

    this.pets = json;

    console.log(this.pets);

  }
}
