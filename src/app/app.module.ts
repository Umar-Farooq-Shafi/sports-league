/**
 * PLEASE DO NOT RENAME OR REMOVE ANY OF THE CODE BELOW.
 * YOU CAN ADD YOUR CODE TO THIS FILE TO EXTEND THE FEATURES TO USE THEM IN YOUR WORK.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ScheduleComponent } from './pages/schedule/schedule.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { OthersComponent } from './pages/others/others.component';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    LeaderboardComponent,
    OthersComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
