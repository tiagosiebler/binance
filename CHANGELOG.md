# Changelog

## 1.1.2
- Add lots of example responses and query paramter details to the README
- Fix onUserData where the promise wasn't being returned
- Add travis CI and coveralls

## 1.1.1
- Minor docs updates
- Set callback to deliver Error object on non 2XX return codes

## 1.1.0
- Setup account related APIs with new routes and signing
- Add allPrices and allBookTickers routes
- Add withdraw, withdrawHistory, depositHistory and depositAddress routes
- Setup the recvWindow query string option only to show up on signed routes

## 1.0.3
- Fix typo for websocket response beautify
- Properly handle 500 responses from the server which are not JSON
- Properly set recvWindow query option when passed to the constructor
- Update readme
- Update tests for fixes

## 1.0.2
Fix readme, remove extraneous file

## 1.0.1
Fix automatic timestamp issue

## 1.0.0
First release