import {User} from '../interfaces/User';

export class Chat {
  participants: User[];
  messages: {
    from: string;
    text: string;
    timestamp: string;
  };
}
