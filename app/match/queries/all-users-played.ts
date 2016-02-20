import {User} from './../groups';

export class AllUsersPlayed {
  execute(groups: Groups): boolean {
    let notPlayed = false;
    
    for (let groupId in groups) {
      let group = groups[groupId];
      
      group.users.forEach(user => {
        if !(user.played) {
          notPlayed = true;
          return;
        }
      });
      
      if (notPlayed) {
        return false;
      }
    }
    
    return true;
  }
}