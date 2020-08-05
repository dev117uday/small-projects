## Self Balancing Bot
This project was created as a part of [e-yantra robotics competition](https://e-yantra.org/). The project is a two wheeled balance bot that was able to **balance** itself as well as had **joystick control**. As a plus point, it also had the capability of **picking up and delivering boxes** from one place to another.

## Authors
<table>
  <tbody><tr>
    <td align="center"><a href="https://github.com/adiagr"><img src="https://avatars1.githubusercontent.com/u/21157331?s=400&u=b85230f9847b83c55bc04fd52458e98410a01b64&v=4" width="100px;" alt="Shashank Agrawal" style="max-width:100%;"><br><sub><b>Aditya Agrawal</b></sub></a></td>
    <td align="center"><a href="https://github.com/AshishOhri"><img src="https://avatars1.githubusercontent.com/u/44030156?s=460&amp;v=4" width="100px;" alt="Ashish Ohri" style="max-width:100%;"><br><sub><b>Ashish Ohri</b></sub></a></td>
    <td align="center"><a href="https://github.com/jaigarg2"><img src="https://avatars3.githubusercontent.com/u/44141271?s=400&v=4" width="100px;" alt="Subhahu Jain" style="max-width:100%;"><br><sub><b>Jai Garg</b></sub></a></td>
  </tr>
 </tbody></table>
 
 ## Description
The bot was tried and tested on various approaches. These approaches include both single PID as well as cascaded PIDs. The uses of each file/ library has been described in the table below.

|File|Description|
|---------------|---------------------------------------------|
|Blynk|Blynk library is an IOT platform that allows one to control hardware over internet or bluetooth|
|DMP|DMP library is used to get data from MPU6050|
|I2Cdev|Deals with the communication protocols of the MPU|
|MPU6050||
|PID|PID library is a custom built library used for creating and handling of PID loops|
|XBee|XBee library is used for creating and defining the remote control functions|
|code|The final arduino code that runs the bot using all the libraries created|
|motor|motor library helps in controlling the motor encoder for the wheels|
|support||
