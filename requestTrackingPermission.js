import {Platform} from 'react-native';
import {Settings} from 'react-native-fbsdk-next';
import {PERMISSIONS, RESULTS, request, check} from 'react-native-permissions';

export async function requestTrackingPermission() {
  if (Platform.OS === 'ios') {
    const ATT_CHECK = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    if (ATT_CHECK === RESULTS.DENIED) {
      try {
        const ATT = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
        if (ATT === RESULTS.GRANTED) {
          Settings.setAdvertiserTrackingEnabled(true).then(() => {
            Settings.initializeSDK();
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        Settings.initializeSDK();
      }
      Settings.initializeSDK();
      Settings.setAdvertiserTrackingEnabled(true);
      Settings.FacebookAutoLogAppEventsEnabled(true);
    }
  } else {
    Settings.initializeSDK();
    Settings.setAdvertiserTrackingEnabled(true);
  }
}
