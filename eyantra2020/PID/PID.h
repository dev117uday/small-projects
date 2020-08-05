#ifndef PID_H
#define PID_H
#include <Arduino.h>

/*
E-Yantra Robotics Competition 2019
Theme: Biped Patrol
Team: BP#2268
File created by: Aditya Agrawal
Contact me at: addyagrawal@gmail.com
*/


class PID{
  double kp;
  double ki;
  double kd;
  double* PIDInput;
  double* PIDOutput;
  double* PIDSetPoint;
  unsigned long sampleTime; //In milliseconds
  double minOutput;
  double maxOutput;
  double integral;
  double prevInput;
  unsigned long prevTime;
  double sampleTimeSecs;
  public:
    PID(double* input, double* output, double* setPoint, double kp, double ki, double kd, unsigned long sampleTime );
    bool calculate();
    void setPID(double kp, double ki, double kd);
};





#endif