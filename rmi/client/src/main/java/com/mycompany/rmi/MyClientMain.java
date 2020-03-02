package com.mycompany.rmi;
import java.rmi.Naming;

public class MyClientMain {

public static void main(String[] args) {

System.setProperty("java.security.policy", "security.policy");

System.setSecurityManager(new SecurityManager());

try {

MyServerInt myRemoteObject = (MyServerInt) Naming.lookup("//localhost/ABC");

float a = 3.5f;
float b = 2f;
String operand = "+";

Float result = myRemoteObject.calculate(a,b, operand);

System.out.println("Wysłano do serwera: " + a + " " + operand + " " + b);

System.out.printf("Otrzymana z serwera odpowiedź: %.5f ", result);

} catch (Exception e) {

e.printStackTrace();

}}}