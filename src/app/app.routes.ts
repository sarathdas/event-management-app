import { Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventFormComponent } from './event-form/event-form.component';

export const routes: Routes = [
  { path: 'events', component: EventListComponent }, // Route for the event list
  { path: 'event/:id', component: EventDetailComponent }, // Route for event details
  { path: 'event-form', component: EventFormComponent }, // Route for creating/editing an event
  { path: '', redirectTo: '/events', pathMatch: 'full' }, // Redirect to event list on app load
  { path: '**', redirectTo: '/events' }, // Wildcard route to redirect to event list for any unknown routes
];
