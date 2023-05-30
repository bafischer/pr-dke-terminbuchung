package dke.terminbuchung.controller;


import dke.terminbuchung.entity.BookedAppointment;
import dke.terminbuchung.service.BookedAppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


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
        return service.getBookedAppointments();
    }

    @PutMapping("/booked-appointments/{id-tv}")
    public ResponseEntity<String> setDeletedFlagBookedApp(@PathVariable (value = "id-tv")
                                                      int bookedAppIdTVerw)  {
        if (bookedAppIdTVerw <= 0) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(service.deleteBookedApp(bookedAppIdTVerw));
        }
    }

    @GetMapping("/counties/{name-county}/nr-persons-medication")
    public int getNrOfPersBookedAppMedication(@PathVariable (value = "name-county") String nameCounty)  {

        return service.getNrOfPersBookedAppForASpecialCounty(nameCounty);
    }







}
