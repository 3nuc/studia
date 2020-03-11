/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rmips2.ttt.server;

/**
 *
 * @author atagi
 */
import java.rmi.Naming;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import rmips2.ttt.server.TicTacToe;

public class Server {

    public static void main(String[] args) {

        try {
            System.setProperty("java.security.policy", "security.policy");

            if (System.getSecurityManager() == null) {

            System.setSecurityManager(new SecurityManager());
        }
            LocateRegistry.createRegistry(1099);
            System.setProperty("java.rmi.server.codebase","file:/C:/Users/micha/Desktop/RSI/PS2/Zad.2.3.TTTRMIServer/build/classes/");
            System.setProperty("java.rmi.server.hostname", "192.168.1.241");
            TicTacToe game = new TicTacToe();
            Naming.rebind("//192.168.1.241/ABC", game);
            System.out.println("TicTac Toe server ready!");

            game.garbageCollector();
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}