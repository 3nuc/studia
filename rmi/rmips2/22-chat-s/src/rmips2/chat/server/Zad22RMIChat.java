/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rmips2.chat.server;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.util.Scanner;

/**
 *
 * @author atagi
 */
public class Zad22RMIChat {

public static void main(String[] args)  {

try {

System.setProperty("java.security.policy", "security.policy");

if (System.getSecurityManager() == null) {

System.setSecurityManager(new SecurityManager());

}

Scanner s=new Scanner(System.in);
System.out.println("Enter Your name and press Enter:");
String name=s.nextLine().trim();

//System.setProperty("java.rmi.server.codebase","file:/C:/Users/Jacek/workspace/RMIServer/bin/");

System.setProperty("java.rmi.server.codebase","file:/C:/Users/micha/Desktop/RSI/PS2/Zad.2.2.RMIServerChat/build/classes/");

System.setProperty("java.rmi.server.hostname", "192.168.1.241");

 LocateRegistry.createRegistry(1099);

Chat server = new Chat(name);

Naming.rebind("//192.168.1.241/ABC", server);
System.out.println("Successfully connected to the server.You can now chat freely. ");

while(true){
    String msg=s.nextLine().trim();
    if (server.getClient()!=null){
	ChatInt client=server.getClient();
        msg="["+server.getName()+"]: "+msg;
        client.send(msg);
   
	}	
    }

} catch (RemoteException | MalformedURLException e) {

e.printStackTrace();

}}};