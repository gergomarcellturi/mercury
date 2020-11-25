export interface ColorTheme {
  name: string;
  properties: any;
}

export const testTheme1: ColorTheme = {
  name: 'test1',
  properties: {
    '--primary-color': '#ee88ee',
    '--secondary-color': '#aaaaaa',
    '--tertiary-color': '#ee0000',
    '--chat-background-color': '#000000',
  }
};

export const testTheme2: ColorTheme = {
  name: 'test2',
  properties: {
    '--primary-color': '#cc00cc',
    '--secondary-color': '#aaaaaa',
    '--tertiary-color': '#ee0000',
    '--chat-background-color': '#ee0000',
  }
};
