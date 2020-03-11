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


public interface TTTInt extends Remote
{
   public TTTInt getState()throws RemoteException;
   public void pick(int col, int row)throws RemoteException;
   public void reset()throws RemoteException;
   // added so client can register self with server for callbacks
   public void register(TTTClientRemote newClient) throws RemoteException;
}
