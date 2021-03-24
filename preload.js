//Import Datagram Socket Library from Node.js
dgram = require("dgram");

//Create UDP Socket using the Datagram Library
socket = dgram.createSocket("udp4")

//This is used for the connection to the cloud signalling server (index.html 354)
window.websocket = require("ws");

window.fullDate = "";
window.dir = (process.platform == 'darwin') ? __dirname.replace('TeleDrive.app/Contents/Resources/app', '') : ".";

window.fs = require("fs");
window.udpSocket = {
    //Function to send gamepad data to socket at IP address provided by user and at port 11049
    sendDataToRobot: (ipAddress, message) => {
        socket.send(Buffer.from(message), 11049, ipAddress, function (error) {
            if (error) {
                console.log("Error relaying message to robot. Closing socket...");
            }
        });
    }
}
window.logs = {
    createLogFile: () => {
        if (!window.fs.existsSync(window.dir + '/TeleDrive')) {
            window.fs.mkdirSync(window.dir + '/TeleDrive');
        }
        var date = new Date;
        var seconds = date.getSeconds();
        var minutes = date.getMinutes();
        var hour = date.getHours();

        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        window.fullDate = (year + '-' + (month + 1) + '-' + day + "_" + hour + "-" + minutes + "-" + seconds + '.txt');
    },
    appendToLogFile: (content) => {
        var fileName = window.dir + '/TeleDrive/' + window.fullDate;
        window.fs.appendFile(fileName, content, function (err) {
            if (err) throw err;
        });
    }
}