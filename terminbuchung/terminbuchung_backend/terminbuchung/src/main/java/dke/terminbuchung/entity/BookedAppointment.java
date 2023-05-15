package dke.terminbuchung.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table (name = "BookedAppointments")
public class BookedAppointment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookedAppointmentID;

    @Column(columnDefinition = "DATE")
    private LocalDate date;

    @Column(columnDefinition = "TIME")
    private LocalTime startTime;


    @ManyToOne(cascade = CascadeType.MERGE)
    //@JoinColumn(name = "tutorial_id", nullable = false)
    private Person person;

    private String nameLocation;

    private int line;


    private String reason;

    private LocalDateTime bookedAt;

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
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

    public LocalDateTime getBookedAt() {
        return bookedAt;
    }

    public void setBookedAt(LocalDateTime bookedAt) {
        this.bookedAt = bookedAt;
    }



    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setBookedAppointmentID(Long bookedAppointmentID) {
        this.bookedAppointmentID = bookedAppointmentID;
    }

    public Long getBookedAppointmentID() {
        return bookedAppointmentID;
    }
}
