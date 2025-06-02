import { config, passport } from '@imtbl/sdk';

const publishableKey = process.env.NEXT_PUBLIC_PUBLISHABLE_KEY || '';
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || '';
// create the Passport instance and export it so it can be used in the examples
export const passportInstance = new passport.Passport({
  baseConfig: {
    environment: config.Environment.SANDBOX,
    publishableKey
  },
  clientId,
  redirectUri: '/redirect', // replace with one of your redirect URIs from Hub
  logoutRedirectUri: '/logout', // replace with one of your logout URIs from Hub
  audience: 'platform_api',
  scope: 'openid offline_access email transact',
  popupOverlayOptions: {
    disableGenericPopupOverlay: false, // Set to true to disable the generic pop-up overlay
    disableBlockedPopupOverlay: false, // Set to true to disable the blocked pop-up overlay
  },
});
