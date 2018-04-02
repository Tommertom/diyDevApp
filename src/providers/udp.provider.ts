import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/Rx";

// plugin installation needed:
// ionic plugin add --save  cordova-plugin-chrome-apps-sockets-udp
// https://www.npmjs.com/package/cordova-plugin-chrome-apps-sockets-udp

declare var chrome:any;

@Injectable()
export class UDPService {

    private socketid: number;
    private udpstream: BehaviorSubject<Object> = new BehaviorSubject({});


    constructor() { };

    sendUDPMessage(message: string, port: number, addresses: Array<string>, ttl: number, timetolisten: number) {

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

        // only do udp stuff if there is plugin defined
        if (typeof chrome === 'undefined') console.log('HEY!!! chrome not defined??');

        if (typeof chrome.sockets !== 'undefined') {

            // register the listeners
            chrome.sockets.udp.onReceive.addListener(
                (info) => {
                    // we have found one 
                //      console.log('Recv from socket: ', info,ab2str(info.data) );
                    this.udpstream.next(info);
                }
            );
            chrome.sockets.udp.onReceiveError.addListener(
                (error) => {
                    console.log('Recv  ERROR from socket: ', error);
                    this.udpstream.next({ 'error': error });
                }
            );

            // translate the string into ArrayBuffer
            let SENDBUFFER = str2ab(message);

            // send  the UDP search as captures in UPNPSTRING and to port PORT
            chrome.sockets.udp.create((createInfo) => {
                chrome.sockets.udp.bind(createInfo.socketId, '0.0.0.0', port, (bindresult) => {
                    this.socketid = createInfo.socketId;

                    chrome.sockets.udp.setMulticastTimeToLive(createInfo.socketId, ttl, (ttlresult) => {

                        chrome.sockets.udp.setBroadcast(createInfo.socketId, true, function (sbresult) {

                            // do all adresses 
                            addresses.map(address => {
                                chrome.sockets.udp.send(createInfo.socketId, SENDBUFFER, address, port, (sendresult) => {
                                    if (sendresult < 0) {
                                        console.log('send fail: ' + sendresult);
                                        // close all the stuff, send has failed
                                        //this.closeUDPService();
                                        this.udpstream.next({ 'error': sendresult });
                                    } else {
                                        console.log('sendTo: success ' + port, createInfo, bindresult, ttlresult, sbresult, sendresult);
                                    }
                                });
                            });
                        });
                    });
                });
            });

            // and close the listener after a while
            setTimeout(() => {
                this.closeUDPService();
            }, timetolisten);
        }
        // return the stream
        return this.udpstream.asObservable().skip(1);

    }

    closeUDPService() {

        // close the socket
        if (typeof chrome.sockets !== 'undefined') chrome.sockets.udp.close(this.socketid);

        // close the stream
        this.udpstream.complete();
    }

}