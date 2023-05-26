package dke.terminbuchung.service;

import dke.terminbuchung.entity.BookedAppointment;
import dke.terminbuchung.entity.Person;
import dke.terminbuchung.repository.BookedAppointmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import dke.terminbuchung.specification.BookedAppointmentSpecification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service
public class BookedAppointmentService {

    @Autowired
    private BookedAppointmentRepository repository;

    private static final List<String> REASONS_VALID = Arrays.asList
            (new String[]{"vaccination","medication"});

    private static final List<String> COUNTIES_VALID = Arrays.asList
            (new String[]{"Braunau","Eferding","Freistadt","Gmunden","Grieskirchen","Kirchdorf",
                    "Linz-Land","Perg","Ried","Rohrbach","Schärding","Steyr-Land",
                    "Urfahr-Umgebung","Vöcklabruck","Wels-Land","Wels-Stadt","Steyr-Stadt","Linz-Stadt"});

    public List<BookedAppointment> getBookedAppointments() {
        return repository.findAll();
    }

    public BookedAppointment getBookedAppByLocationLineDateTime(String nameLocation, int line,
                                                                String date) {
        Optional<BookedAppointment> c = repository.findBookedAppointmentByNameLocationAndLineAndDate(
                nameLocation, line, date);
        if (c.isPresent()) {
            return repository.findBookedAppointmentByNameLocationAndLineAndDate
                    (nameLocation, line, date).orElse(null);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This booked appointment does not exists.");
        }
    }

    public BookedAppointment getBookedAppByLocation(String nameLocation) {
        Optional<BookedAppointment> c = repository.findBookedAppointmentByNameLocation(nameLocation);
        if (c.isPresent()) {
            return repository.findBookedAppointmentByNameLocation(nameLocation).orElse(null);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "A location, identified by this name does not exist.");
        }
    }

    public int getNrOfPersBookedAppForASpecialCounty(String county) {
        if (!COUNTIES_VALID.contains(county)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid County-name");
        } else {
            Specification<BookedAppointment> specification =
                    BookedAppointmentSpecification.countyNrOfPersBookedMedication(county);

            List<BookedAppointment> bookedAppCounty = repository.findAll(specification);
            boolean isDupl = false;
            List<BookedAppointment> bookedAppCountyWoDupl = new ArrayList<>();
            for (BookedAppointment a : bookedAppCounty) {
                Person p = a.getPerson();
                for (BookedAppointment b : bookedAppCountyWoDupl) {
                    Person p1 = b.getPerson();
                    if (p.equals(p1)) {
                        isDupl = true;
                    }
                }
                if (!isDupl && a.getReason().equals("medication")) {
                    bookedAppCountyWoDupl.add(a);
                }
                isDupl = false;
            }

            return bookedAppCountyWoDupl.size();
        }
    }

    public String deleteBookedApp(int id) {
        Optional<BookedAppointment> c = repository.findById(id);
        if (c.isPresent()) {
            repository.deleteById(id);
            return "Booked appointment deleted: " + id;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This id does not exist.");
        }

    }

    public BookedAppointment saveNewBookedApp(BookedAppointment bookedApp) {
        /*Optional<BookedAppointment> p = repository.
                findBookedAppointmentByNameLocationAndLineAndDate(
                        bookedApp.getNameLocation(), bookedApp.getLine(),
                        bookedApp.getDate()
                );
        if (!REASONS_VALID.contains(bookedApp.getReason())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Reason-name");
        } else {
            if (!p.isPresent()) {
                return repository.save(bookedApp);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"This booked appointment does already exist");
            }
        } */
        return repository.save(bookedApp);
    }





}
