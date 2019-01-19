const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
	});
}

let mainWindow;
let newProductWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'views/index.html'),
		protocol: 'file',
		slashes: true
	}));

	const mainMenu = Menu.buildFromTemplate(templateMenu);
	Menu.setApplicationMenu(mainMenu);
	
	mainWindow.on('closed', () => {
		app.quit();
	});

});

ipcMain.on('product:new', (e, newProduct) => {
	mainWindow.webContents.send('product:new', newProduct);
	newProductWindow.close();
});

const templateMenu = [
	{
		label: 'File',
		submenu: [
			{
				label: 'New product',
				accelerator: 'Ctrl+N',
				click() { 
					createNewProductWindow();
				}
			},
			{
				label: 'Remove All Products',
				click() {
					mainWindow.webContents.send('products:remove-all');
				}
			},
			{
				label: 'Exit',
				accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
				click() {
					app.quit();
				}
			}
		]
	}
];

if (process.platform === 'darwin') {

	templateMenu.unshift({
		label: app.getName()
	});

}

if (process.env.NODE_ENV !== 'production') {
	templateMenu.push({
		label: 'DevTools',
		submenu: [
			{
				label: 'Show/Hide Dev Tools',
				accelerator: 'Ctrl+D',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload'
			}
		]
	});
}

// ---- Functions

function createNewProductWindow() {

	newProductWindow = new BrowserWindow({
		width: 600,
		height: 500,
		title: 'Add a new product'
	});

	newProductWindow.setMenu(null);
	
	newProductWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'views/new-product.html'),
		protocol: 'file',
		slashes: true
	}));

	newProductWindow.on('closed', () => {
		newProductWindow = null;
	});

}