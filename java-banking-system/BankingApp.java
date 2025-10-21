// BankingApp.java
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class BankingApp {
    private static Map<String, Account> accounts = new HashMap<>();
    private static int nextAccountNumber = 1001;
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int choice;
        do {
            printMenu();
            choice = scanner.nextInt();
            scanner.nextLine(); // Consome a nova linha

            switch (choice) {
                case 1:
                    createAccount();
                    break;
                case 2:
                    deposit();
                    break;
                case 3:
                    withdraw();
                    break;
                case 4:
                    checkBalance();
                    break;
                case 5:
                    System.out.println("Obrigado por usar o sistema bancário. Até logo!");
                    break;
                default:
                    System.out.println("Opção inválida. Tente novamente.");
            }
            System.out.println("----------------------------------------");
        } while (choice != 5);
        
        scanner.close();
    }

    private static void printMenu() {
        System.out.println("\n*** Sistema Bancário Console ***");
        System.out.println("1. Criar nova conta");
        System.out.println("2. Depositar");
        System.out.println("3. Sacar");
        System.out.println("4. Consultar Saldo");
        System.out.println("5. Sair");
        System.out.print("Escolha uma opção: ");
    }

    private static void createAccount() {
        System.out.print("Digite o nome do titular da conta: ");
        String ownerName = scanner.nextLine();
        String accountNumber = String.valueOf(nextAccountNumber++);
        
        Account newAccount = new Account(accountNumber, ownerName);
        accounts.put(accountNumber, newAccount);
        
        System.out.println("Conta criada com sucesso!");
        System.out.println("O número da sua conta é: " + accountNumber);
    }
    
    private static Account findAccount() {
        System.out.print("Digite o número da conta: ");
        String accountNumber = scanner.nextLine();
        return accounts.get(accountNumber);
    }

    private static void deposit() {
        Account account = findAccount();
        if (account != null) {
            System.out.print("Digite o valor para depositar: ");
            double amount = scanner.nextDouble();
            scanner.nextLine(); // Consome a nova linha
            account.deposit(amount);
        } else {
            System.out.println("Conta não encontrada.");
        }
    }

    private static void withdraw() {
        Account account = findAccount();
        if (account != null) {
            System.out.print("Digite o valor para sacar: ");
            double amount = scanner.nextDouble();
            scanner.nextLine(); // Consome a nova linha
            account.withdraw(amount);
        } else {
            System.out.println("Conta não encontrada.");
        }
    }

    private static void checkBalance() {
        Account account = findAccount();
        if (account != null) {
            System.out.println(account.toString());
        } else {
            System.out.println("Conta não encontrada.");
        }
    }
}