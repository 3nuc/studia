/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rmips2.db.server;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.List;

public class MyServerImpl extends UnicastRemoteObject implements MyServerInt {
    public static final long serialVersionUID = 1L;

    int i = 0;

    protected MyServerImpl() throws RemoteException {
        super();

        for (int j = 0; j < 10; ++j) {
            Products.add(new Product(j, "Product" + j));
        }
    }

    @Override
    public String getDescription(String text) throws RemoteException {
        i++;
        System.out.println("MyServerImpl.getDescription: " + text + " " + i);

        return "getDescription: " + text + " " + i;
    }

    List<Product> Products = new ArrayList<Product>();

    @Override
    public List<Product> getProducts() throws RemoteException {
        return Products;
    }

    @Override
    public Product searchProduct(String name) throws RemoteException {

        for (Product p : Products) {
            if (p.Name.equals(name))
                return p;
        }
        return null;
    }
}