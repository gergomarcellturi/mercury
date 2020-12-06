export interface ColorTheme {
  name: string;
  properties: any;
}

export const testTheme1: ColorTheme = {
  name: 'red',
  properties: {
    '--gradient-1': 'rgb(246, 219, 192)',
    '--gradient-2': 'rgb(240, 116, 112)',
    '--gradient-3': 'rgb(220, 28, 19)',
    '--fancy-background-color': '#ee0000',
  }
};

export const testTheme2: ColorTheme = {
  name: 'blue',
  properties: {
    '--gradient-1': 'rgb(255, 143, 178)',
    '--gradient-2': 'rgb(167, 151, 255)',
    '--gradient-3': 'rgb(0, 229, 255)',
    '--fancy-background-color': '#00acc2',
  }
};
