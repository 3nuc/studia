package com.mycompany.rmi;

import java.rmi.Remote;

import java.rmi.RemoteException;

public interface MyServerInt extends Remote{

    String getDescription(String text) throws RemoteException;
    float calculate(float a, float b, String operand) throws RemoteException;
}