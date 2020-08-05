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

#define P_POT A8
#define I_POT A9
#define D_POT A10

float mapfloat(long x, long in_min, long in_max, long out_min, long out_max)
{
 return (float)(x - in_min) * (out_max - out_min) / (float)(in_max - in_min) + out_min;
}

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
float kp[]={50,0,0,0};
float ki[]={0.27,0,0,0};
float kd[]={1.31,0,0,0};
double wheelSpeed;
double setAngle=-1;
float mykp, myki, mykd;
String kpstring, kistring, kdstring;
PID wheelPID(&currentAngle, &wheelSpeed, &setAngle, kp[0],ki[0],kd[0],(unsigned long)10);
void loop() {
  // put your main code here, to run repeatedly:
  myXBee.readData();
  mykp=mapfloat(analogRead(P_POT),0,1023,(float)40,(float)50);
  myki=mapfloat(analogRead(I_POT),0,1023,(float)0,(float)20);
  mykd=mapfloat(analogRead(D_POT),0,1023,(float)0,(float)10);
  //wheelPID.setPID(mykp,myki,mykd);  
  getDMP();
  wheelPID.calculate();
  // motor speed setting wrt Angle
  /*if ((currentAngle-setAngle>=30))
    mDrive(-255);
  else if ((currentAngle-setAngle<=-30))
    mDrive(255);
   else*/
    mDrive(-wheelSpeed);
  //Serial.println(currentAngle);
 
  
 // Serial.print("Kp:");
  //Serial.println(mykp);
  //Serial.print("Ki:");
  //Serial.println(myki);
  //Serial.print("Kd:");
  //Serial.println(mykd);
}
