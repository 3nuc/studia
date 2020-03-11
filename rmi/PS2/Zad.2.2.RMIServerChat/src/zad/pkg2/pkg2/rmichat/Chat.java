/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zad.pkg2.pkg2.rmichat;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 *
 * @author artur
 */
public class Chat extends UnicastRemoteObject implements ChatInt  {

	public String name;
	public ChatInt client=null;


	public Chat(String n)  throws RemoteException { 

		this.name = n;   
	
	}
        
	public String getName() throws RemoteException {

		return this.name;

	}
	

	public void setClient(ChatInt c){
		
                client=c;

	}

	public ChatInt getClient(){
		return client;
	}

	public void send(String s) throws RemoteException{
		System.out.println(s);
	
	}	
}
