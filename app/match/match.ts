import {Card} from './../card/card';
import {User} from './../user/user';
import {Group} from './../group/group';
import {Groups} from './groups';
import {GetUserInGroups} from './queries/get-user-in-groups';
import {GetAllUsers} from './queries/get-all-users';
import {AllUsersPlayed} from './queries/all-users-played';
import {FirstPlay} from './queries/first-play';

export class Match {
  private _room: string;
  private _current: number;
  private _groups: Groups;
  private _finished: boolean;

  private _getUser: GetUserInGroups;
  private _getUsers: GetAllUsers;
  private _allPlayed: AllUsersPlayed;
  private _firstPlay: FirstPlay;

  get room(): string {
    return this._room;
  }

  get current(): number {
    return this._current;
  }

  get groups(): Group[] {
    let groups: Group[] = [];

    for (let groupId in this._groups) {
      let group = this._groups[groupId];
      groups.push(group);
    }

    return groups;
  }

  get finished(): boolean {
    return this._finished;
  }

  get users(): User[] {
    return this._getUsers.execute(this._groups);
  }

  constructor(room: string) {
    this._room = room;

    this._current = 0;
    this._groups = {
      '?': new Group('?')
    };

    this._getUser = new GetUserInGroups();
    this._getUsers = new GetAllUsers();
    this._allPlayed = new AllUsersPlayed();
    this._firstPlay = new FirstPlay();
  }

  addUser(user: User): void {
    if (!user.name) {
      return;
    }

    let group = this._groups['?'];
    group.addUser(user);
  }

  removeUser(userId: string): void {
    for (let groupId in this._groups) {
      let group = this._groups[groupId];
      group.removeUser(userId);
    }
  }

  revealCard(userId: string, card: Card): void {
    let user = this._getUser.execute(userId, this._groups);
    user.reveal(card);

    this.addUserInGroup(user, card.value);

    this._finished = this._allPlayed.execute(this._groups);
    if (this._finished) {
      this.result();
      return;
    }

    let matchStarted = this._firstPlay.execute(this._groups);
    if (matchStarted) {
      this.reset();
    }
  }

  private addUserInGroup(user: User, groupId: string): void {
    this.removeUser(user.id);

    if (!(groupId in this._groups)) {
      this._groups[groupId] = new Group(groupId);
    }

    let group = this._groups[groupId];
    group.addUser(user);
  }

  private result(): void {
    for (let groupId in this._groups) {
      let group = this._groups[groupId];
      group.showCards();
    }
  }

  private reset(): void {
    this._finished = false;
    this._current++;

    let group: Group;

    for (let groupId in this._groups) {
      group = this._groups[groupId];
      group.hideCards();
    }

    group = this._groups['?'];

    let users = this._getUsers.execute(this._groups);
    users.forEach(user => {
      if (!user.played) {
        this.removeUser(user.id);
        group.addUser(user);
      }
    });
  }
}
