/*
E-Yantra Robotics Competition 2019
Theme: Biped Patrol
Team: BP#2268
File created by: Aditya Agrawal
Contact me at: addyagrawal@gmail.com
*/
#ifndef DMP_H
#define DMP_H
extern bool dmpReady;  // set true if DMP init was successful
extern double angle;
extern uint8_t mpuIntStatus;   // holds actual interrupt status byte from MPU
extern uint8_t devStatus;      // return status after each device operation (0 = success, !0 = error)
extern uint16_t packetSize;    // expected DMP packet size (default is 42 bytes)
extern uint16_t fifoCount;     // count of all bytes currently in FIFO
extern uint8_t fifoBuffer[64]; // FIFO storage buffer
extern double currentAngle, currentRotation;
extern float euler[3];         // [psi, theta, phi]    Euler angle container
extern float ypr[3];           //


#define INTERRUPT_PIN 2  // use pin 2 on Arduino Uno & most boards


/*MPU Init*/

void MPUInit();

void getDMP();
#endif