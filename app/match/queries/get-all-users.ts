import {User} from './../../user/user';
import {Groups} from './../groups';

export class GetAllUsers {
  execute(groups: Groups): User[] {
    let users: User[] = [];

    for (let groupId in groups) {
      let group = groups[groupId];

      group.users.forEach(user => {
        users.push(user);
      });
    }

    return users;
  }
}
