const bleno = require('bleno');
bleno.on('stateChange', function(state){
    console.log('on stateChange: ' + state);
    if(state === 'poweredOn'){
        bleno.startAdvertising('RPI', ['1800']);
    }else {
        bleno.stopAdvertising();
    }
})

/*var blue = require("bluetoothctl");
 blue.Bluetooth()
 
 
 blue.on(blue.bluetoothEvents.Controller, function(controllers){
 console.log('Controllers:' + JSON.stringify(controllers,null,2))
 });
 
 
 blue.on(blue.bluetoothEvents.DeviceSignalLevel, function(devices,mac,signal){
     console.log('signal level of:' + mac + ' - ' + signal)
 
 });
 
 blue.on(blue.bluetoothEvents.Device, function (devices) {
     console.log('devices:' + JSON.stringify(devices,null,2))
 })
 
 blue.on(blue.bluetoothEvents.PassKey, function (passkey) {
     console.log('Confirm passkey:' + passkey)
     blue.confirmPassKey(true);
 })
 
 var hasBluetooth=blue.checkBluetoothController();
 console.log('system has bluetooth controller:' + hasBluetooth)
 
 if(hasBluetooth) {
     console.log('isBluetooth Ready:' + blue.isBluetoothReady)
     blue.scan(true)
     setTimeout(function(){
         console.log('stopping scan')
         blue.scan(false)
         blue.info('70:70:0D:89:4E:08')
     },20000)
 }

/*const {createBluetooth} = require('node-ble')
const {bluetooth, destroy} = createBluetooth()
var adapter;
var device;
bluetooth.defaultAdapter().then(function(data){
    adapter = data;
    adapter.getDevice("70:70:0D:89:4E:08").then(function(data){
        console.log(data);
        device = data;
    })
})*/