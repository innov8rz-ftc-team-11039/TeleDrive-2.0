
![TeleDrive 2.0](https://user-images.githubusercontent.com/39073758/112276623-303b8480-8c3e-11eb-85b7-c548d91da225.png)
## TeleDrive 1.0's Sequel. Simpler, Faster, Easier.

This all-in-one app that not only allows you to drive your robot remotely but also includes the capability for low latency video feed with group audio call. All of this with end-to-end encryption! If you used TeleDrive 1.0 then you may remember having to use Parsec for video, Discord for audio, and the TeleDrive executables for gamepad. This version simplifies the setup with ease of use.

Also no need to set up port forwarding on your router anymore!

Here are the simple to follow instructions in two steps: [Installation](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0#installation "Go to Installation Section") and [Usage](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0#usage "Go to Usage Section").

#### If you are interested in digging into the code and understanding/tinkering with TeleDrive, please proceed to the [Developer Setup Section](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0#developer-setup "Go to Developer Setup Section")

## Currently, TeleDrive 2.0 Servers are down for Maintainance. Please check back soon!

# Installation

## Windows

All you have to do is go to to [Releases](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/releases/tag/v1.0 "Go to Releases") Tab for the latest release and download `TeleDrive-Windows-x64.zip`.

Then, you simply need to extract the contents of `TeleDrive-Windows-x64.zip`. These steps are shown in the images below.

Extracting .zip Contents
![alt text](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/blob/main/readme_images/windows_extract.png "Step 1: Extract .zip Contents")
![alt text](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/blob/main/readme_images/windows_extract2.png "Step 2: Start Extracting Contents")
![alt text](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/blob/main/readme_images/windows_extract_in_progress.png "Waiting for Extracting to Finish")
Once done, move into the folder inside until you see a bunch of files. One of them will be named `TeleDrive.exe` which you will have to double click on to launch. (The first time might take a while, but after that, it will be quick)
![alt text](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/blob/main/readme_images/windows_going_to_exe.png "Step 3: Go into the Extracted Folder to find TeleDrive.exe")

## MacOS

For MacOS you will have to go to the [Releases](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/releases/tag/v1.0 "Go to Releases") Tab for the latest release and download `TeleDrive-MacOS.zip`.

Then, you just need to extract the contents of `TeleDrive-MacOS.zip`. These steps are shown in the images below.

![alt text](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/blob/main/readme_images/mac_extract.png "Step 1: Extract .zip Contents")
![alt text](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/blob/main/readme_images/mac_extract_in_progress.png "Waiting for Extracting to Finish")
![alt text](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/blob/main/readme_images/mac_extract_finished.png "Step 2: Open the TeleDrive App")

#### Since MacOS Big Sur has more advanced security for downloaded apps, you will need to do the following.

First, move TeleDrive to the `Applications` Folder. Make sure you are moving the file and not copying it so that there is only 1 TeleDrive app

<img width="403" alt="Mac_MoveToApps" src="https://user-images.githubusercontent.com/39073758/112412117-36337300-8cdb-11eb-90ae-87500df972a5.png">
<img width="478" alt="Mac_Apps" src="https://user-images.githubusercontent.com/39073758/112412343-9de9be00-8cdb-11eb-9f1e-2f8818194a54.png">

Next, you will need to double click on the app in the `Applications` folder and it will give a permission denied message shown below.

<img width="269" alt="Mac_FirstLaunch" src="https://user-images.githubusercontent.com/39073758/112412645-1a7c9c80-8cdc-11eb-8e92-dc636831e85d.png">

Make sure you click cancel on this pop-up message.

Next, open `System Preferences` and click `Privacy and Security`. In the 'General' tab You will need to then allow access to the TeleDrive app by clicking on 'Open Anyway'.

<img width="645" alt="Mac_SysPref" src="https://user-images.githubusercontent.com/39073758/112412665-223c4100-8cdc-11eb-9303-e36e215fd5bb.png">
<img width="671" alt="Mac_AllowOpen" src="https://user-images.githubusercontent.com/39073758/112412682-28cab880-8cdc-11eb-8645-209c61e3a7f2.png">

Finally, on the pop-up click 'Open' and the TeleDrive app will be launch.

<img width="275" alt="Mac_Open" src="https://user-images.githubusercontent.com/39073758/112412705-33854d80-8cdc-11eb-8d09-2e861ec6c011.png">


# Usage

The User Interface is the same across all platforms, but instructions for Host and Driver are different. 

**Please Note: There is a [section](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0#updating-robot-controller-app-for-teledrive "Go to Robot Controller Code Section") below dedicated to changed that need to be made to the Robot Controller side code.**

#### It is also very important that the Host joins the room FIRST and then the drivers can join after so that the Gamepad Data Channels properly initialize.

## Host

If you are the host, you must be near the robot that you choose to implement TeleDrive on. 

This section of the Usage depends on your completion of the Robot Controller App setup. If you haven't done so yet, please proceed to the [section](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0#updating-robot-controller-app-for-teledrive "Go to Robot Controller Code Section").

### Step 1: Plug in a USB WiFi adapter to the Host Computer

![image](https://user-images.githubusercontent.com/39073758/112272340-4eeb4c80-8c39-11eb-81d9-2e7a7674b2ef.png)

### Step 2: Connect the secondary WiFi (WiFi 2) to the Control Hub or Robot Controller, and ensure that WiFi 1 is connected to your local router.

![image](https://user-images.githubusercontent.com/39073758/112272411-64f90d00-8c39-11eb-9676-eaadc6f53f2a.png)

### Step 3: Launch TeleDrive

![launchTeleDrive](https://user-images.githubusercontent.com/39073758/112272577-a25d9a80-8c39-11eb-837e-1936b8082d25.png)

### Step 4: Click on Host and type in an Display Name and the Robot's IP (Using your Driver Station phone, navigate to the "Program and Manage" menu, and find the local IP address of the Control Hub or Robot Controller phone). 

Please note: Most Control Hubs have the IP address of `192.168.43.1`

![typeIP](https://user-images.githubusercontent.com/39073758/112272608-abe70280-8c39-11eb-9865-a9525cafe655.png)

### Step 5: OPTIONAL: Feel free to regenerate a room code if you feel it is needed, but please keep in mind that you will have to send this new code to your Drivers through another messaging app (Discord, iMessages, etc.)

Click on the Room Name Text or the Refresh button to generate an new room code.

Since TeleDrive automatically saves your previous room code, robot IP address, and display name locally for the future, it is recommended to keep the room code the same so that the setup is smoother as Drivers can reused the saved code without having to type in a new one.

![Untitled presentation](https://user-images.githubusercontent.com/39073758/112273304-70006d00-8c3a-11eb-94af-2a948256c64d.png)

### Step 6: Open Room and Start the TeleDrive OpMode on the Driver Station!

![openRoom](https://user-images.githubusercontent.com/39073758/112272704-c325f000-8c39-11eb-99e1-d5112ad856a4.png)

## Driver

Driver setup is very easy! 

### Step 1: Launch TeleDrive

### Setp 2: Plug in your controller and then click the `Driver` button as shown below.

*For MacOS Users: Make sure that the switch on the bottom of the gamepad is switched to "D" not "X" BEFORE plugging the gamepad in*

![alt text](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/blob/main/readme_images/driverButton.png "Click on the driver button")

### Step 3: Now, you can type in your desired Display Name in the text box as well as the room code that the Host should send to you separately (e.g. through iMessages or Discord chat). 

**However, thanks to a special file saving feature, you only need to enter this in once!** (unless the Host decides to regenerate a room code).

![alt text](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/blob/main/readme_images/openDriverRoom.png "Click open room")

### Step 4: Click join room and make sure that it says `Status: Connected` on the top. Once it shows up, you need to either click `Start + A` or `Start + B` depending on your driver user. To confirm this, the app will say `Gamepad User: 1` or `Gamepad User: 2 ` on the top bar. 

If it does not, try to close the app and reconnect to the room.

### Step 5: Start driving! You are ready to drive your robot!

## Updating Robot Controller App for TeleDrive

If you are planning on using TeleDrive in a `LinearOpMode`, you only need to download ```TeleDrive_LinearOpMode.java``` from the [Releases](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/releases/tag/v1.0 "Go to Releases") page and add your code under the comment that says "CUSTOM CODE GOES HERE". 

Steps 1 through 5 in this section are only for using TeleDrive in an `IterativeOpMode`
  
  1. Download ```TeleDrive.java``` from the [Releases](https://github.com/innov8rz-ftc-team-11039/TeleDrive-2.0/releases/tag/v1.0 "Go to Releases") page, and copy it into your ```TeamCode``` folder
  2. Change your TeleOp program(s) to extend the ```TeleDrive``` class
  3. For each OpMode function (init, init_loop, start, loop, stop) in your TeleOp class, call super.func() at the beginning of that function. **This is required, and not calling the method in the superclass would not allow TeleDrive to function properly.** (Ex: in the loop() function, you must call super.loop() at the beginning)
  4. Using your Driver Station phone, navigate to the "Program and Manage" menu, and find the local IP address of the Control Hub or Robot Controller phone
  5. On line 307 in ```TeleDrive.java```, replace the existing IP address with the IP address you found in Step 4

# Common Errors

  ### There is audio of one user but another's audio is not coming
  
  This problem is usually fixed by everyone closing TeleDrive and reopening it to reset any errors that may have occured.
  
  ### I do not see `Status: Connected` at the top of the screen
  
  Since the status connected is to a server, this most likely means that your computer is not connected to the Internet or the connection is unstable
  
  ### I do not see `Gamepad User: 1`/`Gamepad User: 2` when I do `START + A`/`START + B`
  
  This could be because your gamepad is not being detected. Try switching the switch on the bottom of the gamepad to the other side, reconnecting it, or try another gamepad.

  ### Something else is wrong
  
If you've tried all the solutions listed above, and TeleDrive still doesn't work for you, please try to do the following:
  * Ensure the TeleDrive has proper access to Camera, Microphone, and USB for gamepads
  * Restart TeleDrive app on Host computers and Driver computers
  * Send us an email at info@innov8rz.net and we will be happy to help!

# Frequently Asked Questions

  ### If I don't have the best Internet connection, can I use TeleDrive?
  
  Absolutely! Since TeleDrive is built using WebRTC, the stream of the field and audio channels are throttled based on your connection. For example, if you connection is poor, it will provide a lower resolution image of the field, but if there is a strong connection, the field will be full 1080p HD resolution.
  
  ### How do I get the IP address of the robot?
  
  Using your Driver Station phone, navigate to the "Program and Manage" menu, and find the local IP address of the Control Hub or Robot Controller phone
  
  ### Can I use TeleDrive with a LinearOpMode?
  
  Yes! If you are planning on using TeleDrive in a `LinearOpMode`, you only need to download ```TeleDrive_LinearOpMode.java``` from the Releases page and add your code under the comment that says "CUSTOM CODE GOES HERE". 
  
# Developer Setup

  If you would like to tinker with TeleDrive or understand how it works, please fork this repository and feel free to make pull requests for any new features! I have taken a lot of time to write comments explaining a lot of the code in the major files: `index.html` and `preload.js`, where the bulk of the code runs, but please let me know if anything is confusing. To run the app locally, you will have to run `npm install` and then `npm start` and it will automatically open the app. If you have any questions, please reach out to us at info@innov8rz.net! 
  
# Contributors

  ### Developers

Mihir Chauhan
