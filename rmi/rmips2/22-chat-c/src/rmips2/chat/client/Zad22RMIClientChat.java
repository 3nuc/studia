/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rmips2.chat.client;

import java.rmi.Naming;
import java.util.List;
import java.util.Scanner;
import rmips2.chat.client.Chat;
import rmips2.chat.client.ChatInt;

/**
 *
 * @author atagi
 */
public class Zad22RMIClientChat {


     public static void main(String[] args) throws Exception {
        System.setProperty("java.security.policy", "security.policy") ;
                 System.setSecurityManager(new SecurityManager());

        try {
            
            Scanner s=new Scanner(System.in);
            System.out.println("Enter name:");
            String name=s.nextLine().trim();		    		    	
            ChatInt client = new Chat(name);
            
            ChatInt server = (ChatInt) Naming.lookup("//192.168.1.129/ABC");

            System.out.println("Successfully connected to the server.You can now chat freely. ");
            String msg="["+client.getName()+"] connected";
            server.send(msg);
            server.setClient(client);
            while(true){
		msg=s.nextLine().trim();
		msg="["+client.getName()+"]: "+msg;		    		
	    	server.send(msg);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
