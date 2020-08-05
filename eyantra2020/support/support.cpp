#include<Arduino.h>
#include<support.h>

void electro1(bool state){
  digitalWrite(ELECTRO_1, state);
}

void electro2(bool state){
  digitalWrite(ELECTRO_2, state);
}

void electroInit(){
  pinMode(ELECTRO_1, OUTPUT);
  pinMode(ELECTRO_2, OUTPUT);
}

void peripheralInit(){
  pinMode(BUZZER, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  
}

void startRun(){
/*TODO*/
  
}

void endRun(){
/*TODO*/
  
}