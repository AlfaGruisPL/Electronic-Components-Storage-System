import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.magazynMobile',
  appName: 'Magazyn',
  webDir: 'www',
  bundledWebRuntime: false,
  loggingBehavior: 'none',
  hideLogs: true,
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'true',
      SplashScreen: 'screen',
      SplashScreenDelay: '1',

    }
  }
};

export default config;
