/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rmips2.ttt.server;

/**
 *
 * @author atagi
 */
import java.util.List;
import java.util.ArrayList;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;


public class TicTacToe extends UnicastRemoteObject implements ITicTacToe {
    private List<Player> players;
    private List<Match> matches;
    private int nextId;

    private static final int MAX_MATCHES = 500;
    private static final int MAX_PLAYERS = MAX_MATCHES * 2;

    public static final int TIMEOUT_MATCH = 60;
    public static final int TIMEOUT_GARBAGE = 30;

    private final ReadWriteLock uid_readWriteLock = new ReentrantReadWriteLock();
    private final Lock id_writeLock = uid_readWriteLock.writeLock();

    private final ReadWriteLock players_readWriteLock = new ReentrantReadWriteLock();
    private final Lock players_readLock = players_readWriteLock.readLock();
    private final Lock players_writeLock = players_readWriteLock.writeLock();

    private final ReadWriteLock matches_readWriteLock = new ReentrantReadWriteLock();
    private final Lock matches_readLock = matches_readWriteLock.readLock();
    private final Lock matches_writeLock = matches_readWriteLock.writeLock();


    public TicTacToe() throws RemoteException {
        this.players = new ArrayList<>();
        this.matches = new ArrayList<>();

        this.nextId = 0;
    }

    private Player getPlayerById(int id) {
        players_readLock.lock();
        try {
            for(Player p : players) {
                if(p.getId() == id) {
                    return p;
                }
            }
            return null;
        }
        finally {
            players_readLock.unlock();
        }
    }

    // Eliminuje obiekty graczy i mecze, których upłynął limit czasu
    public void garbageCollector() {
        List<Player> playersDelete;
        List<Match> matchesDelete;

        try {
            while(true) {
                // Utwórz listę graczy do usunięcia
                playersDelete = new ArrayList<>();
                players_readLock.lock();

                try {
                    for(Player p : players) {
                        if(p.hasTimedOut()) {
                            playersDelete.add(p);
                        }
                    }
                }
                finally {
                    players_readLock.unlock();
                }

                // Utwórz listę dopasowań do usunięcia
                matchesDelete = new ArrayList<>();

                matches_readLock.lock();

                try {
                    for(Match m : matches) {
                        if(m.hasTimedOut()) {
                            System.out.println("[Garbage Collector] Usunieto mecz!");
                            matchesDelete.add(m);
                        }
                    }
                }
                finally {
                    matches_readLock.unlock();
                }

                players_writeLock.lock();

                try {
                    for(Player p :playersDelete) {
                        System.out.println("[Garbage Collector] Usunieto gracza " + p.getName());
                        players.remove(p);
                    }
                }
                finally {
                    players_writeLock.unlock();
                }

                matches_writeLock.lock();

                try {
                    for(Match m : matchesDelete) {
                        System.out.println("Wylaczono mecz");
                        matches.remove(m);
                    }
                }
                finally {
                    matches_writeLock.unlock();
                }

                System.out.println("Garbage Collector!");
                Thread.sleep(TIMEOUT_GARBAGE * 1000000);
            }
        }
        catch (Exception e) {
            System.err.println("Garbage collector error!");
        }
    }

// Zarejestruj graczy na serwerze
    public int addPlayer(String name) throws RemoteException {
        if(matches.size() == MAX_PLAYERS) {
            return -2;
        }

        players_readLock.lock();
        try {
            for(Player p : players) {
                if(p.getName().equalsIgnoreCase(name)) {
                    return -1;
                }
            }
        }
        finally {
            players_readLock.unlock();
        }

        id_writeLock.lock();
        players_writeLock.lock();
        try {
            Player p = new Player(nextId++, name);
            players.add(p);

            System.out.println("Uzytkownik " + p.getName() + " (" + p.getId() + ") dolaczyl!");
            p.updateTimestamp();
            return p.getId();
        }
        finally {
            id_writeLock.unlock();
            players_writeLock.unlock();
        }
    }

    // Zakończ grę w normalny sposób
    public int endMatch(int id) throws RemoteException{
        Player p = getPlayerById(id);

        if(p == null) {
            return -1;
        }

        Match m = p.getMatch();

        if(m == null) {
            return -1;
        }

        players_writeLock.lock();
        System.out.println("Usuwanie gracza " + p.getName());
        try {
            if(p == m.getPlayer1()) {
                m.setPlayer1(null);
            }
            else {
                m.setPlayer2(null);
            }
            players.remove(p);
        }
        finally {
            players_writeLock.unlock();
        }


        matches_writeLock.lock();
        try {
            if(m.canDelete()) {
                System.out.println("Usuwanie meczu");
                matches.remove(m);
            }
        }
        finally {
            matches_writeLock.unlock();
        }

        return 0;
    }


    // Sprawdź, czy na gracza czeka gra
    public int hasMatch(int id) throws RemoteException {
        Player p = getPlayerById(id);

        if(p == null) {
            return -1;  // Błąd, gracz nie jest zarejestrowany
        }

        Match match = p.getMatch();

        if(match != null) {
            if(match.isReady()) {
                if(match.getPlayer1() == p) {
                    return 1; // Player 1
                }
                else {
                    return 2; // Player 2
                }
            }
            else if(p.hasTimedOut()) {
                return -2;  // Limit czasu oczekiwania na drugiego gracza
            }
            else {
                return 0;   // Oczekiwanie na drugiego gracza
            }
        }

        // Sprawdź, czy na drugiego gracza czeka mecz
        matches_writeLock.lock();
        try {
            for(Match m : matches) {
                if(!m.isReady()) {
                    m.setPlayer2(p);
                    p.setMatch(m);
                    p.updateTimestamp();
                    return 2; // Player 2
                }
            }
        }
        finally {
            matches_writeLock.unlock();
        }

        // W przeciwnym razie zostanie utworzona nowa gra czekająca na drugiego gracza
        matches_writeLock.lock();
        try {
            Match m = new Match(p);
            matches.add(m);
            p.setMatch(m);
            p.updateTimestamp();
            return 0;
        }
        finally {
            matches_writeLock.unlock();
        }
    }


// Sprawdź, czy nadeszła tura gracza
    public int isMyTurn(int id) throws RemoteException {

        Player p = getPlayerById(id);

        if(p == null) {
            return -1;   // Erro
        }

        p.updateTimestamp();

        Match m = p.getMatch();

        if(m == null) {
            return -1;  // Erro
        }

        if(!m.isReady()) {
            return -2;
        }

        Player oponente = (p == m.getPlayer1()) ? m.getPlayer2() : m.getPlayer1();

        if(oponente == null && m.isReady()) {
            return 5;
        }

        if (oponente.hasTimedOut()) {
            return 5;
        }

        if(p.hasTimedOut()) {
            return 6;
        }

        // Sprawdź, czy jest zwycięzca
        Player p_ganhador = p.getMatch().getWinner();
        if(p_ganhador != null) {
            if(p_ganhador == p) {
                return 2;
            }
            else {
                return 3;
            }
        }

        if(p.getMatch().getCurrentPlayer() == p) {
            return 1; // Tura gracza
        }
        else {
            return 0; // Tura drugiego gracza
        }
    }

    // Zwraca bieżącą tablicę
    public String getBoard(int id) throws RemoteException {
    Player p = getPlayerById(id);

    if(p == null) {
        return null;  // Erro
    }

    Match m = p.getMatch();

    if(m == null) {
        return null; // Erro
    }

    char[][] board = m.getBoard();

    return  "\n      0     1     2     \n" +
            "   +-----+-----+-----+\n" +
            "0  |  "  + board[0][0] + "  |  " + board[0][1] + "  |  "  + board[0][2]+ "  |\n" +
            "   +-----+-----+-----+\n" +
            "1  |  "  + board[1][0] + "  |  " + board[1][1] + "  |  " + board[1][2] + "  |\n" +
            "   +-----+-----+-----+\n" +
            "2  |  "  + board[2][0] + "  |  " + board[2][1] + "  |  " + board[2][2] + "  |\n" +
            "   +-----+-----+-----+\n";
    }

    public int move(int id, int linha, int coluna) throws RemoteException {

        Player p = getPlayerById(id);

        if(p == null) {
            return -1;      // Niepoprawne parametry
        }

        Match m = p.getMatch();
        if(m == null) {
            return -3;      // Niepoprawne parametry
        }

        if(!m.isReady()) {
            return -2;        // Start nie jest gotowy
        }

        if(m.getCurrentPlayer() != p) {
            return -4;      // Kolej innego gracza
        }

        if(m.getCurrentPlayer().hasTimedOut()) {
            return 2;         // Limit czasu
        }

        return m.move(linha, coluna);

    }

    public String getOpponent(int id) throws RemoteException {
        Player p = getPlayerById(id);

        if(p == null) {
            return null;
        }

        Match m = p.getMatch();

        if(m == null) {
            return null;
        }

        if (m.isReady()) {
            if(m.getPlayer1() == p) {
                return m.getPlayer2().getName();
            }
            else {
                return m.getPlayer1().getName();
            }
        }
        return null;
    }

}