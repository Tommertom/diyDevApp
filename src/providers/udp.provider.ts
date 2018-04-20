import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

// plugin installation needed:
// ionic plugin add --save  cordova-plugin-chrome-apps-sockets-udp
// https://www.npmjs.com/package/cordova-plugin-chrome-apps-sockets-udp

declare var chrome: any;

@Injectable()
export class UDPService {

    sendUDPMessage(message: string, port: number, addresses: Array<string>, ttl: number, timetolisten: number) {

        return new Observable(observer => {

            let socketid: number = -1;

            // convert string to ArrayBuffer - taken from Chrome Developer page
            function str2ab(str) {
                var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
                var bufView = new Uint16Array(buf);
                for (var i = 0, strLen = str.length; i < strLen; i++) {
                    bufView[i] = str.charCodeAt(i);
                }
                return buf;
            }

            function ab2str(buf) {
                return String.fromCharCode.apply(null, new Uint8Array(buf));
            };

            // edge case - happening too. Let's just report
            if (typeof chrome === 'undefined') console.log('HEY!!! chrome not defined??');

            // only do udp stuff if there is plugin defined
            if (typeof chrome.sockets !== 'undefined') {

                // register the listeners
                chrome.sockets.udp.onReceive.addListener(
                    (info) => {
                        // we have found one 
                        observer.next(info);
                    }
                );
                chrome.sockets.udp.onReceiveError.addListener(
                    (error) => {
                        console.log('Recv  ERROR from socket: ', error);
                        observer.next({ 'error': error });
                    }
                );

                // translate the string into ArrayBuffer
                let SENDBUFFER = str2ab(message);

                // send  the UDP search as captured in UPNPSTRING and to port PORT
                chrome.sockets.udp.create((createInfo) => {
                    chrome.sockets.udp.bind(createInfo.socketId, '0.0.0.0', port, (bindresult) => {
                        socketid = createInfo.socketId;

                        chrome.sockets.udp.setMulticastTimeToLive(createInfo.socketId, ttl, (ttlresult) => {

                            chrome.sockets.udp.setBroadcast(createInfo.socketId, true, (sbresult) => {

                                // do all adresses 
                                addresses.map(address => {
                                    chrome.sockets.udp.send(createInfo.socketId, SENDBUFFER, address, port, (sendresult) => {
                                        if (sendresult < 0) {
                                            console.log('send fail: ' + sendresult);
                                            observer.next({ 'error': sendresult });
                                        } else {
                                            console.log('sendTo: success ' + port, createInfo, bindresult, ttlresult, sbresult, sendresult);
                                        }
                                    });
                                });
                            });
                        });
                    });
                });

                // and close the observable after a while
                setTimeout(() => {
                    if ((typeof chrome.sockets !== 'undefined') && (socketid != -1)) chrome.sockets.udp.close(socketid);
                    observer.complete();
                }, timetolisten);
            }
        })

    }

}