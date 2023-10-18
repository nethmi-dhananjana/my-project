package com.example.javafxgui;




class FoodQueue {
    private Customer customer;
    private int cashierIndex;
    private int position;

    public FoodQueue(Customer customer, int cashierIndex, int position) {
        this.customer = customer;
        this.cashierIndex = cashierIndex;
        this.position = position;
    }

    public Customer getCustomer() {
        return customer;
    }

    public int getCashierIndex() {
        return cashierIndex;
    }

    public int getPosition() {
        return position;
    }


    public String getFirstName() {
        return getFirstName();
    }

    public String getlastName() {
        return getlastName();
    }


    public int getNumOfBurgers() {
        return getNumOfBurgers();
    }
}