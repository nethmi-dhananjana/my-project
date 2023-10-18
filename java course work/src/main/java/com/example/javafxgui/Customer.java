package com.example.javafxgui;

class Customer {
    private String firstName;
    private String lastName;
    private int numOfBurgers;

    public Customer(String firstName, String lastName, int numOfBurgers) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.numOfBurgers = numOfBurgers;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public int getNumOfBurgers() {
        return numOfBurgers;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getlastName() {

        return lastName;
    }



}