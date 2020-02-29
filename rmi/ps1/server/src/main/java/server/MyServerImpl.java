package server;

import java.rmi.RemoteException;

import java.rmi.server.UnicastRemoteObject;

public class MyServerImpl extends UnicastRemoteObject implements MyServerInt {
    /**
	 *
	 */
	private static final long serialVersionUID = 1L;
	int i = 0;
    protected MyServerImpl() throws RemoteException {
        super();
    }

    @Override
    public String getDescription(String text) throws RemoteException {
        i++;
        System.out.println("MyServerImpl.getDescription: " + text + " " + i);
        return "getDescription: " + text + " " + i;
    }
}