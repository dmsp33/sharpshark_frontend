// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://api.sharpshark.io',// 'https://qa.sharpshark.io',//'http://homestead-apisharp.test', 'https://backend.sharpshark.io'
  baseUrlIPFS: 'http://ipfs03.sharpshark.io:8080/ipfs',
  gapi: {
    client_id: "958829385549-faqrridle3u835k4b8u4d9egoov981g8.apps.googleusercontent.com"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
