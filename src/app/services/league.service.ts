/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { lastValueFrom, Observable } from 'rxjs';

import { IMatch } from '../interfaces/match';
import { ITeam } from '../interfaces/team';

const userProfileUrl: string = 'http://localhost:3001/api';

interface IResponse {
  success: boolean,
  matches: IMatch[]
};

@Injectable({
  providedIn: 'root'
})

export class LeagueService {
  matches: IMatch[] = [];

  constructor(private http: HttpClient) { }

  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */

  setMatches(matches: IMatch[]) {
    this.matches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches(): IMatch[] {
    return this.matches;
  }

  /**
   * Returns the leaderBoard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderBoard.
   */
  getLeaderBoard(): ITeam[] {
    const teams: ITeam[] = [];

    const getPoint = (first, second) => {
      if (first > second) return 3;
      if (first === second) return 1;
      return 0;
    }

    this.matches
      .map(match => {
        const { homeTeam, awayTeam, homeTeamScore, awayTeamScore } = match;
        let index = teams.findIndex(team => team.teamName === homeTeam),
          index2 = teams.findIndex(team => team.teamName === awayTeam);

        if (index === -1) {
          teams.push({
            teamName: homeTeam,
            matchesPlayed: 1,
            goalsFor: homeTeamScore,
            goalsAgainst: awayTeamScore,
            points: getPoint(homeTeamScore, awayTeamScore)
          });
        } else {
          const { matchesPlayed, goalsFor, goalsAgainst, points } = teams[index];
          teams[index] = {
            ...teams[index],
            matchesPlayed: matchesPlayed + 1,
            goalsFor: goalsFor + homeTeamScore,
            goalsAgainst: goalsAgainst + awayTeamScore,
            points: points + getPoint(homeTeamScore, awayTeamScore)
          }
        }

        if (index2 === -1) {
          teams.push({
            teamName: awayTeam,
            matchesPlayed: 1,
            goalsFor: awayTeamScore,
            goalsAgainst: homeTeamScore,
            points: getPoint(awayTeamScore, homeTeamScore)
          });
        } else {
          const { matchesPlayed, goalsFor, goalsAgainst, points } = teams[index2];
          teams[index2] = {
            ...teams[index2],
            matchesPlayed: matchesPlayed + 1,
            goalsFor: goalsFor + awayTeamScore,
            goalsAgainst: goalsAgainst + homeTeamScore,
            points: points + getPoint(awayTeamScore, homeTeamScore)
          }
        }

      });

    return teams.sort((a, b) => b.points - a.points);
  }

  /**
   * Asynchronic function to fetch the data from the server.
   */
  async fetchData(): Promise<void> {
    this.matches = (await lastValueFrom(this.getMatchesObservable())).matches;
  }

  /**
  * Returns the full list of matches observable.
  *
  * Observables are better than async/await.
  *
  * @returns {IResponse} Observable.
  */
  getMatchesObservable(): Observable<IResponse> {
    return this.http.get<IResponse>(
      userProfileUrl + '/v1/getAllMatches',
      {
        headers: {
          Authorization: 'Bearer YuHBdSlDXY000xa8IlCm7Qgq4_s'
        },
        observe: 'body'
      }
    );
  }
}
