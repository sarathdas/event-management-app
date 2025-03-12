import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: Event[] = [];
  private eventsSubject = new BehaviorSubject<Event[]>(this.events);
  events$ = this.eventsSubject.asObservable();

  constructor() {
    // Sample data
    this.events = [
      {
        id: 1,
        title: 'Event 1',
        date: '2023-10-01',
        location: 'Location 1',
        description: 'Description 1',
      },
      {
        id: 2,
        title: 'Event 2',
        date: '2023-10-02',
        location: 'Location 2',
        description: 'Description 2',
      },
      {
        id: 3,
        title: 'Event 3',
        date: '2023-10-03',
        location: 'Location 3',
        description: 'Description 3',
      },
      {
        id: 4,
        title: 'Event 4',
        date: '2023-10-04',
        location: 'Location 4',
        description: 'Description 4',
      },
      {
        id: 5,
        title: 'Event 5',
        date: '2023-10-05',
        location: 'Location 5',
        description: 'Description 5',
      },
      {
        id: 6,
        title: 'Event 6',
        date: '2023-10-06',
        location: 'Location 6',
        description: 'Description 6',
      },
    ];
    this.eventsSubject.next(this.events);
  }

  getEvents() {
    return this.eventsSubject.asObservable();
  }

  addEvent(event: Event) {
    this.events.push(event);
    this.eventsSubject.next(this.events);
  }

  updateEvent(updatedEvent: Event) {
    const index = this.events.findIndex(
      (event) => event.id === updatedEvent.id
    );
    if (index !== -1) {
      this.events[index] = updatedEvent;
      this.eventsSubject.next(this.events);
    }
  }

  deleteEvent(id: number) {
    this.events = this.events.filter((event) => event.id !== id);
    this.eventsSubject.next(this.events);
  }

  getEventById(id: number): Event | undefined {
    return this.events.find((event) => event.id === id);
  }

  getCurrentEvents(): Event[] {
    return this.eventsSubject.getValue();
  }
}
