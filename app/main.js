#!/usr/bin/env electron


const {app, Menu, Tray} = require('electron');
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
//if (require("electron-squirrel-startup")) {    return;}
if(process.platform == 'win32') {
		var autoUpdater = require('electron-windows-updater');
} else {
		var autoUpdater = require('electron').autoUpdater;
}

var platform = os.platform() + '_' + os.arch();  // usually returns darwin_64
var version = app.getVersion();

autoUpdater.setFeedURL('http://nodejs03.cleversite.ru/update/'+platform+'/'+version);

autoUpdater.checkForUpdates();

autoUpdater.on('update-available', function() {
	console.log('update-available');
	app.quit();
});

autoUpdater.on('error', function(e) {
	console.log(e);
});
autoUpdater.on('checking-for-update', function() {
	console.log('checking-for-update');
});
autoUpdater.on('update-not-available', function() {
	console.log('update-not-available');
});
autoUpdater.on('update-downloaded', function() {
	console.log('update-downloaded');
});
*/







app.commandLine.appendSwitch("disable-gpu")
app.commandLine.appendArgument("disable-gpu")



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
		frame: false,
		transparent: false,
		webPreferences: {
			
		}
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
	
	
	
	
	
	
	
	
	
	var tray = new Tray(__dirname + '/images/icon_tray.png');
	const contextMenu = Menu.buildFromTemplate([
		{label: 'Открыть Cleversite', click: function() {
			win.show();
		}},
		{label: 'Выход из Cleversite', click: function() {
			win.close();
			app.quit();
		}},
	])
	tray.setToolTip('This is my application.')
	tray.setContextMenu(contextMenu)
	
	
	
	require('electron-context-menu')({
		prepend: params => [{
			label: 'Rainbow',
			visible: params.mediaType === 'image'
		}]
	});
	


})
