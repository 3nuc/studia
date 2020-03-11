/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rmips2.db.client;

import java.rmi.Naming;
import java.util.List;
import rmips2.db.client.MyServerInt;
import rmips2.db.client.Product;

/**
 *
 * @author atagi
 */
public class Zad21RMIClient {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception {
        System.setProperty("java.security.policy", "security.policy") ;
                 System.setSecurityManager(new SecurityManager());

        try {
            MyServerInt myRemoteObject = (MyServerInt) Naming.lookup("//localhost/ABC");

      
            List<Product> result = myRemoteObject.getProducts();

            System.out.println("Otrzymana lista produktów: ");

            for (Product p : result) {
                System.out.println(p.Id + " " + p.Name);
            }

            Search(myRemoteObject, "Product2");
            Search(myRemoteObject, "Product40");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void Search(MyServerInt myRemoteObject, String name) throws Exception {
        Product result3 = myRemoteObject.searchProduct(name);

        if (result3 == null)
            System.out.println("search " + name + " not found");
        else
            System.out.println("search " + name + " found: \n -id: " + result3.Id + "\n -name: " + result3.Name);
    }
}
