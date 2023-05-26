package dke.terminbuchung.repository;

import dke.terminbuchung.entity.BookedAppointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface BookedAppointmentRepository extends JpaRepository<BookedAppointment, Integer>,
        JpaSpecificationExecutor<BookedAppointment> {

    Optional<BookedAppointment> findBookedAppointmentByNameLocationAndLineAndDate
            (String nameLocation, int line, String  date );

    Optional<BookedAppointment> findBookedAppointmentByNameLocation
            (String nameLocation);

}
