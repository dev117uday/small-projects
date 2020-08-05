/*
E-Yantra Robotics Competition 2019
Theme: Biped Patrol
Team: BP#2268
File created by: Aditya Agrawal
Contact me at: addyagrawal@gmail.com
*/
#ifndef XBee_H
#define XBee_H
#include <Arduino.h>
class XBee
{
  bool isSwitch1;
  bool isSwitch2;
  bool isSwitch3;
  bool isSwitch4;
  bool isSwitch5;

  bool isSwitch6;

  int analog1;
  int analog2;
  int analog3;
  int XZone;
  int YZone;
  HardwareSerial* mySerial;
  public:
  XBee(HardwareSerial* mySerial);
  void readData();
  bool getSwitch1();
  bool getSwitch2();
  bool getSwitch3();
  bool getSwitch4();
  bool getSwitch5();
  bool getSwitch6();
  int getAnalog1();
  int getAnalog2();
  int getAnalog3();
  int getXZone();
  int getYZone();

};
#endif