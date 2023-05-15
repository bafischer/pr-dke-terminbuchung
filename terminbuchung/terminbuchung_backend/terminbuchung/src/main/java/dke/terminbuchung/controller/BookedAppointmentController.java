package dke.terminbuchung.controller;


import dke.terminbuchung.entity.BookedAppointment;
import dke.terminbuchung.entity.Person;
import dke.terminbuchung.service.BookedAppointmentService;
import dke.terminbuchung.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "*")
public class BookedAppointmentController {

    @Autowired
    private BookedAppointmentService service;

    @PostMapping("/booked-appointments")
    public ResponseEntity<BookedAppointment> addPerson(@RequestBody BookedAppointment bApp)  {
        return ResponseEntity.ok(service.saveNewBookedApp(bApp));
    }

    @GetMapping("/booked-appointments")
    public List<BookedAppointment> findAllBookedAppointments() {
        List<BookedAppointment> listBookedApp =  service.getBookedAppointments();
        return listBookedApp;
    }

    @DeleteMapping("/booked-appointments/{id}")
    public ResponseEntity<String> deleteBookedApp(@PathVariable (value = "id") int bookedAppId)  {
        if (bookedAppId <= 0) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(service.deleteBookedApp(bookedAppId));
        }
    }

    @GetMapping("/counties/{name-county}/nr-persons-medication")
    public int getNrOfPersBookedAppMedication(@PathVariable (value = "name-county") String nameCounty)  {
        return service.getNrOfPersBookedAppForASpecialCounty(nameCounty);
    }







}
