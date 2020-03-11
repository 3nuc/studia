/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zad.pkg2.pkg1.rmiclient;

import java.rmi.Naming;
import java.util.List;
import zad.pkg2.pkg1.rmiserverproduct.MyServerInt;
import zad.pkg2.pkg1.rmiserverproduct.Product;

/**
 *
 * @author artur
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

            findProductParsed(myRemoteObject, "Product2");
            findProductParsed(myRemoteObject, "Product40");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void findProductParsed(MyServerInt myRemoteObject, String name) throws Exception {
        Product result = myRemoteObject.searchProduct(name);

        if (result == null)
            System.out.println("Nie znaleziono " + name + "!");
        else
            System.out.println("Znaleziono " + name + " found:\nid: " + result.Id + "\nnazwa: " + result.Name);
    }
}
