package com.example.javafxgui;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.ResourceBundle;

public class MainMenuController implements Initializable {
    @FXML
    private Label queue1;
    @FXML
    private Label queue2;
    @FXML
    private Label queue3;
    @FXML
    private Label queue4;
    @FXML
    private Label queue5;
    @FXML
    private Label queue6;
    @FXML
    private Label queue7;
    @FXML
    private Label queue8;
    @FXML
    private Label queue9;
    @FXML
    private Label queue10;
    @FXML
    private TableView<Customer> customerDetails;
    @FXML
    private TableColumn<Customer, String> firstNameColumn1;
    @FXML
    private TableColumn<Customer, String> secondNameColumn1;
    @FXML
    private TableColumn<Customer, Integer> queueNumberColumn;
    @FXML
    private TableView<Customer> customerDetailsWaiting;
    @FXML
    private TableColumn<Customer, String> firstNameColumn2;
    @FXML
    private TableColumn<Customer, String> secondNameColumn2;

    static ObservableList<Customer> customerObservableListWaiting = FXCollections.observableArrayList();
    static ObservableList<Customer> customerObservableList = FXCollections.observableArrayList();

    public MainMenuController(Label queue1, Label queue2, Label queue3, Label queue4, Label queue5, Label queue6, Label queue7, Label queue8, Label queue9, Label queue10, TableView<Customer> customerDetails, TableColumn<Customer, String> firstNameColumn1, TableColumn<Customer, String> secondNameColumn1, TableColumn<Customer, Integer> queueNumberColumn, TableView<Customer> customerDetailsWaiting, TableColumn<Customer, String> firstNameColumn2, TableColumn<Customer, String> secondNameColumn2) {
        this.queue1 = queue1;
        this.queue2 = queue2;
        this.queue3 = queue3;
        this.queue4 = queue4;
        this.queue5 = queue5;
        this.queue6 = queue6;
        this.queue7 = queue7;
        this.queue8 = queue8;
        this.queue9 = queue9;
        this.queue10 = queue10;
        this.customerDetails = customerDetails;
        this.firstNameColumn1 = firstNameColumn1;
        this.secondNameColumn1 = secondNameColumn1;
        this.queueNumberColumn = queueNumberColumn;
        this.customerDetailsWaiting = customerDetailsWaiting;
        this.firstNameColumn2 = firstNameColumn2;
        this.secondNameColumn2 = secondNameColumn2;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        addCustomersToObservableList(Main. foodqueues , customerObservableList);


        firstNameColumn1.setCellValueFactory(new PropertyValueFactory<>("firstName"));
        secondNameColumn1.setCellValueFactory(new PropertyValueFactory<>("last name"));
        queueNumberColumn.setCellValueFactory(new PropertyValueFactory<>("Number of burgers"));
        customerDetails.setItems(customerObservableList);


        firstNameColumn2.setCellValueFactory(new PropertyValueFactory<>("first name"));
        secondNameColumn2.setCellValueFactory(new PropertyValueFactory<>("last name"));
        customerDetailsWaiting.setItems(customerObservableListWaiting);
    }

    public static void addCustomersToObservableList(ArrayList<FoodQueue> customerList, ObservableList<Customer> observableList){
        for(FoodQueue customer:customerList){
            String firstName = customer.getFirstName();
            String lastName = customer.getlastName();
            int NumberOfBurgers = customer.getNumOfBurgers();
            observableList.add(new Customer(firstName, lastName, NumberOfBurgers));
        }
}
}


