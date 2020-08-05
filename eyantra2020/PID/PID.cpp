#include<Arduino.h>
#include<PID.h>


PID::PID(double* input, double* output, double* setPoint, double kp, double ki, double kd, unsigned long sampleTime ){
  this->sampleTime = sampleTime;
  this->sampleTimeSecs = ((double)sampleTime)/1000;
  this->kp=kp;
  this->ki=ki*sampleTimeSecs;
  this->kd=kd/sampleTimeSecs;
  this->PIDInput= input;
  this->PIDOutput= output;
  this->PIDSetPoint= setPoint;
  this->minOutput = -255;
  this->maxOutput = 255;
  this->prevTime=millis()-sampleTime;
}
bool PID::calculate(){
  unsigned long now= millis();
  unsigned long timeElapsed = now - prevTime;
  if (timeElapsed >= sampleTime){
    //do something
    double input = *PIDInput;
    double output;
    double setPoint = *PIDSetPoint;
    double error =  setPoint - input;
    integral += ki*error;
    double delError =  input - prevInput;
    output = constrain(kp*error + integral - kd*delError, minOutput, maxOutput);
    prevTime = now;
    prevInput = input;
    *PIDOutput = output;
    return true;      
  }
  else{
    return false; 
  }
}
    
void PID::setPID(double kp, double ki, double kd){
  //this->integral=0;
  this->kp=kp;
  this->ki=ki*sampleTimeSecs;
  this->kd=kd/sampleTimeSecs;

}