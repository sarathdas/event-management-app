import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDatepicker,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  page: number = 1;
  pageSize: number = 5;
  searchTerm: string = '';
  selectedDate: Date | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
  }

  get filteredEvents() {
    return this.events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate = this.selectedDate
        ? new Date(event.date).toDateString() ===
          this.selectedDate.toDateString()
        : true;
      return matchesSearch && matchesDate;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedDate = null;
    this.page = 1;
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id);
  }

  updateSearchTerm(term: string) {
    this.searchTerm = term;
  }

  updateSelectedDate(date: Date | null) {
    this.selectedDate = date;
  }
}
