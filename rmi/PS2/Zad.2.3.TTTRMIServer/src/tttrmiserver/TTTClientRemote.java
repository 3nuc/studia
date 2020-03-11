/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tttrmiserver;
import java.rmi.*;
/**
 *
 * @author artur
 */

public interface TTTClientRemote extends Remote
{
   void updateBoard(TTTBoard new_board) throws RemoteException;
}