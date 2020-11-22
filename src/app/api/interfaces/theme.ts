export interface Theme {
  name: string;
  properties: any;
  stylish: boolean;
}

export const testTheme1: Theme = {
  name: 'test1',
  properties: {
    '--primary-color': '#ee88ee',
    '--secondary-color': '#aaaaaa',
    '--tertiary-color': '#ee0000',
    '--chat-background-color': '#ee0000',
  },
  stylish: false,
};

export const testTheme2: Theme = {
  name: 'test2',
  properties: {
    '--primary-color': '#cc00cc',
    '--secondary-color': '#aaaaaa',
    '--tertiary-color': '#ee0000',
    '--chat-background-color': '#ee0000',
  },
  stylish: false,
};
