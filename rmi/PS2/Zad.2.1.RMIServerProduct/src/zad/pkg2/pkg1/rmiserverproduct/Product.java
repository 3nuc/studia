/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zad.pkg2.pkg1.rmiserverproduct;

/**
 *
 * @author artur
 */
import java.io.Serializable;

public class Product implements Serializable{
    public static final long serialVersionUID = 1L;

    int i = 0;

    protected Product(int id, String name) {
        Id = id;
        Name = name;
    }

    public int Id;
    public String Name;
}
