package com.mycompany.rmi;

import java.rmi.RemoteException;

import java.rmi.server.UnicastRemoteObject;

public class MyServerImpl extends UnicastRemoteObject implements MyServerInt {
    int i = 0;
    protected MyServerImpl() throws RemoteException {
        super();
    }

    @Override
    public String getDescription(String text) throws RemoteException {
        i++;
        System.out.println("MyServerImpl.getDescription: " + text + " " + i);
        return "getDescription: " + text + " " + i;
    }
    
    @Override
    public float calculate(float a, float b, String operand) throws RemoteException {
        if(operand.equals("-")) {
            return a-b;
        }
        else if(operand.equals("+")) {
            return a+b;
        }
        else if(operand.equals("*")) {
            return a*b;
        }
        else if(operand.equals("/")) {
            if(b==0) return 0f;
            return a*b;
        }
        return 1337f;
    }
}