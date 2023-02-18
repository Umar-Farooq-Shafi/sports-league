/**
 * PLEASE DO NOT RENAME OR REMOVE ANY OF THE CODE BELOW.
 * YOU CAN ADD YOUR CODE TO THIS FILE TO EXTEND THE FEATURES TO USE THEM IN YOUR WORK.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleComponent } from './pages/schedule/schedule.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { OthersComponent } from './pages/others/others.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      {
        path: 'schedule',
        component: ScheduleComponent
      }
    ]
  },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '**', component: OthersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
