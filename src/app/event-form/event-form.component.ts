import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, Event } from '../event.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  imports: [FormsModule],
})
export class EventFormComponent implements OnInit {
  event: Event = { id: 0, title: '', date: '', location: '', description: '' };
  isEdit: boolean = false;

  constructor(
    private eventService: EventService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      const eventId = Number(id);
      const foundEvent = this.eventService.getEventById(eventId);
      if (foundEvent) {
        this.event = foundEvent;
      } else {
        // Handle the case where the event is not found
        console.error('Event not found');
        this.router.navigate(['/events']);
      }
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.eventService.updateEvent(this.event);
    } else {
      // Generate a new ID for the new event
      const newId =
        this.eventService.getCurrentEvents().length > 0
          ? Math.max(...this.eventService.getCurrentEvents().map((e) => e.id)) +
            1
          : 1; // Start from 1 if no events exist
      this.event.id = newId;
      this.eventService.addEvent(this.event);
    }
    this.router.navigate(['/events']);
  }
}
