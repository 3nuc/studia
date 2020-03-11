/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rmips2.chat.client;

import java.rmi.Remote;
import java.rmi.RemoteException;
/**
 *
 * @author atagi
 */
public interface ChatInt extends Remote {
    public String getName() throws RemoteException;
    public void send(String msg) throws RemoteException;
    public void setClient(ChatInt c)throws RemoteException;
    public ChatInt getClient() throws RemoteException;

}
