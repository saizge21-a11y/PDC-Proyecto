import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { ListTable } from './components/list-table/list-table';
import { AddEditData } from './components/add-edit-data/add-edit-data';
import { ProgressBar } from './shared/progress-bar/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    ListTable,
    AddEditData,
    ReactiveFormsModule,
    ProgressBar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
