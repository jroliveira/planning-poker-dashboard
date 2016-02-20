import {User} from './../groups';

export class FirstPlay {
  execute(groups: Groups): boolean {
    let played = 0;
    
    for (let groupId in groups) {
      let group = groups[groupId];
      
      group.users.forEach(user => {
        if (user.played) {
          played++;
        }
      });
    }
    
    return played == 1;
  }
}