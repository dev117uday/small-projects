/*
E-Yantra Robotics Competition 2019
Theme: Biped Patrol
Team: BP#2268
File created by: Aditya Agrawal
Contact me at: addyagrawal@gmail.com
*/

#include <PID.h>
#include <DMP.h>
#include <XBee.h>
#include <motor.h>
#include <support.h>

#define P_POT A3
#define I_POT A4
#define D_POT A5

XBee myXBee(&Serial2);
void setup() {
  // put your setup code here, to run once:
  pinMode(P_POT,INPUT);
  pinMode(I_POT,INPUT);
  pinMode(D_POT,INPUT);
  Serial2.begin(115200);
  Serial.begin(115200);
  MPUInit();
  //electroInit();
  //peripheralInit();
  motorInit();
  
}
float kp[]={55,1,1,0};
float ki[]={0.5,0,-0.005,0};
float kd[]={1.31,0,0,0};
double wheelSpeed;
double nominalSetAngle=-2;
double setAngle;

volatile double delRPS;
volatile double currentRPS;
double zero = 0;
double rotOffset;
double reqDelRPS=0;
double requiredRPS=0;
PID wheelPID(&currentAngle, &wheelSpeed, &setAngle, kp[0],ki[0],kd[0],(unsigned long)10);
PID anglePID(&currentRPS, &setAngle, &requiredRPS, kp[2],ki[2],kd[2],(unsigned long)10);
PID rotPID(&delRPS, &rotOffset , &reqDelRPS, kp[1],ki[1],kd[1],10);
void loop() {
  // put your main code here, to run repeatedly:
  //wheelPID.setPID(map(analogRead(P_POT),0,1023,0,20),map(analogRead(I_POT),0,1023,0,20),map(analogRead(D_POT),0,1023,0,5));  
  myXBee.readData();
  if(myXBee.getYZone()==0){
    //setAngle = nonimalSetAngle;
    requiredRPS=0;
  }
  else if(myXBee.getYZone()==1){
    //setAngle = nonimalSetAngle;
    requiredRPS=2;
  }
  else if(myXBee.getYZone()==2){
    //setAngle = nonimalSetAngle;
    requiredRPS=2;
  }
  else if(myXBee.getYZone()==-1){
    //setAngle = nonimalSetAngle;
    requiredRPS=-2;
  }
  else if(myXBee.getYZone()==-2){
    //setAngle = nonimalSetAngle;
    requiredRPS=-2;
  }

  if(myXBee.getXZone()==0){
    //setAngle = nonimalSetAngle;
    reqDelRPS=0;
  }
  else if(myXBee.getXZone()==1){
    //setAngle = nonimalSetAngle;
    reqDelRPS=1;
  }
  else if(myXBee.getXZone()==2){
    //setAngle = nonimalSetAngle;
    reqDelRPS=1;
  }
  else if(myXBee.getXZone()==-1){
    //setAngle = nonimalSetAngle;
    reqDelRPS=-1;
  }
  else if(myXBee.getXZone()==-2){
    //setAngle = nonimalSetAngle;
    reqDelRPS=-1;
  }
  getDMP();
  wheelPID.calculate();
  rotPID.calculate();
    anglePID.calculate();

  // motor speed setting wrt Angle
  /*if ((currentAngle-setAngle>=30))
    mDrive(-255);
  else if ((currentAngle-setAngle<=-30))
    mDrive(255);
   else*/
   
    mDrive(-wheelSpeed, rotOffset);
    RPSCalculate();
    delRPS = rightRPS - leftRPS;
    currentRPS = (leftRPS+rightRPS)/2;
  Serial.println(currentAngle);
}
