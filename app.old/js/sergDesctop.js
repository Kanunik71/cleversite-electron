

if(isNodeWebkit) {


var sergDesctop = function() {
		var self = this;

		var optionsDef = {
			width: 500, 
			height: 100, 
			x: 10000,
			y: 10000,
			frame: false,
			alwaysOnTop: true,
			show: true,
			resizable: false,
			focus: false,
		};
		var margin = 10;
		
		var id = 0;

		this.pool = {};
		this.queue = [];
		
		
		this.add = function (optionsA, cb) {
			var options = self.cloneObject(optionsDef);
			for(var key in optionsA) {
				options[key] = optionsA[key];
			}
			var winOpt = {
				width: options.width, 
				height: options.height, 
				x: options.x,
				y: options.y,
				frame: options.frame,
				alwaysOnTop: options.alwaysOnTop,
				show: options.show,
				resizable: options.resizable,
				focus: options.focus,
			};
			var idWin = id++;
			var winData = {
				isShow: false,
				win: {},
				promise: {},
				id: idWin,
				fastAnswer: false,
				fastAnswerText: '',
			};
			
	
			self.pool[idWin] = winData;
			
			

			winData.promise = new Promise(function(resolve, reject) {

			
				var win = new this.BrowserWindow(winOpt);
				win.loadURL('file://' + __dirname + '/notify.html');

				winData.win = win;
				
				win.webContents.on('did-finish-load', function() {
					resolve();
					
					win.webContents.send('setup', options)
						
					/*
					win.on('answer.click', function() {
						console.log('lololololol');
					});
					*/
					
					if(cb) {
						cb();
					}
				});

			
			});
			
		
			
			
			
			winData.show = function() {
				var screen = global.window.screen;
				var show = true;
				var h = self.getNextAvailTop();
				var bounds = winData.win.getBounds();
				
				if( (h + bounds.height + margin) > screen.availHeight) {
					show = false;
				}
				if(show) {
					winData.win.setBounds({
						x: screen.availLeft + screen.availWidth - bounds.width - 10,
						y: h,
						width: bounds.width,
						height: bounds.height
					});
					winData.isShow = true;
				} else {
					self.queue.push(idWin);
				}
			}
			
			winData.close = function(cb) {
				winData.win.close();
				self.close(idWin);
				if(cb) {
					cb();
				}
			}
			
			winData.addText = function(text, cb) {
				winData.promise.then(function() {
					winData.win.send('addText', text);
					return Promise.resolve();
				});
				if(cb) {
					cb();
				}
			}
			
			winData.fastAnswerGenerate = function(cb) {
				winData.fastAnswer = true;
				var bounds = winData.win.getBounds();
				winData.win.setBounds({
					x: bounds.x,
					y: bounds.y,
					width: bounds.width,
					height: bounds.height + 120
				});
				winData.win.send('fastAnswer');
				
				
				if(cb) {
					cb();
				}
			}
			
			winData.win.on('fastAnswerText', function(t) {
				winData.fastAnswerText = t;
			});
			
			
			
			
			winData.on = function(e, f){
				var arg = arguments;  
				winData.win.on.apply(winData.win, arg);
			};
						
			return winData;
		}
		
		
			
		this.close = function(idWin) {
			delete self.pool[idWin];
			
			var h = screen.availTop + margin;
			for (key in self.pool) {
				if(self.pool[key].isShow == true) {
					//self.pool[key].win.moveTo(self.pool[key].win.x, h);
					var bounds = self.pool[key].win.getBounds();
					self.pool[key].win.setBounds({
						x: bounds.x,
						y: h,
						width: bounds.width,
						height: bounds.height
					});
					h += bounds.height + margin; 
				}
			};
			if(self.queue.length > 0) {
				var n = self.queue.shift();
				self.pool[n].show();
			}
		}
		
		
		this.cloneObject = function (obj) {
			var clone = {};
			for(var i in obj) {
				if(typeof(obj[i])=="object" && obj[i] != null)
					clone[i] = self.cloneObject(obj[i]);
				else
					clone[i] = obj[i];
			}
			return clone;
		}
		
		/*this.rightBorder = function(){ 
			var screen = global.window.screen;
			return screen.availLeft + screen.availWidth;
		}*/
		this.getNextAvailTop = function (){
			var screen = global.window.screen;
			var summHeight = screen.availTop + margin;
			for (key in self.pool) {
				if(self.pool[key].isShow == true) {
					var bounds = self.pool[key].win.getBounds();
					summHeight+= bounds.height + margin;
				}
			};
			
			return summHeight;
		}

	}
	window.sergDesctop = new sergDesctop();		
	
	
	
	
	var jid = 'serg';
	this.list = {};
	window.generateNotify = function generate(jid) {
		var notify = sergDesctop.add(
			{
				height: 200, 
				htmlBody: '<div id="notification" class="notifylist notifyDesctop">'+
					'<div class="notify new" data-jid="'+jid+'"><div class="name">Новый диалог</div><div class="text_top">jjj</div><div class="text"><textarea>kk</textarea></div><div class="btns"><button class="chat btn submit" onclick="win.emit(\'chat.click\')">Ответить</button><button class="answer btn gray_sv" onclick="win.emit(\'answer.click\');">Быстрый ответ</button><button class="ignore btn cancel" onclick="win.emit(\'ignore.click\')">Игнорировать</button></div></div>'+
				'</div>'
			}, 
			function() {
				notify.show();
				
				notify.on('chat.click', function() {
					console.log(1);
				});
				notify.on('answer.click', function() {
					console.log(2);
				});
				notify.on('ignore.click', function() {
					notify.close(function() {
						console.log(55);
					});
				});
				//console.log(notify);
			}
		);
		self.list[jid] = notify;
	}
	
	//window.generateNotify(jid);

	

	
	setTimeout(function() {
		//console.log(self.list[jid].win.window.document.body);
		//$(self.list[jid].win.window.document.body).find('.notifylist').find('.notify[data-jid="'+jid+'"]').find('.text').find('textarea').append("\n\r"+'65656565656565');
		//self.list[jid].addText(44444);
		//self.list[jid].addText(55555);
		//self.list[jid].addText(6666);
		//console.log($(self.list[jid].win.window.document.body).find('.notifylist').find('.notify[data-jid="'+jid+'"]').find('.text').find('textarea'));
	}, 2000);
	
	
	
}	
