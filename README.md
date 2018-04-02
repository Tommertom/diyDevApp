# diyDevApp - the alternative DevApp for (Ionic) devs - make you rown
This near-finished boilerplate allows you to run a devapp to test cordova web apps like Ionic's great framework on a physical device while runing a dev web server (like Ionic's `ionic serve`) and not needing to use a cable or live-reload.

Big difference with PhoneGaps's DevApp and Ionic's DevApp is that it doesn't have a fancy UI and and you can't tap three fingers to kill, but it does discovery, you can add your own plugins and you can do chrome developer inspections. Which I believe is more essential then anything else.

It remembers the last used servers, you can easily manually add servers yourself.

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
Well, ideally, there would be a nice UI like Ionic's DevApp. Do some sliding to remove selected servers. Test a bit more plugins. Remove typos.

Tested under Android (I don't have xcode) and Samsung Tablet.

## Copyright
Copyright: see LICENSE.md

## Plugin commands

Copied from ionicframework documentation (native)

`npm install --save @ionic-native/android-full-screen @ionic-native/badge @ionic-native/battery-status @ionic-native/brightness @ionic-native/call-number @ionic-native/camera @ionic-native/clipboard @ionic-native/contacts @ionic-native/device-motion @ionic-native/device-orientation @ionic-native/keyboard @ionic-native/network @ionic-native/nfc @ionic-native/pedometer @ionic-native/printer  @ionic-native/screenshot @ionic-native/sms @ionic-native/social-sharing @ionic-native/status-bar


ionic cordova plugin add cordova-plugin-fullscreen
npm install --save @ionic-native/android-full-screen

```
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

constructor(private androidFullScreen: AndroidFullScreen) { }

...

this.androidFullScreen.isImmersiveModeSupported()
  .then(() => console.log('Immersive mode supported'))
  .catch(err => console.log(error));
```


ionic cordova plugin add cordova-plugin-badge
npm install --save @ionic-native/badge

```
import { Badge } from '@ionic-native/badge';

constructor(private badge: Badge) { }


this.badge.set(10);
this.badge.increase(1);
this.badge.clear();
```

ionic cordova plugin add cordova-plugin-battery-status
npm install --save @ionic-native/battery-status

```
import { BatteryStatus } from '@ionic-native/battery-status';

constructor(private batteryStatus: BatteryStatus) { }

...


// watch change in battery status
const subscription = this.batteryStatus.onChange().subscribe(status => {
   console.log(status.level, status.isPlugged);
});

// stop watch
subscription.unsubscribe();
```

ionic cordova plugin add cordova-plugin-brightness 
npm install --save @ionic-native/brightness

```
import { Brightness } from '@ionic-native/brightness';

constructor(private brightness: Brightness) { }

...

let brightnessValue = 0.8;
this.brightness.setBrightness(brightnessValue);
```

ionic cordova plugin add call-number
npm install --save @ionic-native/call-number

import { CallNumber } from '@ionic-native/call-number';

constructor(private callNumber: CallNumber) { }

...


this.callNumber.callNumber("18001010101", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  

ionic cordova plugin add cordova-plugin-camera
npm install --save @ionic-native/camera

import { Camera, CameraOptions } from '@ionic-native/camera';

constructor(private camera: Camera) { }

...


const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 let base64Image = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 // Handle error
});

ionic cordova plugin add cordova-clipboard
npm install --save @ionic-native/clipboard

import { Clipboard } from '@ionic-native/clipboard';

constructor(private clipboard: Clipboard) { }

...


this.clipboard.copy('Hello world');

this.clipboard.paste().then(
   (resolve: string) => {
      alert(resolve);
    },
    (reject: string) => {
      alert('Error: ' + reject);
    }
  );

ionic cordova plugin add cordova-plugin-contacts
npm install --save @ionic-native/contacts

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

constructor(private contacts: Contacts) { }

let contact: Contact = this.contacts.create();

contact.name = new ContactName(null, 'Smith', 'John');
contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
contact.save().then(
  () => console.log('Contact saved!', contact),
  (error: any) => console.error('Error saving contact.', error)
);

ionic cordova plugin add cordova-plugin-device-motion
npm install --save @ionic-native/device-motion

import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

constructor(private deviceMotion: DeviceMotion) { }

...

// Get the device current acceleration
this.deviceMotion.getCurrentAcceleration().then(
  (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
  (error: any) => console.log(error)
);

// Watch device acceleration
var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
  console.log(acceleration);
});

// Stop watch
subscription.unsubscribe();
```

Bericht: REQUEST 20518555, VALUE Woudzoom 4, 3823 CA OF FIELD ORDER.HOUSENUMBER IS TOO LONG (MAX LENGTH: 15)

ionic cordova plugin add cordova-plugin-device-orientation
npm install --save @ionic-native/device-orientation

```
// DeviceOrientationCompassHeading is an interface for compass
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';

constructor(private deviceOrientation: DeviceOrientation) { }

...

// Get the device current compass heading
this.deviceOrientation.getCurrentHeading().then(
  (data: DeviceOrientationCompassHeading) => console.log(data),
  (error: any) => console.log(error)
);

// Watch the device compass heading change
var subscription = this.deviceOrientation.watchHeading().subscribe(
  (data: DeviceOrientationCompassHeading) => console.log(data)
);

// Stop watching heading change
subscription.unsubscribe();

ionic cordova plugin add ionic-plugin-keyboard
npm install --save @ionic-native/keyboard

```
import { Keyboard } from '@ionic-native/keyboard';

constructor(private keyboard: Keyboard) { }

...

this.keyboard.show();

this.keyboard.close();
``` 

ionic cordova plugin add cordova-plugin-network-information
npm install --save @ionic-native/network

```
import { Network } from '@ionic-native/network';

constructor(private network: Network) { }

...

// watch network for a disconnect
let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
});

// stop disconnect watch
disconnectSubscription.unsubscribe();


// watch network for a connection
let connectSubscription = this.network.onConnect().subscribe(() => {
  console.log('network connected!');
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      console.log('we got a wifi connection, woohoo!');
    }
  }, 3000);
});

// stop connect watch
connectSubscription.unsubscribe();
```

ionic cordova plugin add phonegap-nfc
npm install --save @ionic-native/nfc

```
import { NFC, Ndef } from '@ionic-native/nfc';

constructor(private nfc: NFC, private ndef: Ndef) { }

...

this.nfc.addNdefListener(() => {
  console.log('successfully attached ndef listener');
}, (err) => {
  console.log('error attaching ndef listener', err);
}).subscribe((event) => {
  console.log('received ndef message. the tag contains: ', event.tag);
  console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

  let message = this.ndef.textRecord('Hello world');
  this.nfc.share([message]).then(onSuccess).catch(onError);
});
```


ionic cordova plugin add cordova-plugin-pedometer
npm install --save @ionic-native/pedometer

```
import { Pedometer } from '@ionic-native/pedometer';

Pedometer.isDistanceAvailable()
  .then((available: boolean) => console.log(available))
  .catch((error: any) => console.log(error));

Pedometer.startPedometerUpdates()
   .subscribe((data: IPedometerData) => {
     console.log(data);
   });

```

ionic cordova plugin add cordova-plugin-printer
npm install --save @ionic-native/printer

```
import { Printer, PrintOptions } from '@ionic-native/printer';

constructor(private printer: Printer) { }

...

this.printer.isAvailable().then(onSuccess, onError);

let options: PrintOptions = {
     name: 'MyDocument',
     printerId: 'printer007',
     duplex: true,
     landscape: true,
     grayscale: true
   };

this.printer.print(content, options).then(onSuccess, onError);
```

ionic cordova plugin add com.darktalker.cordova.screenshot
npm install --save @ionic-native/screenshot

```
import { Screenshot } from '@ionic-native/screenshot';

constructor(private screenshot: Screenshot) { }

...

// Take a screenshot and save to file
this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(onSuccess, onError);

// Take a screenshot and get temporary file URI
this.screenshot.URI(80).then(onSuccess, onError);
```

ionic cordova plugin add cordova-sms-plugin
npm install --save @ionic-native/sms

```
import { SMS } from '@ionic-native/sms';

constructor(private sms: SMS) { }

...


// Send a text message using default options
this.sms.send('416123456', 'Hello world!');
```


ionic cordova plugin add cordova-plugin-x-socialsharing
npm install --save @ionic-native/social-sharing

```
import { SocialSharing } from '@ionic-native/social-sharing';

constructor(private socialSharing: SocialSharing) { }

...

// Check if sharing via email is supported
this.socialSharing.canShareViaEmail().then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});

// Share via email
this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
  // Success!
}).catch(() => {
  // Error!
});
```

ionic cordova plugin add cordova-plugin-statusbar
npm install --save @ionic-native/status-bar

```
import { StatusBar } from '@ionic-native/status-bar';

constructor(private statusBar: StatusBar) { }

...

// let status bar overlay webview
this.statusBar.overlaysWebView(true);

// set status bar to white
this.statusBar.backgroundColorByHexString('#ffffff');
```