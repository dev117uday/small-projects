/*
E-Yantra Robotics Competition 2019
Theme: Biped Patrol
Team: BP#2268
File created by: Aditya Agrawal
Contact me at: addyagrawal@gmail.com
*/
#ifndef support_h
#define support_h

#include <Arduino.h>

#define ELECTRO_1 9
#define ELECTRO_2 10
#define BUZZER 11
#define RED_LED 11
#define GREEN_LED 12

void electro1(bool state);

void electro2(bool state);

void electroInit();

void peripheralInit();

void startRun();

void endRun();
#endif