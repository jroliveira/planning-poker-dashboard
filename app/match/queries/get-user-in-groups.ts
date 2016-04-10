import {User} from './../../user/user';
import {Groups} from './../groups';

export class GetUserInGroups {
  execute(userId: string, groups: Groups): User {
    for (let groupId in groups) {
      let group = groups[groupId];
      let user = group.getUser(userId);

      if (user) {
        return user;
      }
    }

    return null;
  }
}
