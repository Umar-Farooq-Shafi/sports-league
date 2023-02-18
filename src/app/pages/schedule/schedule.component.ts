import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LeagueService } from './../../services/league.service';
import { IMatch } from 'src/app/interfaces/match';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  matchesSub$: Subscription;

  matches: IMatch[];
  error: any;

  constructor(private leagueService: LeagueService) { }

  ngOnInit(): void {
    this.matchesSub$ = this.leagueService.getMatchesObservable()
      .subscribe({
        next: data => this.matches = [...data.matches],
        error: error => this.error = error,
      });
  }

  ngOnDestroy(): void {
    this.matchesSub$.unsubscribe();
  }

}
