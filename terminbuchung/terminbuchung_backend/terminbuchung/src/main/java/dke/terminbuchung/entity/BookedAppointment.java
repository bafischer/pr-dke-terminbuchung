package dke.terminbuchung.entity;

import jakarta.persistence.*;



@Entity
@Table (name = "BookedAppointments")
public class BookedAppointment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookedAppointmentID;


    private String date;

    @ManyToOne(cascade = CascadeType.MERGE)
    private Person person;

    private String nameLocation;

    private int line;

    private String reason;

    private String article;

    private int idTerminverw;

    private boolean deleted;



    public BookedAppointment() {}

    public BookedAppointment(String date, Person person, String nameLocation, int line, String reason,
                             String article, int idTerminverw, boolean deleted) {
        this.date = date;
        this.person = person;
        this.nameLocation = nameLocation;
        this.line = line;
        this.reason = reason;
        this.article = article;
        this.idTerminverw = idTerminverw;
        this.deleted = deleted;


    }





    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public String getNameLocation() {
        return nameLocation;
    }

    public void setNameLocation(String nameLocation) {
        this.nameLocation = nameLocation;
    }

    public int getLine() {
        return line;
    }

    public void setLine(int line) {
        this.line = line;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setBookedAppointmentID(Long bookedAppointmentID) {
        this.bookedAppointmentID = bookedAppointmentID;
    }

    public Long getBookedAppointmentID() {
        return bookedAppointmentID;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    public int getIdTerminverw() {
        return idTerminverw;
    }

    public void setIdTerminverw(int idTerminverw) {
        this.idTerminverw = idTerminverw;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
