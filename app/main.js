#!/usr/bin/env electron


var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow;
var path = require('path')
var ipc = require('electron').ipcMain
var os = require('os');
//var dialog = require('dialog')
//var shell = require('shell')
var powerSaveBlocker = require('electron').powerSaveBlocker
var globalShortcut = require('electron').globalShortcut



var win;
var mainWindow = null;




/*
var autoUpdater = require('electron').autoUpdater;
var platform = os.platform() + '_' + os.arch();  // usually returns darwin_64
var version = app.getVersion();

autoUpdater.setFeedURL('http://nodejs03.cleversite.ru/update/'+platform+'/'+version);

autoUpdate.checkForUpdates();

autoUpdate.on('update-available', function() {
	console.log('update-available');
	app.quit();
});

autoUpdate.on('error', function(e) {
	console.log(e);
});
autoUpdate.on('checking-for-update', function() {
	console.log('checking-for-update');
});
autoUpdate.on('update-not-available', function() {
	console.log('update-not-available');
});
autoUpdate.on('update-downloaded', function() {
	console.log('update-downloaded');
});
*/











app.on('ready', function () {











	win = new BrowserWindow({
		height: 700,
		width: 980,
		show: true,
		minWidth: 980,
		minHeight: 700,
		kiosk: false,
		resizable: true,
		alwaysOnTop: false,
		fullscreen: false,
		frame: true,
	})


	win.loadURL('file://' + __dirname + '/index.html');


	//setTimeout(function() {		win.send('test', 'file://' + __dirname + '/index.html');	}, 4000);

	win.webContents.openDevTools();

	ipc.on('close', function () {
		app.quit()
	})

	ipc.on('close', function () {
		app.quit()
	})



	win.on('blur', function () {
		win.send('window-blur');
	});
	win.on('focus', function () {
		win.send('window-focus');
	});


	ipc.on('open-url-in-external', function (event, url) {
		shell.openExternal(url)
	})

	ipc.on('focus', function () {
		win.focus()
	})
	ipc.on('show', function () {
		win.show()
	})

	ipc.on('minimize', function () {
		win.minimize();
	})

	ipc.on('maximize', function () {
		win.maximize()
	})

	ipc.on('restore', function () {
		win.restore()
	})

	ipc.on('resize', function (e, message) {
		if (win.isMaximized()) return
		var wid = win.getSize()[0]
		var hei = (wid / message.ratio) | 0
		win.setSize(wid, hei)
	})

	ipc.on('enter-full-screen', function () {
		win.setFullScreen(true)
	})

	ipc.on('exit-full-screen', function () {
		win.setFullScreen(false)
		win.show()
	})


})
