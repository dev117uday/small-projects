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

XBee myXBee(&Serial2);
void setup() {
  // put your setup code here, to run once:
  pinMode(P_POT, INPUT);
  pinMode(I_POT, INPUT);
  pinMode(D_POT, INPUT);
  Serial2.begin(115200);
  Serial.begin(115200);
  MPUInit();
  //electroInit();
  //peripheralInit();
  motorInit();

}
float kp[] = {52, 0.52, 2.61, 0};//52  2.41
float ki[] = {0.5, /**/ 0.02, 0, 0};//0.5
float kd[] = {1.31, /*0.4*/ 0.4, 0, 0};//1.31
//float akp[]={65,0,0,0};
//float aki[]={1,0,0,0};
//float akd[]={2,0,0,0};
double wheelSpeed;
double nominalSetAngle = 6.75;//6.75
double setAngle;

double delRPS;
double currentRPS;
double zero = 0;
double rotOffset;
double reqDelRPS = 0;
double requiredRPS = 0;
double wheelPIDAngle = 0;


int fl_yzone=0;
int fl_yzone_set=0;
unsigned long fl_yzone_now=millis();
float mykp, myki, mykd;


PID wheelPID(&currentAngle, &wheelSpeed, &wheelPIDAngle, kp[0], ki[0], kd[0], (unsigned long)10);
PID rotPID(&delRPS, &rotOffset , &reqDelRPS, kp[1], ki[1], kd[1], (unsigned long)10);
PID anglePID(&currentRPS, &setAngle, &requiredRPS, kp[2], ki[2], kd[2], (unsigned long)10);
float mapfloat(long x, long in_min, long in_max, long out_min, long out_max)
{
 return (float)(x - in_min) * (out_max - out_min) / (float)(in_max - in_min) + out_min;
}
float leftgain(float leftGain)
{
  return 1*leftGain*delRPS;
}

void loop() {

//   put your main code here, to run repeatedly:
//  wheelPID.setPID(map(analogRead(P_POT),0,1023,0,20),map(analogRead(I_POT),0,1023,0,20),map(analogRead(D_POT),0,1023,0,5));
//  mykp=mapfloat(analogRead(P_POT),0,1023,(float)0,(float)5);
//  myki=mapfloat(analogRead(I_POT),0,1023,(float)0,(float)2);
//  mykd=mapfloat(analogRead(D_POT),0,1023,(float)0,(float)2);
//  rotPID.setPID(mykp,myki,mykd);  
  
  myXBee.readData();
  getDMP();

  if (myXBee.getYZone() == 0) {
    //setAngle = nonimalSetAngle;
    if(myXBee.getXZone() == 0 || myXBee.getXZone() == 3 /*|| myXBee.getXZone() == 2 || myXBee.getXZone() == -2 */ || myXBee.getXZone() == -3){
     // Serial.println("Balance");
      if(fl_yzone_set==1)
       {fl_yzone_set=2;
       fl_yzone_now=millis();}
      if(fl_yzone_set==2 && fl_yzone_now + 1000> millis())
      switch (fl_yzone)
      {
      case 0:
        requiredRPS=0;
        break;
       case 1:
        requiredRPS=-currentRPS*1;
        break;
       case -1:
        requiredRPS=currentRPS*1;   
        }
      else
      {
        fl_yzone=0;
        fl_yzone_set=0;
        requiredRPS=0;

      }
      //requiredRPS=0;

      reqDelRPS = 0;
      anglePID.calculate();  
      rotPID.calculate();
      wheelPIDAngle = setAngle - nominalSetAngle;
      
      wheelPID.calculate();  
      mSpeed(wheelSpeed-rotOffset,wheelSpeed+rotOffset);//-leftgain(3)
    }
    else{
      
      if(myXBee.getXZone() < 0){
        wheelPIDAngle = -nominalSetAngle-0;
      wheelPID.calculate();
       // Serial.println("Turn Left");
        mSpeed(wheelSpeed+21,wheelSpeed-21);
      }
      else{
        wheelPIDAngle = -nominalSetAngle+0;
      wheelPID.calculate();
       // Serial.println("Turn Right");
        mSpeed(wheelSpeed-21,wheelSpeed+21);
      }
      
    }
  }
  else if(myXBee.getYZone() > 0){
    //Serial.println("Forward");
    fl_yzone=1;
        fl_yzone_set=1;

//      requiredRPS = 0.55;
        requiredRPS = 1.9;
      reqDelRPS = 0;
      anglePID.calculate();  
      rotPID.calculate();
      wheelPIDAngle = setAngle - nominalSetAngle;
//      wheelPIDAngle = -nominalSetAngle + 1; 
      wheelPID.calculate();
      mSpeed(wheelSpeed-rotOffset,wheelSpeed+rotOffset);//-leftgain(1.5)
  }
  else if(myXBee.getYZone() < 0){
    //Serial.println("Backward");
    fl_yzone=-1;
    fl_yzone_set=1;
//      requiredRPS = -0.55;
      requiredRPS = -1.9;

      reqDelRPS = 0;
      anglePID.calculate();  
      rotPID.calculate();
      wheelPIDAngle = setAngle - nominalSetAngle;
//      wheelPIDAngle = -nominalSetAngle - 1.75;
      wheelPID.calculate();
      mSpeed(wheelSpeed-rotOffset,wheelSpeed+rotOffset);//-leftgain(1.5)
  }



//  anglePID.calculate();

//  rotPID.calculate();
/*
  if (myXBee.getXZone() != 0) {
    wheelPIDAngle = nominalSetAngle;
  }
  else {
    wheelPIDAngle = setAngle - nominalSetAngle;

  }
*/
 // wheelPIDAngle = -nominalSetAngle;
 // wheelPID.calculate();
  // motor speed setting wrt Angle
  /*if ((currentAngle-setAngle>=30))
    mDrive(-255);
    else if ((currentAngle-setAngle<=-30))
    mDrive(255);
    else*/

  //mSpeed(wheelSpeed+15,wheelSpeed-15);
  // if(myXBee.getXZone()!=0)
  RPSCalculate();
  delRPS = rightRPS - leftRPS;
  currentRPS = -(leftRPS + rightRPS) / 2;
//  Serial.println(myXBee.getYZone());
  Serial.print("Kp:");
  Serial.println(mykp);
  Serial.print("Ki:");
  Serial.println(myki);
  Serial.print("Kd:");
  Serial.println(mykd);
}
