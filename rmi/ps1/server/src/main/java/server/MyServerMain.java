package server;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.RemoteException;

public class MyServerMain {
  public static void main(String[] args) {
    try {
      System.setProperty("java.security.policy", "security.policy");
      if (System.getSecurityManager() == null) {
        System.setSecurityManager(new SecurityManager());
      }
      // System.setProperty("java.rmi.server.codebase","file:/C:/Users/Jacek/workspace/RMIServer/bin/");
      System.setProperty("java.rmi.server.codebase", "/home/artur/dev/studia/rmi/ps1/server/target/classes");
      // System.setProperty("java.rmi.server.codebase", "http://192.168.1.102/jaco/");
      System.out.println("Codebase: " + System.getProperty("java.rmi.server.codebase"));
      // LocateRegistry.createRegistry(1099);
      MyServerImpl obj1 = new MyServerImpl();
      Naming.rebind("//127.0.0.1/ABC", obj1);
      System.out.println("Serwer oczekuje ...");
    } catch (RemoteException | MalformedURLException e) {
      e.printStackTrace();
    }
  }
}