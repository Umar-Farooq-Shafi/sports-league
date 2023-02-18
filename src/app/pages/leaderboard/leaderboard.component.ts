import { Component, OnDestroy, OnInit } from '@angular/core';

import { LeagueService } from 'src/app/services/league.service';

import { ITeam } from './../../interfaces/team';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  teams: ITeam[] = [];

  constructor(private leagueService: LeagueService) { }

  async ngOnInit(): Promise<void> {
    await this.leagueService.fetchData();
    this.teams = this.leagueService.getLeaderBoard();
  }

  ngOnDestroy(): void {
  }

}
