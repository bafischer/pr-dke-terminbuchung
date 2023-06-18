package dke.terminbuchung;

import dke.terminbuchung.entity.BookedAppointment;
import dke.terminbuchung.entity.Person;
import dke.terminbuchung.repository.BookedAppointmentRepository;
import dke.terminbuchung.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import java.util.Optional;

import java.sql.Date;


@SpringBootApplication
public class TerminbuchungApplication implements CommandLineRunner {

	@Autowired
	private PersonRepository personRepository;

	@Autowired
	private BookedAppointmentRepository bookedAppointmentRepository;

	public static void main(String[] args) {
		SpringApplication.run(TerminbuchungApplication.class, args);
	}

	public void run(String... args) throws Exception {
		// Cleanup database tables.
		personRepository.deleteAll();
		bookedAppointmentRepository.deleteAll();

		String dateString1 = String.format("%d-%02d-%02d", 1980, 1, 1);
		Date d1 = Date.valueOf(dateString1);

		String dateString2 = String.format("%d-%02d-%02d", 1968, 11, 15);
		Date d2 = Date.valueOf(dateString2);


		Person p1 = new Person("1234010180", "Silke", "Stockhammer", d1,
				"ss@gmx.at", "0699/1235687",
				"Biergasse 9", 4616, "Bergern", "Wels-Land");
		personRepository.save(p1);
		Optional<Person> p1g = personRepository.findPersonBySvnr(p1.getSvnr());
		if (p1g.isPresent()) {
			BookedAppointment ba1 = new BookedAppointment("01.06.2023, 08:30:00", p1g.get(), "Rathaus Marchtrenk",
					1, "medication", "Remdesivir", 250,false);
			bookedAppointmentRepository.save(ba1);
		}

		Person p2 = new Person("1957151168", "Werner", "Gruber", d2,
				"wg@gmx.at", "0699/1235687",
				"Hauptstraße 10", 4611, "Buchkirchen", "Wels-Land");
		personRepository.save(p2);
		Optional<Person> p2g = personRepository.findPersonBySvnr(p2.getSvnr());
		if (p2g.isPresent()) {
			BookedAppointment ba2 = new BookedAppointment("03.06.2023, 16:00:00", p2g.get(), "Rathaus Marchtrenk",
					1, "medication", "Remdesivir", 300,false);
			bookedAppointmentRepository.save(ba2);
		}

	}


}
