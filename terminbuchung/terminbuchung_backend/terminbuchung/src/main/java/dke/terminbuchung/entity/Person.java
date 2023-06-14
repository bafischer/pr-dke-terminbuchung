package dke.terminbuchung.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.sql.Date;
import java.time.LocalDate;

@Table(name = "Persons")
@Entity
public class Person {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String svnr;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    @Temporal(TemporalType.DATE)
    private Date birthday;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String phoneNr;

    @NotNull
    private String streetAndDoorNr;

    @NotNull
    private int postalCode;

    @NotNull
    private String city;


    @NotNull
    private String county;

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Person(int id, String svnr, String firstName, String lastName, Date birthday,
                  String email, String phoneNr, String streetAndDoorNr, int postalCode,
                  String city, String county) {
        this.id = id;
        this.svnr = svnr;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.email = email;
        this.phoneNr = phoneNr;
        this.streetAndDoorNr = streetAndDoorNr;
        this.postalCode = postalCode;
        this.city = city;
        this.county = county;
    }

    public Person(String svnr, String firstName, String lastName, Date birthday,
                  String email, String phoneNr, String streetAndDoorNr, int postalCode,
                  String city, String county) {

        this.svnr = svnr;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.email = email;
        this.phoneNr = phoneNr;
        this.streetAndDoorNr = streetAndDoorNr;
        this.postalCode = postalCode;
        this.city = city;
        this.county = county;
    }


    public Person() {

    }

    public String getSvnr() {
        return svnr;
    }

    public void setSvnr(String svnr) {
        this.svnr = svnr;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return id + " - " + this.firstName + " " + this.lastName + ", " + this.svnr + ", "
                + this.getCounty() + ", "+ this.getBirthday();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNr() {
        return phoneNr;
    }

    public void setPhoneNr(String phoneNr) {
        this.phoneNr = phoneNr;
    }

    public String getStreetAndDoorNr() {
        return streetAndDoorNr;
    }

    public void setStreetAndDoorNr(String streetAndDoorNr) {
        this.streetAndDoorNr = streetAndDoorNr;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
