// Account.java
public class Account {
    private String accountNumber;
    private String ownerName;
    private double balance;

    public Account(String accountNumber, String ownerName) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0.0; // Contas começam com saldo zero
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.println("Depósito de R$" + String.format("%.2f", amount) + " realizado com sucesso.");
        } else {
            System.out.println("Valor de depósito inválido.");
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            System.out.println("Saque de R$" + String.format("%.2f", amount) + " realizado com sucesso.");
            return true;
        } else if (amount > this.balance) {
            System.out.println("Saldo insuficiente para este saque.");
            return false;
        } else {
            System.out.println("Valor de saque inválido.");
            return false;
        }
    }

    @Override
    public String toString() {
        return "Conta [Nº: " + accountNumber + ", Titular: " + ownerName + ", Saldo: R$" + String.format("%.2f", balance) + "]";
    }
}