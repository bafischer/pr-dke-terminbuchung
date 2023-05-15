package dke.terminbuchung.specification;

import dke.terminbuchung.entity.BookedAppointment;
import dke.terminbuchung.entity.Person;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class BookedAppointmentSpecification {

    public static Specification<BookedAppointment> countyNrOfPersBookedMedication(String county) {
        return (root, query, criteriaBuilder) -> {
            Join<Person, BookedAppointment> personBookedAppointmentJoin = root.join("person");
            return criteriaBuilder.equal(personBookedAppointmentJoin.get("county"),county);
        };
    }
}
