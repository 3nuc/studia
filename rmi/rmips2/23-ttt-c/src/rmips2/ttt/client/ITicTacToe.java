/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rmips2.ttt.client;
import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 *
 * @author atagi
 */


public interface ITicTacToe extends Remote {
    int addPlayer(String name) throws RemoteException;
    int endMatch (int id) throws RemoteException;
    int hasMatch (int id) throws RemoteException;
    String getOpponent(int id) throws RemoteException;
    int isMyTurn(int id) throws RemoteException;
    String getBoard(int id) throws RemoteException;
    int move (int id, int linha, int coluna) throws RemoteException;
}