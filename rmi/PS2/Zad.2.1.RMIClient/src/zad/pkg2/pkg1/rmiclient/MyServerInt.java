/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zad.pkg2.pkg1.rmiserverproduct;


import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface MyServerInt extends Remote {
    String getDescription(String text) throws RemoteException;
    List<Product> getProducts() throws RemoteException;
    Product searchProduct(String name) throws RemoteException;
}