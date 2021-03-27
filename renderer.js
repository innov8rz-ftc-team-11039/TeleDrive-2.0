/* Copyright (c) 2021 Innov8rz FTC Team 11039, Mihir Chauhan
    *
    * Redistribution and use in source and binary forms, with or without modification,
    * are permitted (subject to the limitations in the disclaimer below) provided that
    * the following conditions are met:
    *
    * Redistributions of source code must retain the above copyright notice, this list
    * of conditions and the following disclaimer.
    *
    * Redistributions in binary form must reproduce the above copyright notice, this
    * list of conditions and the following disclaimer in the documentation and/or
    * other materials provided with the distribution.
    *
    * Neither the name of Innov8rz nor the names of its contributors may be used to endorse or
    * promote products derived from this software without specific prior written permission.
    *
    * NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS
    * LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
    * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
    * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
    * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
    * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */


/* 
█████████████████████████████████████████████████████
█─▄─▄─█▄─▄▄─█▄─▄███▄─▄▄─█▄─▄▄▀█▄─▄▄▀█▄─▄█▄─█─▄█▄─▄▄─█
███─████─▄█▀██─██▀██─▄█▀██─██─██─▄─▄██─███▄▀▄███─▄█▀█
██▄▄▄██▄▄▄▄▄█▄▄▄▄▄█▄▄▄▄▄█▄▄▄▄██▄▄█▄▄█▄▄▄███▄███▄▄▄▄▄█
|------------WELCOME TO THE MAIN CODE THAT POWERS TELEDRIVE------------|
|**IT IS RECOMMENDED TO READ ALL COMMENTS TO HELP UNDERSTAND THE CODE**|
    */
var isDriver = false;
var roomName = "";
var robotIPaddress = "";
var localDisplayName = "";
var shouldRegenerateRoomName = false;
var hasAlreadyOpenedRoom = false;
var inRoom = false;
function openHostInputField() {
    // Called when Host Button is pressed
    isDriver = false;
    document.getElementById("openRoomButtonContainer").hidden = true;

    var inputField = document.getElementById("inputField");
    inputField.value = ""
    inputField.hidden = false;
    inputField.placeholder = "Robot IP Address";

    var inputUsernameField = document.getElementById("inputUsernameField");
    inputUsernameField.value = ""
    inputUsernameField.hidden = false;
    inputUsernameField.placeholder = "Display Name";

    regenerateRoomName();
    window.fs.readFile(window.dir + '/TeleDrive/appData_Host.txt', function (err, data) {
    var parsedData = JSON.parse(data);
    inputUsernameField.value = parsedData.localDisplayName;
    inputField.value = parsedData.robotIPaddress;
    document.getElementById('roomCodeText').innerText = "Room Code: " + parsedData.roomName + " ↺";
    roomName = parsedData.roomName;
    if (!err) {
        openRoomButton();
    }
    });

    document.getElementById('roomCode').hidden = true;
}

function openDriverInputField() {
    // Called when Driver Button is pressed
    isDriver = true;
    document.getElementById("openRoomButtonContainer").hidden = true;

    var inputField = document.getElementById("inputField");
    inputField.value = ""
    inputField.hidden = false;
    inputField.placeholder = "Room Name";

    var inputUsernameField = document.getElementById("inputUsernameField");
    inputUsernameField.value = "";
    inputUsernameField.hidden = false;
    inputUsernameField.placeholder = "Display Name";

    window.fs.readFile(window.dir + '/TeleDrive/appData_Driver.txt', function (err, data) {
    var parsedData = JSON.parse(data);
    inputUsernameField.value = parsedData.localDisplayName;
    inputField.value = parsedData.roomName;
    if (!err) {
        openRoomButton();
    }
    });

    document.getElementById('roomCode').hidden = true;
}

function regenerateRoomName() {
    // Cannot change the code while in a room
    if (!inRoom) {
    roomName = makeid(8);
    document.getElementById('roomCodeText').innerText = "Room Code: " + roomName + " ↺";
    }
}

function openRoomButton() {
    document.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter" && !hasAlreadyOpenedRoom) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("openRoomButton").click();
        hasAlreadyOpenedRoom = true;
    }
    });
    // Called when either Host types Robot IP or if Driver types Room Code
    if (isDriver) {
    document.getElementById('openRoomButton').textContent = "Join Room"
    } else {
    document.getElementById('roomCode').hidden = false;
    document.getElementById('openRoomButton').textContent = "Open Room"
    }
    document.getElementById('openRoomButtonContainer').hidden = false
}

function makeid(length) {
    // Returns a unique room code (very low chance of being similar to another string)
    var result = '';
    var characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789'; //I have removed 'I' and 'l' because they look too similar
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function openRoom() {
    inRoom = true;
    window.logs.createLogFile();
    if (isDriver) {
    //the Driver did not generate a room name, so it is set to what user inputted
    roomName = document.getElementById("inputField").value;
    }
    //The next couple lines are hiding all of the buttons and text fields and showing the actual Audio / Video (A/V) content [I could have made another HTML page for this, but... oh well]
    document.getElementById('roomCodeText').innerText = "Room Code: " + roomName + "  | Status: Loading";
    document.getElementById("openRoomButtonContainer").hidden = true;
    document.getElementById("inputField").hidden = true;
    document.getElementById("inputFieldContainer").hidden = true;
    document.getElementById("hostDriverButtonsContainer").hidden = true;
    document.getElementById("inputUsernameContainer").hidden = true;
    document.getElementById("headerDiv").hidden = true;
    document.getElementById("teledrive").height = screen.height - (document.getElementById("headerDiv").offsetHeight) - 5;
    document.getElementById("teledrive").width = screen.width - (isDriver ? 0 : 300);
    document.getElementById("teledrive").hidden = false;
    document.getElementById('roomCode').hidden = false;

    //Setting variables from user input
    robotIPaddress = document.getElementById("inputField").value;
    localDisplayName = document.getElementById("inputUsernameField").value;


    if (isDriver) {
    window.fs.writeFile(window.dir + '/TeleDrive/appData_Driver.txt', JSON.stringify({ localDisplayName, roomName }), function (err) {
        if (err) throw err;
        window.logs.appendToLogFile('INFO - Saved Driver App Data to load on next app run (389) \n');
    });
    } else {
    window.fs.writeFile(window.dir + '/TeleDrive/appData_Host.txt', JSON.stringify({ localDisplayName, robotIPaddress, roomName }), function (err) {
        if (err) throw err;
        window.logs.appendToLogFile('INFO - Saved Host App Data to load on next app run (394) \n');
    });
    }

    const WS_PORT = 443; //Port used for connection to the signalling websocket server
    const WS_ADDR = 'signalling.innov8rz.net'; //Address to the signalling websocket server

    var localUuid;
    var localStream;
    var serverConnection;
    var peerConnections = {}; // Object format: key is uuid, values are peer connection object and user defined display name string

    //Connections to Google's STUN servers which allows clients to find out their public address, the type of NAT they are behind and the Internet side port associated by the NAT with a particular local port
    var peerConnectionConfig = {
    'iceServers': [
        { 'urls': 'stun:stun.stunprotocol.org:3942' },
        { 'urls': 'stun:stun.l.google.com:12084' },
    ]
    };

    //In the case of a driver, the user's display name will be 'Driver: <Name>' and since Driver does not send video, the local container of video is none
    if (isDriver) {
    localDisplayName = "Driver: ".concat(localDisplayName);
    document.getElementById('localVideoContainer').style.display = "none";
    }

    // Generate Local UUID - check out function for more details
    localUuid = createUUID(isDriver);

    // Specify Media Constraints: Host needs to send Video and Audio, but Driver only needs to send Audio
    var constraints = {
    video: {
        width: { max: 1920 },
        height: { max: 1080 },
        frameRate: { max: 60 },
    },
    audio: true,
    };

    // In the case of Driver, only send audio
    if (isDriver) {
    constraints = {
        video: false,
        audio: true,
    };
    }

    // Set up local video stream
    if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
        localStream = stream;
        //Only show your video stream if you are the host because Driver video stream will just be blank because of the constraints set before
        if (!isDriver) {
            document.getElementById('localVideo').srcObject = stream;
        }
        }).catch(errorHandler)

        // Set up websocket connection with the signalling server and message all existing clients (if any) in the room 
        .then(() => {
        serverConnection = new window.websocket('wss://' + WS_ADDR + ':' + WS_PORT, {
            rejectUnauthorized: false
        });
        //Set up callback functions of the server in the case of message recieved, etc.
        serverConnection.onmessage = gotMessageFromServer;
        serverConnection.onopen = event => {
            // The next line sends a special password to the Signalling Sever to verify that you are a TeleDrive user not a bot
            serverConnection.send("4C4C4544-0032-3610-8044-B5C04F305932-" + localDisplayName);
            // Now, if we are authorized, we can send our display name and local UUID to everyone in the room
            serverConnection.send(JSON.stringify({ 'displayName': localDisplayName, 'uuid': localUuid, 'dest': 'all' }));
        }
        }).catch(errorHandler);

    } else {
    //Very unlikely case, but could happen that the API is not supported
    window.logs.appendToLogFile('CRITICAL - Your browser does not support getUserMedia API (469) \n');
    }

    //These are variables for every button on the gamepad
    var A = false;
    var B = false;
    var X = false;
    var Y = false;
    var LB = false;
    var RB = false;
    var LT = false;
    var RT = false;
    var BACK = false;
    var START = false;
    var DU = false;
    var DD = false;
    var DL = false;
    var DR = false;

    var LX = 0.0;
    var LY = 0.0;
    var RX = 0.0;
    var RY = 0.0;

    // This variable is set to 1 if "START" + "A" are pressed on the gamepad or set to 2 if "START" + "B" are pressed (similar to on a FTC Driver Station)
    var userNumber = 0;

    //This function handles all gamepad related stuff for the Driver user while sending the commands to the Host and updates the variables declared above.
    function startGamepadHandlerAndSocketThread() {
    // This function is only called when the Data Channel connection with the host has been OPENED
    window.logs.appendToLogFile("INFO - Successfully opened Gamepad Data Channel with Host (499) \n")

    var haveEvents = 'GamepadEvent' in window;
    var haveWebkitEvents = 'WebKitGamepadEvent' in window;
    var controllers = {};
    var rAF = window.mozRequestAnimationFrame ||
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame;

    // On gamepad connection detected by USB
    function connecthandler(e) {
        addgamepad(e.gamepad);
    }
    // Adds a gamepad and can start listening to presses
    function addgamepad(gamepad) {
        controllers[gamepad.index] = gamepad;
        rAF(updateStatus);
    }

    // In the case that the user disconnects the controller
    function disconnecthandler(e) {
        removegamepad(e.gamepad);
    }
    // Removed the gamepad
    function removegamepad(gamepad) {
        delete controllers[gamepad.index];
    }

    // Constantly gets called by itself to keep updating as fast as possible
    function updateStatus() {
        scangamepads();
        for (j in controllers) {
        var controller = controllers[j];

        // for loop to check the state of every button and update / send message to data channel
        for (var i = 0; i < controller.buttons.length; i++) {
            // 0 - a, 
            // 1 - b, 
            // 2 - x, 
            // 3 - y, 
            // 4 - left_bumper, 
            // 5 - right_bumper, 
            // 6 - left_trigger, 
            // 7 - right_trigger, 
            // 8 - back, 
            // 9 - start, 
            // ...
            // 12 - dpad_up,
            // 13 - dpad_down,
            // 14 - dpad_left,
            // 15 - dpad_right
            var val = controller.buttons[i];
            var pressed = (controller.buttons[i] == 1.0);
            if (typeof (val) == "object") {
            pressed = val.pressed;
            val = val.value;
            }
            if (i == 0) {
            if (A != pressed) {
                A = pressed;
                datachannel.send("G" + userNumber + "_A_" + (A ? "P" : "R"));
            }
            } else if (i == 1) {
            if (B != pressed) {
                B = pressed;
                datachannel.send("G" + userNumber + "_B_" + (B ? "P" : "R"));
            }
            } else if (i == 2) {
            if (X != pressed) {
                X = pressed;
                datachannel.send("G" + userNumber + "_X_" + (X ? "P" : "R"));
            }
            } else if (i == 3) {
            if (Y != pressed) {
                Y = pressed;
                datachannel.send("G" + userNumber + "_Y_" + (Y ? "P" : "R"));
            }
            } else if (i == 4) {
            if (LB != pressed) {
                LB = pressed;
                datachannel.send("G" + userNumber + "_LB_" + (LB ? "P" : "R"));
            }
            } else if (i == 5) {
            if (RB != pressed) {
                RB = pressed;
                datachannel.send("G" + userNumber + "_RB_" + (RB ? "P" : "R"));
            }
            } else if (i == 6) {
            if (LT != pressed) {
                LT = pressed;
                datachannel.send("G" + userNumber + "_LT_" + (LT ? "P" : "R"));
            }
            } else if (i == 7) {
            if (RT != pressed) {
                RT = pressed;
                datachannel.send("G" + userNumber + "_RT_" + (RT ? "P" : "R"));
            }
            } else if (i == 8) {
            if (BACK != pressed) {
                BACK = pressed;
                datachannel.send("G" + userNumber + "_BACK_" + (BACK ? "P" : "R"));
            }
            } else if (i == 9) {
            if (START != pressed) {
                START = pressed;
                datachannel.send("G" + userNumber + "_START_" + (START ? "P" : "R"));
            }
            } else if (i == 12) {
            if (DU != pressed) {
                DU = pressed;
                datachannel.send("G" + userNumber + "_DU_" + (DU ? "P" : "R"));
            }
            } else if (i == 13) {
            if (DD != pressed) {
                DD = pressed;
                datachannel.send("G" + userNumber + "_DD_" + (DD ? "P" : "R"));
            }
            } else if (i == 14) {
            if (DL != pressed) {
                DL = pressed;
                datachannel.send("G" + userNumber + "_DL_" + (DL ? "P" : "R"));
            }
            } else if (i == 15) {
            if (DR != pressed) {
                DR = pressed;
                datachannel.send("G" + userNumber + "_DR_" + (DR ? "P" : "R"));
            }
            }
        }

        if (START && A) {
            userNumber = 1;
            document.getElementById('roomCodeText').innerText = "Room Code: " + roomName + "  | Status: Connected | Gamepad User: " + userNumber;
            window.logs.appendToLogFile('INFO - Gamepad User is now User 1 (632) \n');
        } else if (START && B) {
            userNumber = 2;
            document.getElementById('roomCodeText').innerText = "Room Code: " + roomName + "  | Status: Connected | Gamepad User: " + userNumber;
            window.logs.appendToLogFile('INFO - Gamepad User is now User 2 (636) \n');
        }

        for (var i = 0; i < controller.axes.length; i++) { // 0 - leftX, 1 - leftY, 2 - rightX, 3 - rightY
            if (i == 0) {
            if (LX != controller.axes[i]) {
                LX = controller.axes[i];
                datachannel.send("G" + userNumber + "_LX_" + (LX));
            }
            } else if (i == 1) {
            if (LY != controller.axes[i]) {
                LY = controller.axes[i];
                datachannel.send("G" + userNumber + "_LY_" + (LY));
            }
            } else if (i == 2) {
            if (RX != controller.axes[i]) {
                RX = controller.axes[i];
                datachannel.send("G" + userNumber + "_RX_" + (RX));
            }
            } else if (i == 3) {
            if (RY != controller.axes[i]) {
                RY = controller.axes[i];
                datachannel.send("G" + userNumber + "_RY_" + (RY));
            }
            }
        }
        }
        rAF(updateStatus);
    }

    function scangamepads() {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i] && (gamepads[i].index in controllers)) {
            controllers[gamepads[i].index] = gamepads[i];
        }
        }
    }

    // Checks if something happened to the gamepad connections (uses different techniques to check based on type of APIs available)
    if (haveEvents) {
        window.addEventListener("gamepadconnected", connecthandler);
        window.addEventListener("gamepaddisconnected", disconnecthandler);
    } else if (haveWebkitEvents) {
        window.addEventListener("webkitgamepadconnected", connecthandler);
        window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
    } else {
        setInterval(scangamepads, 500);
    }
    }

    // --------------- CAUTION: YOU ARE NOW ENTERING THE CORE OF THE WEBRTC TERRITORY :) ---------------

    /* CODE TIP: IT IS VERY HELPFUL TO READ THE CODE WHILE KEEPING IN MIND THAT THIS CODE IS RUN FOR EVERY USER 
    Code below is dealing with WebRTC, which stands for Web Real-Time-Communication and is the basis of TeleDrive's Audio, Video, and Gamepad Channels
    Here are the basics of WebRTC: 
        -  WebRTC leverages multiple standards and protocols such as data streams, STUN/TURN servers, signaling, JSEP, ICE, SIP, SDP, NAT, UDP/TCP, network sockets, and more.
        -  In order to communicate with another user, each person’s app must agree to begin communication, know how to locate one another, bypass security and firewall protections, 
        and transmit all multimedia communications in real-time.
    This is what happens in the code below:
        -  User joins the room (or creates the room in the case of Host)
        -  The app sets up the user and creates a Session Protocol Description (SDP) in the form of an "offer" which is send to the signalling server. 
        The signalling server will broadcast this message to all users within the same room so that everyone can set up a new peer connection in the room.
            - WHAT IS A SIGNALLING SERVER? The signalling server is a simple websocket server running in the cloud which allows all the users to send their SDP offers 
                and answers before they initiate the WebRTC Connection after the WebRTC Connection is made, the signalling server is not used
        -  When any of the users receives this from the signalling server, they set up an offer for that peer and send it to the server, directed to a specfic peer in the room
        -  After the other user receive this, they generate a response or "answer" to your "offer" and send it back.
        -  Once again, after you receive their "answer", you send a another response to assure that the other side knows that the whole transaction is over.
        -  IT IS IMPORTANT TO NOTE THAT: The offers and answers have the channel for audio, video, and gamepad data channels embedded in the messages.
        So, this means that once the transaction is complete, the three main channels are already set up and can be used automatically.
        -  Once this is done, you can talk to all other room members, watch (only) the host (Drivers do not need to send their videos as it will just add more latency), 
        and the gamepad connection from the Drivers to the Host
        - Aaaaaaand that's all you need to know!
    */

    var datachannel;

    // The function below is called every time the host gets an update for gamepad commands from the Driver through data channel
    function handleGamepadMessageFromDriver(message) {
    window.udpSocket.sendDataToRobot(robotIPaddress, message);
    }

    var hasSetupDriver1GamepadChannel = false;

    async function gotMessageFromServer(message) {
    document.getElementById('roomCodeText').innerText = "Room Code: " + roomName + "  | Status: Connected";
    var signal = JSON.parse(message.data);
    var peerUuid = signal.uuid;

    window.logs.appendToLogFile("INFO - Received Message From Server. Peer UUID: " + peerUuid + ", Signal: " + JSON.stringify(signal) + " (725) \n");

    // Ignore messages that are not for us or from ourselves
    if (peerUuid == localUuid || (signal.dest != localUuid && signal.dest != 'all') || (!peerUuid.includes(roomName))) return;

    if (signal.displayName && signal.dest == 'all') {
        // set up peer connection object for a newcomer peer
        setUpPeer(peerUuid, signal.displayName);
        serverConnection.send(JSON.stringify({ 'displayName': localDisplayName, 'uuid': localUuid, 'dest': peerUuid }));
        window.logs.appendToLogFile('INFO - Setting Up Peer Connection For Newcomer Peer (734) \n');
    } else if (signal.displayName && signal.dest == localUuid) {
        // initiate call if we are the newcomer peer
        setUpPeer(peerUuid, signal.displayName, true);
        window.logs.appendToLogFile('INFO - Initiating Call As Newcomer Peer (687) \n');
    } else if (signal.sdp) {
        peerConnections[peerUuid].pc.setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function () {
        window.logs.appendToLogFile('INFO - Setting Remote Description of Peer (741) \n');
        // Only create answers in response to offers
        if (signal.sdp.type == 'offer') {
            peerConnections[peerUuid].pc.createAnswer().then(description => createdDescription(description, peerUuid)).catch(errorHandler);
            window.logs.appendToLogFile('INFO - Creating Answer to SDP offer (745) \n');
        }
        }).catch(errorHandler);

    } else if (signal.ice) {
        window.logs.appendToLogFile('INFO - Adding ICE Candidate (750) \n');
        peerConnections[peerUuid].pc.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(errorHandler);
    }
    }

    function setUpPeer(peerUuid, displayName, initCall = false) {
    window.logs.appendToLogFile('INFO - Began Peer Setup. Init Call: ' + initCall + '. (756) \n');
    peerConnections[peerUuid] = { 'displayName': displayName, 'pc': new RTCPeerConnection(peerConnectionConfig) };
    peerConnections[peerUuid].pc.onicecandidate = event => gotIceCandidate(event, peerUuid);
    peerConnections[peerUuid].pc.ontrack = event => gotRemoteStream(event, peerUuid);
    peerConnections[peerUuid].pc.oniceconnectionstatechange = event => checkPeerDisconnect(event, peerUuid);
    peerConnections[peerUuid].pc.addStream(localStream);
    // Here, we have set up the remote peer (another user) and the line above adds the Audio and Video streams as well!

    // Now, if we are the host (not Driver), and we are setting up another peer (that's why we check if initCall is false [read line 774]), we need to open a datachannel on 
    // that peer. We then set the callback functions for onmessage and onopen to handle them properly. Note that "onmessage" is never called so it doesn't really matter.
    if (!isDriver && !initCall) {
        window.logs.appendToLogFile('INFO - Opening Gamepad Data Channel with Driver (767) \n');
        peerConnections[peerUuid].pc.ondatachannel = e => {
        datachannel = e.channel;
        datachannel.onmessage = e => handleGamepadMessageFromDriver(e.data);
        datachannel.onopen = e => window.logs.appendToLogFile("INFO - Opened Gamepad Channel with Driver Successfully (771) \n");
        }
    }
    // **"initCall" is true if we are setting up our own SDP to send to others**
    if (initCall) {
        // In the case that we are a driver, we want to set up a data channel and attach the callback functions (onmessage, onopen)
        if (isDriver) {
        window.logs.appendToLogFile('INFO - Opening Gamepad Data Channel with Host. (778) \n');
        datachannel = peerConnections[peerUuid].pc.createDataChannel(localUuid + "-gamepad");
        datachannel.onmessage = e => window.logs.appendToLogFile("INFO - Data Channel Message: " + e.data + "(780) \n");
        datachannel.onopen = e => startGamepadHandlerAndSocketThread();
        }
        // We then create the offer (both for host and driver) and when it is created, we call the "createdDescription" method
        peerConnections[peerUuid].pc.createOffer({ offerToReceiveVideo: true }).then(description => createdDescription(description, peerUuid)).catch(errorHandler);
        window.logs.appendToLogFile('INFO - Created Offer LOCAL Offer as Setup Protocol (785) \n');
    }
    }

    function gotIceCandidate(event, peerUuid) {
    //This just sends the ice candidate to the server when it creates a new one... nothing too special.
    window.logs.appendToLogFile('INFO - Got New ICE Candidate (791) \n');
    if (event.candidate != null) {
        serverConnection.send(JSON.stringify({ 'ice': event.candidate, 'uuid': localUuid, 'dest': peerUuid }));
        window.logs.appendToLogFile('INFO - ICE Candidate ' + JSON.stringify({ 'ice': event.candidate, 'uuid': localUuid, 'dest': peerUuid }) + ' (794) \n');
    }
    }

    function createdDescription(description, peerUuid) {
    //This sends the created description to the server
    window.logs.appendToLogFile(`INFO - Received description for ${peerUuid} (800) \n`);
    peerConnections[peerUuid].pc.setLocalDescription(description).then(function () {
        serverConnection.send(JSON.stringify({ 'sdp': peerConnections[peerUuid].pc.localDescription, 'uuid': localUuid, 'dest': peerUuid }));
    }).catch(errorHandler);
    }

    var previousPeerUUIDs = [];

    function gotRemoteStream(event, peerUuid) {
    //This is invoked from the callback on line 759 when a stream (or track) is received for a certain peer
    window.logs.appendToLogFile(`INFO - Succesfully receieved stream of peer: "${peerUuid}" (810) \n`);
    for (i = 0; i < previousPeerUUIDs.length; i++) {
        if (previousPeerUUIDs[i] == peerUuid) {
        return;
        }
    }
    previousPeerUUIDs[previousPeerUUIDs.length] = peerUuid;

    //The stream is then assigned to new HTML video element
    if (isDriver) {
        var vidElement = document.createElement('video');
        vidElement.setAttribute('autoplay', '');
        vidElement.srcObject = event.streams[0];

        var vidContainer = document.createElement('div');
        vidContainer.setAttribute('id', 'remoteVideo_' + peerUuid);
        vidContainer.setAttribute('class', 'videoContainer');
        vidContainer.appendChild(vidElement);

        vidContainer.appendChild(makeLabel(peerConnections[peerUuid].displayName));

        if (!peerUuid.includes("host-")) {
        // If the driver gets the stream of a non-host peer, that means that the video is blank so we can hide it, but it still needs to be added to the HTML dynamically so you can still hear that peer.
        vidContainer.hidden = true;
        }
        document.getElementById('videos').appendChild(vidContainer);
    } else {
        // Note that in the host view, you can see all of the active members of the room as a security feature to know if an unwanted peer has joined, 
        // ALSO NOTE that the case of unwanted peers in your room is very unlikely with randomized 8 digit/letter codes.
        var vidElement = document.createElement('video');
        vidElement.setAttribute('autoplay', '');
        vidElement.srcObject = event.streams[0];

        var vidContainer = document.createElement('div');
        vidContainer.setAttribute('id', 'remoteVideo_' + peerUuid);
        vidContainer.setAttribute('class', 'videoContainer');
        vidContainer.appendChild(vidElement);

        vidContainer.appendChild(makeLabel(peerConnections[peerUuid].displayName));
        document.getElementById('videos').appendChild(vidContainer);
    }
    updateLayout();
    }

    function checkPeerDisconnect(event, peerUuid) {
    // This function checks for any connection disconect, failure, or if it has closed and removes the peer cleanly
    // In the case of the host, the box for the peer that disconnected will disappear automatically within 5-7 seconds of departure
    var state = peerConnections[peerUuid].pc.iceConnectionState;
    window.logs.appendToLogFile(`CHECKING - Connection with peer ${peerUuid}: ${state} (858) \n`);
    if (state === "failed" || state === "closed" || state === "disconnected") {
        delete peerConnections[peerUuid];
        for (i = 0; i < previousPeerUUIDs.length; i++) {
        if (previousPeerUUIDs[i] == peerUuid) {
            delete peerUuid[i];
        }
        }
        // When a driver disconnects we want to make sure that we Emergency STOP the robot for safety
        window.udpSocket.sendDataToRobot(robotIPaddress, "E-STOP");
        previousPeerUUIDs[previousPeerUUIDs.length] = peerUuid;
        document.getElementById('videos').removeChild(document.getElementById('remoteVideo_' + peerUuid));
        updateLayout();
    } else {
        window.logs.appendToLogFile("INFO - Connection with peer is stable (872) \n");
    }
    }

    function updateLayout() {
    // update CSS grid based on number of diplayed videos
    var rowHeight = '98vh';
    var colWidth = '98vw';

    var numVideos = Object.keys(peerConnections).length;

    if (!isDriver) {
        // For Host, we keep adding video boxes for every peer joined for security
        numVideos++;
    } else {
        // But, for Driver, we only need to see the host view of the field, so it is just 1 video total
        // The rest of the videos are hidden, but the HTML divs still exist so that audio goes through, but there is no empty box
        numVideos = 1;
    }

    if (numVideos > 1 && numVideos <= 4) { // 2x2 grid
        rowHeight = '48vh';
        colWidth = '48vw';
    } else if (numVideos > 4) { // 3x3 grid
        rowHeight = '32vh';
        colWidth = '32vw';
    }

    document.documentElement.style.setProperty(`--rowHeight`, rowHeight);
    document.documentElement.style.setProperty(`--colWidth`, colWidth);
    }

    function makeLabel(label) {
    // Creates the label for the user's display name
    var vidLabel = document.createElement('div');
    vidLabel.appendChild(document.createTextNode(label));
    vidLabel.setAttribute('class', 'videoLabel');
    return vidLabel;
    }

    function errorHandler(error) {
    // Error handler for basically any error that can be handled :)
    window.logs.appendToLogFile("ERROR - occurred: " + error + " (914) \n");
    }

    // Taken from http://stackoverflow.com/a/105074/515584
    // Strictly speaking, it's not a real UUID, but it gets the job done here
    function createUUID(isDriver) {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    if (isDriver) {
        return roomName + '-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    return 'host-' + roomName + '-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}