#!/usr/bin/env electron
/*
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var ipc = require('electron').ipcMain


let mainWindow;

function createWindow () {

	mainWindow = new BrowserWindow({
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
    }); 


	mainWindow.loadURL('file://' + __dirname + '/index.html');

 
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
	
} 

app.on('ready', createWindow); 

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
}); 

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();

	}
}); 




*/










var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow;
var path = require('path')
var ipc = require('electron').ipcMain
//var dialog = require('dialog')
//var shell = require('shell')
var powerSaveBlocker = require('electron').powerSaveBlocker
var globalShortcut = require('electron').globalShortcut


var win
var link
var ready = false

var onopen = function (e, lnk) {
  e.preventDefault()

  if (ready) {
	win.send('add-to-playlist', [].concat(lnk))
	return
  }

  link = lnk
}

app.on('open-file', onopen)
app.on('open-url', onopen)

var frame = process.platform === 'win32'

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
	
	/*
	setTimeout(function() {
		win.send('test', 'file://' + __dirname + '/index.html');
	}, 4000);
	*/
	
	
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
	

	
/*
  ipc.on('open-file-dialog', function () {
    var files = dialog.showOpenDialog({ properties: [ 'openFile', 'multiSelections' ]})
    if (files) {
      files.forEach(app.addRecentDocument)
      win.send('add-to-playlist', files)
    }
  })
*/
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

 /* 
  ipc.on('ready', function () {
    ready = true
    if (link) win.send('add-to-playlist', [].concat(link))
    win.show()
  })

  ipc.on('prevent-sleep', function () {
    app.sleepId = powerSaveBlocker.start('prevent-display-sleep')
  })

  ipc.on('allow-sleep', function () {
    powerSaveBlocker.stop(app.sleepId)
  })

  globalShortcut.register('MediaPlayPause', function () {
    win.send('media-play-pause')
  })

  globalShortcut.register('MediaNextTrack', function () {
    win.send('media-next-track')
  })

  globalShortcut.register('MediaPreviousTrack', function () {
    win.send('media-previous-track')
  })
*/
})

/*
app.on('will-quit', function () {

  globalShortcut.unregisterAll()

})
*/











