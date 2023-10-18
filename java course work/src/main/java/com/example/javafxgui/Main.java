package com.example.javafxgui;

import java.io.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class Main extends HelloApplication{
    static ArrayList<Customer> waitingCustomerList = new ArrayList<>();
    static ArrayList<FoodQueue> foodqueues;    //initialize arraylist  foodqueues
    static Queue<Customer> waitingList;


    private static final int Maximum_stock = 50;
    private static final int Warning_Stock = 10;
    private static final int[] Queue_capacity = {2, 3, 5};        //initialized capacity of queues

    private static final int Num_of_cashiers = Queue_capacity.length;

    private static final int BURGER_PRICE = 650;
    private static final Scanner input = new Scanner(System.in);

    static final String[][] queues = {{"X", "X"}, {"X", "X", "X"}, {"X", "X", "X", "X", "X"}};    //initialized queues
    private static int[] stock = {Maximum_stock};

    public static void main(String[] args) {

        foodqueues = new ArrayList<>();
        waitingList = new LinkedList<>();

        while (true) {
            displayMenu();
            System.out.print("Enter your choice: ");
            String choice = input.nextLine();
            System.out.println();

            switch (choice) {
                case "100":
                case "VFQ":
                    viewAllQueues();
                    break;
                case "101":
                case "VEQ":
                    viewEmptyQueues();
                    break;
                case "102":
                case "ACQ":
                    addCustomerToQueue();
                    break;
                case "103":
                case "RCQ":
                    removeCustomerFromQueue();
                    break;
                case "104":
                case "PCQ":
                    removeServedCustomer();
                    break;
                case "105":
                case "VCS":
                    viewCustomersSorted();
                    break;
                case "106":
                case "SPD":
                    storeProgramData();
                    break;
                case "107":
                case "LPD":
                    loadProgramData();
                    break;
                case "108":
                case "STK":
                    viewRemainingStock();
                    break;
                case "109":
                case "AFS":
                    addBurgersToStock();
                    break;
                case "110":                //add new method  to view income
                case "IFQ":
                    viewIncomeOfQueues();
                    break;
                case "112":                //add new method  to view gui
                case "GUI":
                    runGUI();
                    break;
                case "999":
                case "EXT":
                    System.out.println("!!!!!!!!!Thank you for using Foodies Fave Food Center. Goodbye!!!!!!!!");
                    input.close();
                    return;
                default:
                    System.out.println("-------Invalid choice. Please try again.----------");
            }

            System.out.println();
        }
    }

    private static void viewAllQueues() {            //view queues
        System.out.println("*****************");
        System.out.println("*    Cashiers   *");
        System.out.println("*****************");
        for (int i = 0; i < queues[2].length; i++) {
            for (int j = 0; j < queues.length; j++) {
                if (i >= queues[j].length) {
                    System.out.print("   ");
                    continue;
                }
                System.out.print(" " + queues[j][i] + " ");
            }
            System.out.println("");
        }
    }

    private static void viewEmptyQueues() {    //view empty queues
        for (int i = 0; i < queues.length; i++) {
            System.out.println("Queue " + (i + 1) + "  :");
            for (int j = 0; j < queues[i].length; j++) {
                if (queues[i][j].equals("X")) {
                    System.out.println((j + 1));
                }
            }
            System.out.println();
        }
    }

    private static void displayMenu() {
        System.out.println("""
                !------------Welcome to Food Fave Center---------------!
                -------------------------Menu--------------------------
                100 or VFQ: View all Queues.
                101 or VEQ: View all Empty Queues.
                102 or ACQ: Add customer to a Queue.
                103 or RCQ: Remove a customer from a Queue. (From a specific location)
                104 or PCQ: Remove a served customer.
                105 or VCS: View Customers Sorted in alphabetical order.
                106 or SPD: Store Program Data into file.
                107 or LPD: Load Program Data from file.
                108 or STK: View Remaining burgers Stock.
                109 or AFS: Add burgers to Stock.
                110 or IfQ: get income Queues.
                112 or GUI: See GUI.
                999 or EXT: Exit the Program.
                """);
    }

    private static boolean isQueueEmpty(int cashierIndex) {
        for (int i = 0; i < Queue_capacity[cashierIndex]; i++) {
            if (queues[cashierIndex][i].equals("0")) {
                return false;
            }
        }
        return true;
    }

    private static void addCustomerToQueue() {
        try {
            System.out.print("Enter the first name: ");
            String firstName = input.nextLine();

            System.out.print("Enter the last name: ");
            String lastName = input.nextLine();

            System.out.print("Enter the number of burgers required: ");
            int numOfBurgers = input.nextInt();
            input.nextLine();

            if (numOfBurgers > 50) {
                System.out.println("You can't sell that order!");
                return;
            }

            System.out.print("Enter the cashier number (1-" + Num_of_cashiers + "): ");
            int cashierIndex = input.nextInt() - 1;
            input.nextLine();

            if (cashierIndex >= 0 && cashierIndex < Num_of_cashiers) {
                if (!isQueueFull(cashierIndex)) {
                    for (int i = 0; i < Queue_capacity[cashierIndex]; i++) {
                        if (queues[cashierIndex][i].equals("X")) {
                            queues[cashierIndex][i] = "0";

                            Customer c = new Customer(firstName, lastName, numOfBurgers);
                            FoodQueue q = new FoodQueue(c, cashierIndex + 1, i + 1);
                            foodqueues.add(q);



                            System.out.println( firstName+" "+ lastName+" "+"Customer added to Queue " + (cashierIndex + 1));
                            return;
                        }


                    }
                } else {
                    if (isAllQueuesFull()) {
                        System.out.println("All queues are full. Adding customer to the waiting list...");
                        Customer c = new Customer(firstName, lastName, numOfBurgers);
                        waitingList.add(c);
                        System.out.println( firstName+" "+lastName+"Customer added to the waiting list.");
                    } else {
                        System.out.println("Queue " + (cashierIndex + 1) + " is full.");
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Invalid input. Please try again.");
        }
    }



    private static boolean isQueueFull(int cashierIndex) {         //search is queue is full or not
        for (int i = 0; i < queues[cashierIndex].length; i++) {
            if (queues[cashierIndex][i].equals("X")) {
                return false;
            }
        }
        return true;
    }

    private static boolean isAllQueuesFull() {    //search all queues are full or not
        for (int i = 0; i < Num_of_cashiers; i++) {
            if (!isQueueFull(i)) {
                return false;
            }
        }
        return true;
    }

    private static void removeCustomerFromQueue() {
        try {
            System.out.print("Enter the cashier number (1-" + Num_of_cashiers + "): ");
            int cashierIndex = input.nextInt() - 1;
            input.nextLine();

            if (cashierIndex >= 0 && cashierIndex < Num_of_cashiers) {
                if (!isQueueEmpty(cashierIndex)) {
                    System.out.print("Enter the position of the customer to remove (1-" + Queue_capacity[cashierIndex] + "): ");
                    int position = input.nextInt() - 1;
                    input.nextLine();

                    if (position >= 0 && position < Queue_capacity[cashierIndex]) {
                        if (queues[cashierIndex][position].equals("0")) {
                            String removedCustomer = queues[cashierIndex][position];
                            queues[cashierIndex][position] = "X";
                            System.out.println("Customer " + removedCustomer+ " removed from Queue " + (cashierIndex + 1));
                            checkWaitingList(cashierIndex);
                        } else {
                            System.out.println("No customer at the specified position.");
                        }
                    } else {
                        System.out.println("Invalid position.");
                    }
                } else {
                    System.out.println("Queue " + (cashierIndex + 1) + " is empty.");
                }
            }
        } catch (Exception e) {
            System.out.println("Invalid input. Please try again.");
        }
    }

    private static void removeServedCustomer() {
        try {
            System.out.print("Enter the cashier number (1-" + Num_of_cashiers + "): ");
            int cashierIndex = input.nextInt() - 1;
            input.nextLine();

            if (cashierIndex >= 0 && cashierIndex < Num_of_cashiers) {
                if (!isQueueEmpty(cashierIndex)) {
                    for (int i = 0; i < Queue_capacity[cashierIndex]; i++) {
                        if (queues[cashierIndex][i].equals("0")) {
                            String removedCustomer = queues[cashierIndex][i];
                            queues[cashierIndex][i] = "X";


                            Customer servedCustomer = null;
                            for (int j = 0; j < foodqueues.size(); j++) { //find the remove customer foodqueues list
                                FoodQueue list = foodqueues.get(j);
                                if (list.getCashierIndex() == cashierIndex + 1 && list.getPosition() == i + 1) {
                                    servedCustomer = list.getCustomer();
                                    foodqueues.remove(j);
                                    break;
                                }
                            }

                            if (servedCustomer != null) {
                                int numOfBurgers = servedCustomer.getNumOfBurgers();
                                updateStock(-numOfBurgers);          //update stock
                                checkStockWarning();
                                System.out.println("Customer " + removedCustomer + " removed from Queue " + (cashierIndex + 1));
                                checkWaitingList(cashierIndex);
                            } else {
                                System.out.println("No customer found at the specified position.");
                            }
                            return;
                        }
                    }
                } else {
                    System.out.println("Queue " + (cashierIndex + 1) + " is empty.");
                }
            }
        } catch (Exception e) {
            System.out.println("Invalid input. Please try again.");
        }
    }


    private static void viewCustomersSorted() {
        try {
            int n = foodqueues.size();
            ArrayList<String> customerNames = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                customerNames.add(foodqueues.get(i).getCustomer().getFullName());
            }

            customerNames.sort(String::compareTo);

            System.out.println("Sorted Customer List:");
            for (String name : customerNames) {
                System.out.println(name);
            }
        } catch (Exception e) {
            System.out.println("Something went wrong!!!!!!!!!!");
        }
    }

    private static void storeProgramData() {     // store data to file
        try {
            FileWriter fileWriter = new FileWriter("cashiers.txt");
            for (String[] cashier : queues) {
                for (String queue : cashier) {
                    fileWriter.write(queue + ',');
                }
                fileWriter.write("\n");
            }
            System.out.println("Data successfully saved!");
            fileWriter.close();
        } catch (IOException e) {
            System.out.println("An error occurred. Unable to store data.");
        }
    }

    private static void loadProgramData() {      //load file
        try {
            Scanner cashier = new Scanner(new FileReader("cashiers.txt"));

            for (int i = 0; i < 3; i++) {
                String data = cashier.nextLine();
                String[] temp = data.split(",");
                for (int j = 0; j < temp.length; j++) {
                    queues[i][j] = temp[j];
                }
            }
            cashier.close();
            System.out.println("!!!!!Data loaded successfully!!!!");
        } catch (Exception e) {
            System.out.println("!!!!!!!!!Error loading file:");
            System.out.println(e.getMessage());
        }
    }

    private static void viewRemainingStock() {
        System.out.println("#Remaining burgers in stock: " + stock[0]);
    }

    private static void addBurgersToStock() {
        try {
            System.out.print("Enter the number of burgers to add: ");
            int burgersToAdd = input.nextInt();
            input.nextLine();

            if (Maximum_stock - stock[0] >= burgersToAdd) {
                updateStock(burgersToAdd);
                System.out.println("Added " + burgersToAdd + " burgers to stock.");
            } else {
                System.out.println("!!!!!!!!You can't add that many burgers. Maximum stock limit reached.!!!!");
            }
        } catch (Exception e) {
            System.out.println("--------Invalid input. Please try again.--------");
        }
    }

    private static void updateStock(int burgers) {  //update stock
        stock[0] += burgers;

    }

    private static void viewIncomeOfQueues() {   //view all income of each queues
        int[] incomes = new int[Num_of_cashiers];

        for (FoodQueue queue : foodqueues) {
            int cashierIndex = queue.getCashierIndex() - 1;
            int numOfBurgers = queue.getCustomer().getNumOfBurgers();
            int income = numOfBurgers * BURGER_PRICE;
            incomes[cashierIndex] += income;
        }

        System.out.println("Income of each queue:");
        for (int i = 0; i < Num_of_cashiers; i++) {
            System.out.println("Queue " + (i + 1) + ": " + incomes[i] + " Rs.");
        }
    }

    private static void checkStockWarning() {    //check warning
        if (stock[0] <= Warning_Stock) {
            System.out.println("Warning: Remaining stock is " + stock[10] + " burgers.");
        }
    }

    private static void checkWaitingList(int cashierIndex) {        //check waiting queue
        if (!waitingList.isEmpty()) {
            Customer nextCustomer = waitingList.poll();
            for (int i = 0; i < Queue_capacity[cashierIndex]; i++) {
                if (queues[cashierIndex][i].equals("X")) {
                    queues[cashierIndex][i] = "0";
                    foodqueues.add(new FoodQueue(nextCustomer, cashierIndex + 1, i + 1));
                    System.out.println("Customer " + nextCustomer.getFullName() + " from the waiting list added to Queue " + (cashierIndex + 1));
                    return;
                }
            }
        }
    }

    public static void runGUI(){    //method of run gui

        HelloApplication.launch();
    }


}
