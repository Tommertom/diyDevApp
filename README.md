# diyDevApp - the alternative DevApp for (Ionic) devs - make you rown
This near-finished boilerplate allows you to run a devapp to test cordova web apps like Ionic's great framework on a 
physical device while runing a dev web server (like Ionic's `ionic serve`) and not needing to use a cable or live-reload.

Big difference with PhoneGaps's DevApp and Ionic's DevApp is that it doesn't have a fance UI and and you can't tap three fingers to kill, but it does do discovery, you can add your own plugins and you can do chrome developer tool like inspections.

I remembers the last used servers, you can easily manually add servers yourself.

## How to use:
* `git clone https://github.com/Tommertom/diyDevApp.git`
* cd diyDevApp
* run `npm i`
* change `config.xml` to change the package
* add the platform you want to use (ios/android)
* add the plugins you want to use - (the `cordova add plugin` command should suffice, btw)
* and install the custom diyDevApp build on the device (or multiple devices) using e.g. `ionic cordova run android`

If need to cordova plugins you want to use, just do the  `ionic cordova plugin add` part to add it to the diyDevApp boilerplate. And of course, in the app you are developing you need to both `ionic cordova plugin add` and the `npm install ` thing.

Security: this app uses cordova whitelist plugin v7 and allows you to access ANY webapp/website on the internet to be loaded in the webview container with the cordova plugins enabled. So basically extremely insecure if used improperly.

## WARNIG: Few plugins included and tested
I tested this against, flashlight, device and vibration. And it works.

## Todo
Well, ideally, there would be a nice UI like Ionic's DevApp, but I am not sure if that can be done using webapp or a javaplugin. Do some sliding to remove selected servers.

Tested under Android (I don't have xcode) and Samsung Tablet.

## Copyright
Copyright: see LICENSE.md