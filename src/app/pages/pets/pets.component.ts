import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets: { id: number, nombre: string, tipo: string, urlimg: string}[] = [];
  typesPets:{nombre: string}[] = []
  counter:number[] = [];

  constructor() { }

  async ngOnInit() {

    fetch('http://localhost:3000/tipos')
    .then(res => res.json())
    .then( json => this.typesPets = json )
    .catch(err => console.log(err))

    this.createTable()

  }

  async createTable() {

    this.pets = [];
    this.counter = [];

    const response = await fetch('http://localhost:3000/mascotas');
    const json = await response.json();

    this.pets = json;

    for(let a = 0; a < this.pets.length; a++){
      this.counter = [...this.counter, a];
    }

  }


  openModal(): void {
    const modal = document.getElementById('modal')

    modal?.setAttribute('style','opacity: 1; z-index: 11;')
  }

  closeModal(): void {

    const modal = document.getElementById('modal')

    modal?.setAttribute('style','opacity: 0; z-index: -1;')
  }

  newPet = {
    "nombre": "",
    "tipo": "",
    "urlimg": ""
  };

  postPet(): void {

    if(this.newPet.nombre == ''){
      alert('Ingrese un nombre');
    }
    else if( this.newPet.tipo == ''){
      alert('Ingrese un tipo');
    }
    else if( this.newPet.urlimg == ''){
      alert('Ingrese una url de imagen');
    }
    else{

      fetch('http://localhost:3000/mascotas', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newPet)
      })
      .then(res => console.log(res.json))
      .then(json => this.createTable())
    }

  }


  deletePet(button:number): void{

    let id = this.pets[button].id

    fetch(`http://localhost:3000/mascotas/${id}`, {
      method: 'DELETE',
    })
    .then(res => console.log(res.json))
    .then(json => this.createTable())

  }


  updatePetId = 0;
  updatePet = {
    "nombre": "",
    "tipo": "",
    "urlimg": ""
  };

  openModalUpdate(button:number): void {

    this.updatePetId = this.pets[button].id;
    this.updatePet = {
      "nombre": `${this.pets[button].nombre}`,
      "tipo": `${this.pets[button].tipo}`,
      "urlimg": `${this.pets[button].urlimg}`
    };

    const modalUpdate = document.getElementById('modalUpdate')

    modalUpdate?.setAttribute('style','opacity: 1; z-index: 11;')


  }

  closeModalUpdate(): void {

    const modalUpdate = document.getElementById('modalUpdate')

    modalUpdate?.setAttribute('style','opacity: 0; z-index: -1;')
  }

  putPet(): void {

    if(this.updatePet.nombre == ''){
      alert('Ingrese un nombre');
    }
    else if( this.updatePet.tipo == ''){
      alert('Ingrese un tipo');
    }
    else if( this.updatePet.urlimg == ''){
      alert('Ingrese una url de imagen');
    }
    else{

      fetch(`http://localhost:3000/mascotas/${this.updatePetId}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.updatePet)
      })
      .then(res => console.log(res.json))
      .then(json => this.createTable())
    }

  }

}
