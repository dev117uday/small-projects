/*
E-Yantra Robotics Competition 2019
Theme: Biped Patrol
Team: BP#2268
File created by: Aditya Agrawal
Contact me at: addyagrawal@gmail.com
*/
#ifndef motor_h
#define motor_h

#include<Arduino.h>
#define MOTOR1_A 7
#define MOTOR1_B 6
#define MOTOR1_EN 8
#define MOTOR2_A 5
#define MOTOR2_B 4
#define MOTOR2_EN 3
#define FORWARD 1
#define BACKWARD 0
#define ENC1_A 18
#define ENC1_B A4
#define ENC2_A 19
#define ENC2_B A3
#define DEADBAND_FORWARD 30
#define DEADBAND_BACKWARD 50

extern volatile float leftEncoderPulse;
extern volatile float rightEncoderPulse;
extern float leftMotorSpeed;
extern float rightMotorSpeed;
extern volatile float leftRPS;
extern volatile float rightRPS;


void motorInit();

void m1Speed(int mSpeed);

void m2Speed(int mSpeed);

void m1Direction(int mDirection);

void m2Direction(int mDirection);

void mSpeed(int motorSpeed1, int motorSpeed2);

void mSpeed(int motorSpeed);


void mDirection(int motorDirection);

void mDrive(int motorSpeed,float rotOffset);

void leftEncoder();

void rightEncoder();

void RPSCalculate();
#endif
