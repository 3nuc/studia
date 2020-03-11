/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zad.pkg2.pkg3.tttrmiclient;

/**
 *
 * @author artur
 */

import java.rmi.Naming;
import java.util.Scanner;
import tttrmiserver.ITicTacToe;



public class Main {

    public static void main(String[] args) {
           System.setProperty("java.security.policy", "security.policy") ;
           System.setSecurityManager(new SecurityManager());
     

        try {
            ITicTacToe game = (ITicTacToe) Naming.lookup("//localhost/ABC");
            Scanner stdin = new Scanner(System.in);

            Scanner s=new Scanner(System.in);
            System.out.println("Wprowadz nazwe uzytkownika:");
            String name=s.nextLine().trim();
            
            // Registra jogador no servidor remoto
            int id = game.addPlayer(name);

            if (id == -1) {
                System.err.println("Nazwa użytkownika jest już w użyciu!");
                System.exit(1);
            }

            if (id == -2) {
                System.err.println("Przekroczono maksymalną liczbę graczy na serwerze!");
                System.exit(1);
            }

            int hasMatch = game.hasMatch(id);

            System.out.println("Szukam przeciwnika ...");

            // Verifica se há alguma partida ativa
            while (hasMatch != 1 && hasMatch != 2) {
                if (hasMatch == -2) {
                    System.err.println("Poczekaj!");
                    System.exit(1);
                }

                if (hasMatch == -1) {
                    System.err.println("Błąd serwera!");
                    System.exit(1);
                }

                // Sprawdzaj co 1 sekundę
                Thread.sleep(1000);
                hasMatch = game.hasMatch(id);
            }

            System.out.println("Gracz " + game.getOpponent(id) + " wszedł do gry ....");

            int isMyTurn;
            String message = null;

            // Pętla gry
            while (true) {

                // Sprawdź, czy tura tego gracza
                isMyTurn = game.isMyTurn(id);

                if (isMyTurn == -2) {
                    System.err.println("W tej grze nie ma dwóch graczy!");
                    game.endMatch(id);
                    System.exit(1);
                }

                if (isMyTurn == -1) {
                    System.err.println("Błąd serwera!");
                    game.endMatch(id);
                    System.exit(1);
                }

                switch (isMyTurn) {
                    case 2:
                        message = "Wygrałeś!";
                        break;
                    case 3:
                        message = "Przegrałeś!";
                        break;
                    case 4:
                        message = "Remis!";
                        break;
                    case 5:
                        message = "Wygrałeś!";
                        break;
                    case 6:
                        message = "Przegrałeś!";
                        break;
                }

                // Koniec gry, wyświetla wynik i zamyka
                if (isMyTurn > 1 && isMyTurn < 7) {
                    System.out.println(message);

                    if (game.endMatch(id) == -1) {
                        System.err.println("Błąd podczas kończenia gry!");
                        System.exit(1);
                    } else {
                        System.out.println("Mecz zakończony!");
                        System.exit(0);
                    }
                }

                // Możesz przesuwać tylko pionki na planszy
                int ret_movePeca = -1;

                while ((ret_movePeca != 1) && (ret_movePeca != -3) && (isMyTurn == 1)) {

                    System.out.println(game.getBoard(id));

                    System.out.println("Wprowadź pozycję ...");
                    System.out.print("Wiersz: ");
                    int linha = stdin.nextInt();

                    System.out.print("Kolumna: ");
                    int coluna = stdin.nextInt();

                    ret_movePeca = game.move(id, linha, coluna);

                    switch (ret_movePeca) {
                        case 2:
                            System.out.println("Przegrałes przez poddanie!");
                            game.endMatch(id);
                            System.exit(0);
                        case 1:
                            System.out.println("Pomyślnie wykonano ruch");
                            System.out.println(game.getBoard(id));
                            break;
                        case 0:
                            System.out.println("Nieprawidłowa pozycja!");
                            break;
                        case -1:
                            System.out.println("Nieprawidłowe parametry!");
                            break;
                        case -2:
                            System.err.println("W tym meczu nie ma dwóch graczy!");
                            game.endMatch(id);
                            System.exit(1);
                        case -3:
                            System.out.println("Nieprawidłowe parametry!");
                            break;
                        case -4:
                            System.out.println("Ruch przeciwnika");
                            break;
                    }

                }
            }

        } catch (Exception e) {
            System.err.println("TicTacToe client failed!");
            System.err.println(e.toString());
            e.printStackTrace();
        }
    }
}