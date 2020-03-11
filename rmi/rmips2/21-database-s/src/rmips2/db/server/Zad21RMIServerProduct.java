/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rmips2.db.server;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
/**
 *
 * @author atagi
 */
public class Zad21RMIServerProduct {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args)  {

try {

System.setProperty("java.security.policy", "security.policy");

if (System.getSecurityManager() == null) {

System.setSecurityManager(new SecurityManager());

}

//System.setProperty("java.rmi.server.codebase","file:/C:/Users/Jacek/workspace/RMIServer/bin/");

System.setProperty("java.rmi.server.codebase","file:/home/artur/dev/studia/rmi/rmips2/21-database-s/build/classes/");

//System.setProperty("java.rmi.server.codebase", "http://192.168.1.102/jaco/");

System.out.println("Codebase: " + System.getProperty("java.rmi.server.codebase"));

LocateRegistry.createRegistry(1099);

MyServerImpl obj1 = new MyServerImpl();

Naming.rebind("//localhost/ABC", obj1);

System.out.println("Serwer oczekuje ...");

} catch (RemoteException | MalformedURLException e) {

e.printStackTrace();

}}};