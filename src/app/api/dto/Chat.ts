import {User} from './User';

export class Chat {
  participants: User[];
  messages: {
    from: string;
    text: string;
    timestamp: string;
  };
}
