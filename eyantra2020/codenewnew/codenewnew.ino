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
float kp[]={50,0,1,0};
float ki[]={0.5,0,0,0};
float kd[]={1.31,0,0,0};
//float akp[]={65,0,0,0};
//float aki[]={1,0,0,0};
//float akd[]={2,0,0,0};
double wheelSpeed;
double nominalSetAngle=6;
double setAngle;

volatile double delRPS;
volatile double currentRPS;
double zero = 0;
double rotOffset;
double reqDelRPS=0;
double requiredRPS=0;
double wheelPIDAngle=0;
PID wheelPID(&currentAngle, &wheelSpeed, &wheelPIDAngle, kp[0],ki[0],kd[0],(unsigned long)10);
PID rotPID(&delRPS, &rotOffset , &reqDelRPS, kp[1],ki[1],kd[1],10);
PID anglePID(&currentRPS, &setAngle, &requiredRPS, kp[2],ki[2],kd[2],(unsigned long)10);

void loop() {
 wheelPIDAngle=setAngle-nominalSetAngle;
  // put your main code here, to run repeatedly:
  //wheelPID.setPID(map(analogRead(P_POT),0,1023,0,20),map(analogRead(I_POT),0,1023,0,20),map(analogRead(D_POT),0,1023,0,5));  
  myXBee.readData();
  if(myXBee.getYZone()==0){
    //setAngle = nonimalSetAngle;
    requiredRPS=0;
  }
  
  else if(myXBee.getYZone()==1){
    //setAngle = nonimalSetAngle;
    requiredRPS=0.75;
  }
  else if(myXBee.getYZone()==2){
    //setAngle = nonimalSetAngle;
    requiredRPS=2;
  }
  if(myXBee.getYZone()==-1){
    //setAngle = nonimalSetAngle;
    requiredRPS=-0.75;
  }
  else if(myXBee.getYZone()==-2){
    //setAngle = nonimalSetAngle;
    requiredRPS=-2;
  }
 

  else if(myXBee.getXZone()==0){
    //setAngle = nonimalSetAngle;
//    RPSCalculate();
    reqDelRPS=0;
  }
  else if(myXBee.getXZone()==1){
    //setAngle = nonimalSetAngle;
    reqDelRPS=0.4;
  }
  else if(myXBee.getXZone()==2){
    //setAngle = nonimalSetAngle;
    reqDelRPS=1;
  }
  else if(myXBee.getXZone()==-1){
    //setAngle = nonimalSetAngle;
    reqDelRPS=-0.4;
  }
  else if(myXBee.getXZone()==-2){
    //setAngle = nonimalSetAngle;
    reqDelRPS=-1;
  }
  
  getDMP();
  wheelPID.calculate();
  rotPID.calculate();
  if(myXBee.getXZone()!=0)
     setAngle=0;
    else
    
    anglePID.calculate();
    

  // motor speed setting wrt Angle
  /*if ((currentAngle-setAngle>=30))
    mDrive(-255);
  else if ((currentAngle-setAngle<=-30))
    mDrive(255);
   else*/
   
    mDrive(-wheelSpeed, rotOffset);
   // if(myXBee.getXZone()!=0)
      RPSCalculate(); 
    delRPS = rightRPS - leftRPS;
    currentRPS = (leftRPS+rightRPS)/2;
  Serial.println(currentAngle);
}
