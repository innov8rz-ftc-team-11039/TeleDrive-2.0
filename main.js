const { app, BrowserWindow, Menu } = require('electron');
const path = require('path')
var mainWindow;

function createWindow() {
  // Create the browser window.
  const gotTheLock = app.requestSingleInstanceLock() // Used to check if app is already running

  if (gotTheLock) { // Enters if no other instance of the app is running
    //Set up main window
    mainWindow = new BrowserWindow({
      webPreferences: {
        preload: path.join(app.getAppPath(), 'preload.js'),
        devTools: false,
        contextIsolation: false,
        nodeIntegration: true,
        backgroundColor: '#323232',
      },
      resizable: true,
      icon: 'logo.png',
      minHeight: 650,
      minWidth: 800,
      height: 650,
      wdth: 800
    })

    //Build Main Menu for App with Menus and Buttons
    setMainMenu();

    //Disable Keyboard Commands (Reload from CommandOrControl+R or F5)
    const electronLocalshortcut = require('electron-localshortcut')

    mainWindow.on('focus', (event) => {
      electronLocalshortcut.register(mainWindow, ['CommandOrControl+R', 'CommandOrControl+Shift+R', 'F5'], () => { })
    })

    mainWindow.on('blur', (event) => {
      electronLocalshortcut.unregisterAll(mainWindow)
    })

    mainWindow.loadFile('index.html')
  } else {
    //Close the app if it is already running
    app.quit();
  }
}

function setMainMenu() {
  const menu = Menu.buildFromTemplate([
    {
      label: 'TeleDrive',
      submenu: [
        {
          label: 'Quit', click() {
            app.exit(0);
          }
        }
      ]
    }, {
      label: 'Help',
      submenu: [
        {
          label: 'Open TeleDrive Documentation', click() {
            require("electron").shell.openExternal("https://innov8rz.net/teledrive")
          }
        },
        {
          label: 'Visit the Official TeleDrive Github', click() {
            require("electron").shell.openExternal("https://github.com/innov8rz-ftc-team-11039/TeleDrive")
          }
        },
      ]
    }, {
      label: 'About',
      submenu: [
        {
          label: 'Innov8rz FTC Team 11039', click() {
            require("electron").shell.openExternal("https://innov8rz.net")
          }
        }, {
          label: 'Terms of Service', click() {
            require("electron").shell.openExternal("https://innov8rz.net/terms-of-service")
          }
        }
      ]
    }
  ])

  const dockMenu = Menu.buildFromTemplate([
    {
      label: 'Open TeleDrive Documentation', click() {
        require("electron").shell.openExternal("https://innov8rz.net/teledrive")
      }
    },
    {
      label: 'Visit the Official Github', click() {
        require("electron").shell.openExternal("https://github.com/innov8rz-ftc-team-11039/TeleDrive")
      }
    }
  ])

  Menu.setApplicationMenu(menu);
  if (process.platform == 'darwin') app.dock.setMenu(dockMenu);
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  app.quit()
})
