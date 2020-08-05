#include<Arduino.h>
#include<motor.h>
volatile float leftEncoderPulse = 0;
volatile float rightEncoderPulse = 0;
float leftMotorSpeed=0;
float rightMotorSpeed=0;
float lastTime=0;
volatile float leftRPS = 0;
volatile float rightRPS = 0;
volatile float prevLeftPulse = 0;
volatile float prevRightPulse = 0;
void motorInit()
{
  pinMode(MOTOR1_A, OUTPUT);
  pinMode(MOTOR1_B, OUTPUT);
  pinMode(MOTOR1_EN, OUTPUT);
  pinMode(MOTOR2_A, OUTPUT);
  pinMode(MOTOR2_B, OUTPUT);
  pinMode(MOTOR2_EN, OUTPUT);
  pinMode(ENC1_A, INPUT_PULLUP);
  pinMode(ENC1_B, INPUT_PULLUP);
  pinMode(ENC2_A, INPUT_PULLUP);
  pinMode(ENC2_B, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(ENC1_A), leftEncoder, CHANGE);
  attachInterrupt(digitalPinToInterrupt(ENC2_A), rightEncoder, CHANGE);

}
/*
void error_calc()
{
  int SetPoint=0;
  int Kp=100;
  float error=(m1Speed - m2Speed)-SetPoint;
  float output_val=(Kp*error);
  if (error<0)
  {
    rightEncoder(output_val);
  }
  if (error>=0)
  {
    leftEncoder(output_val);
  }
}
*/
void leftEncoder(){
  /*
  analogWrite(MOTOR1_EN,mSpeed-output_val);
  analogWrite(MOTOR2_EN,mSpeed);*/
  int state = digitalRead(ENC1_A);
  if(digitalRead(ENC1_B)) 
  state ? leftEncoderPulse-- : leftEncoderPulse++;
  else 
  state ? leftEncoderPulse++ : leftEncoderPulse--;
}
void rightEncoder(){
  /*analogWrite(MOTOR1_EN,mSpeed);
  analogWrite(MOTOR2_EN,mSpeed+output_val);*/
  int state = digitalRead(ENC2_A);
  if(digitalRead(ENC2_B)) 
  state ? rightEncoderPulse-- : rightEncoderPulse++;
  else 
  state ? rightEncoderPulse++ : rightEncoderPulse--;
}


void m1Speed(int mSpeed)
{   
  if(mSpeed<0)
  {
    m1Direction(BACKWARD);
    analogWrite(MOTOR1_EN,map(abs(mSpeed), 0, 255, DEADBAND_BACKWARD,255));
  }
  else{
    m1Direction(FORWARD);
    analogWrite(MOTOR1_EN,map(abs(mSpeed), 0, 255, DEADBAND_FORWARD,255));
  }
}


void m2Speed(int mSpeed)
{ if(mSpeed<0){
    m2Direction(BACKWARD);
    analogWrite(MOTOR2_EN,map(abs(mSpeed), 0, 255, DEADBAND_BACKWARD,255));
  }
  else{
    m2Direction(FORWARD);
    analogWrite(MOTOR2_EN,map(abs(mSpeed), 0, 255, DEADBAND_FORWARD,255));
  }

}


void m1Direction(int mDirection){
  if (mDirection == FORWARD){
    digitalWrite(MOTOR1_A,HIGH);
    digitalWrite(MOTOR1_B,LOW);

  }
  else{
    digitalWrite(MOTOR1_A,LOW);
    digitalWrite(MOTOR1_B,HIGH);
  }
  
}

void m2Direction(int mDirection){
  if (mDirection == FORWARD){
    digitalWrite(MOTOR2_A,HIGH);
    digitalWrite(MOTOR2_B,LOW);
    
  }
  else{
    digitalWrite(MOTOR2_A,LOW);
    digitalWrite(MOTOR2_B,HIGH);
  }
  
}

void mSpeed(int motorSpeed1, int motorSpeed2){
  m1Speed(motorSpeed1);
  m2Speed(motorSpeed2);
  
}
void mSpeed(int motorSpeed){
  m1Speed(motorSpeed);
  m2Speed(motorSpeed);
  
}

void mDirection(int motorDirection)
{
  m1Direction(motorDirection);
  m2Direction(motorDirection);
  
}

void mDrive(int motorSpeed, float rotOffset){
  int mySpeed;
  if(motorSpeed<0)
  {
    mDirection(FORWARD);
    mySpeed = map(abs(motorSpeed), 0, 255, DEADBAND_FORWARD,255);
  }
  else{
    mDirection(BACKWARD);
    mySpeed = map(abs(motorSpeed), 0, 255, DEADBAND_BACKWARD,255);
  }
  mSpeed(mySpeed, rotOffset);
}

void RPSCalculate()
{
  if (millis()-lastTime>=10)
  {
  float delTime=(millis()-lastTime)/1000;
  // Make a local copy of the global encoder count
  volatile float left_pulse_count = leftEncoderPulse;
  volatile float right_pulse_count = rightEncoderPulse;
  // float left_current_count=timer(left_pulse_count);
  // float right_current_count=timer(right_pulse_count);
  leftRPS=(float)((left_pulse_count-prevLeftPulse)/(delTime*540));
  rightRPS=(float)((right_pulse_count-prevRightPulse)/(delTime*540));
  //     (Change in encoder count) * (60 sec/1 min)
  // RPM = __________________________________________
  //     (Change in time --> 20ms) * (PPR --> 840)
  // left_RPM = (float)(((left_current_count - left_prev_count) * 60)/(0.01*420));
  // right_RPM = (float)(((right_current_count - right_prev_count) * 60)/(0.01*420));
  
  // Store current encoder count for next iteration
  prevLeftPulse = left_pulse_count;
  prevRightPulse = right_pulse_count;
  lastTime=millis();
  }
}