package dke.terminbuchung.repository;

import dke.terminbuchung.entity.BookedAppointment;
import dke.terminbuchung.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

public interface BookedAppointmentRepository extends JpaRepository<BookedAppointment, Integer>,
        JpaSpecificationExecutor<BookedAppointment> {

    Optional<BookedAppointment> findBookedAppointmentByNameLocationAndLineAndDateAndStartTime
            (String nameLocation, int line, LocalDate date, LocalTime startTime );

    Optional<BookedAppointment> findBookedAppointmentByNameLocation
            (String nameLocation);

}
