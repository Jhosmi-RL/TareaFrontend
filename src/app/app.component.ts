import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person, PersonBody } from './shared/models/person';
import { HttpClient } from '@angular/common/http';
import { PersonService} from './shared/services/person.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
  ],
  templateUrl: './app.component.html',
  providers: [
    HttpClient
  ],
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  cargaDatos: 'none' | 'loading' | 'done' | 'error' = "none";
  createPersonState: 'none' | 'loading' | 'done' | 'error' = "none";
  persons: Person[] = [];
  showFormPerson: 'none' | 'edit' | 'add' = 'none';
  formPerson: FormGroup;
  constructor(
    private personService: PersonService,
    private fb: FormBuilder
  ) {
    this.formPerson = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      correo: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(0)]],
      telefono: ['', [Validators.required]],
  });
  
  }

  ngOnInit(): void {
    //Consumiendo Servicio de API
    this.listAll();
  }

  listAll() {
    this.cargaDatos = 'loading';
    this.personService.list().subscribe({
      next: (data) => {
        this.cargaDatos = 'done';
        this.persons = data;
      },
      error: (_) => {
        this.cargaDatos = 'error';
      }
    });
  }

  addPerson() {
    this.showFormPerson = "add";
    this.createPersonState = 'none';
  }

  removePerson(person: Person) {
    person.remove = true;
  }

  confirmDelete(personId: number) {
    this.personService.remove(personId).subscribe({
      next: (res) => {
        // this.listAll();
        this.persons = this.persons.filter(b => b.id != personId);
      },
      error: (err) => {}
    });
  }
  cancelDelete(person: Person) {
    person.remove = false;
  }
  
  createPerson(){
    console.log(this.formPerson);
    this.createPersonState = 'loading';
    this.personService.create(this.formPerson.value as PersonBody).subscribe({
      next: (data) => {
        this.createPersonState = 'done';
        // this.listAll();
        this.persons.push(data);
      },
      error: (err) => {
        this.createPersonState = 'error';
      }
    });
  }
}
