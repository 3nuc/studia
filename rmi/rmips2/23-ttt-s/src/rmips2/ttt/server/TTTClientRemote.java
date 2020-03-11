/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rmips2.ttt.server;
import java.rmi.*;
/**
 *
 * @author atagi
 */

public interface TTTClientRemote extends Remote
{
   void updateBoard(TTTBoard new_board) throws RemoteException;
}