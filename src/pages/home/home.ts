import { Component } from '@angular/core';
import { NavController, ItemSliding } from 'ionic-angular';
import { UDPService } from '../../providers/udp.provider';

import { Storage } from '@ionic/storage';
import { NgZone } from '@angular/core';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  foundHosts: Array<Object> = [];
  earlierHosts: Array<Object> = [];
  foundHostObject: Object = {};

  customURI: string = "";
  customName: string = "";

  isSearching: boolean = false;

  constructor(private zone: NgZone, public navCtrl: NavController, private udp: UDPService, private storage: Storage) {

    // try to find earlier used hosts
    this.storage.ready().then(() => {
      return this.storage.get('earlierHosts')
    })
      .then(val => {
        if (Array.isArray(val))
          this.earlierHosts = val;
      })
  }

  ionViewWillEnter() {
    this.searchDevApps();
  }

  searchDevApps() {

    this.isSearching = true;
    this.udp.sendUDPMessage('ION_DP', 41234, ['239.255.255.250', '255.255.255.255'], 2, 100000)
      // and yes.. we can do this without subscribing and in an async matter, but we're lazy today
      .subscribe(
        (mss) => {

          // We should get output such as....
          //ION_DP{"t":1522605683541,"id":"992617","nspace":"devapp","name":"client@8100","host":"DESKTOP-3S9EOAT","ip":"192.168.178.235","port":8100,"path":"/?devapp=true"}
          let msgString = String.fromCharCode.apply(null, new Uint8Array(mss['data']));
          if (msgString.indexOf('ION_DP') == 0) {

            let foundHost = JSON.parse(msgString.substring(6));
            foundHost['full_url'] = 'http://' + foundHost['ip'] + ':' + foundHost['port'] + foundHost['path'];

            // a bit of awkward way of ensuring uniqueness of dev servers
            // have issue with filter function. Probably because of msgString type mismatch??
            this.zone.run(() => { 

              this.foundHostObject[foundHost['full_url']] = foundHost;

              //console.log('FOUND HOSTS OBJECT', this.foundHostObject);
              this.foundHosts = [];
              Object.keys(this.foundHostObject).map(full_url => {
                this.foundHosts.push(this.foundHostObject[full_url]);
              })

              // remove the entry after 5 seconds - not a very proper way
              setTimeout(() => {
                delete this.foundHostObject[foundHost['full_url']];
              }, 5000);

            })
          }
        },
        (err) => { this.isSearching = false },
        () => { this.isSearching = false })
  }

  saveEarlierHosts() {
    this.storage.set('earlierHosts', this.earlierHosts);
  }

  addServer() {
    let host = { name: this.customName, full_url: this.customURI };
    this.clickHost(host);
  }

  deleteHost(item: Object, itemSliding: ItemSliding) {
    itemSliding.close();

    this.earlierHosts = this.earlierHosts.filter(host => {
      return host['full_url'] != item['full_url']
    });

    this.saveEarlierHosts();
  }

  // BYE BYE!!!
  clickHost(host) {

    console.log('Clicking host ', host)

    this.earlierHosts = this.earlierHosts.filter(item => { return item['full_url'] != host['full_url'] })
    this.earlierHosts.push(Object.assign({ timestamp: Date.now() }, host));

    this.saveEarlierHosts();

    setTimeout(() => { window.location = host['full_url'] }, 100);
  }

}
