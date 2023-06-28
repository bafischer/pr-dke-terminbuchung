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

		// Check if the appointments are already in the database
		Person p1 = new Person();
		Person p3 = new Person();
		Person p4 = new Person();
		Optional<Person> p1g = null;
		Optional<Person> p3g = null;
		Optional<Person> p4g = null;

		if(personRepository.count() == 0) {
			// Create dummy data
			String dateString1 = String.format("%d-%02d-%02d", 1980, 1, 1);
			Date d1 = Date.valueOf(dateString1);

			String dateString3 = String.format("%d-%02d-%02d", 1955, 1, 20);
			Date d3 = Date.valueOf(dateString3);

			String dateString4 = String.format("%d-%02d-%02d", 1961,12, 25);
			Date d4 = Date.valueOf(dateString4);


			p1 = new Person("1234010180", "Silke", "Stockhammer", d1,
					"ss@gmx.at", "0699/1235687",
					"Biergasse 9", 4616, "Bergern", "Wels-Land");
			personRepository.save(p1);
			p1g = personRepository.findPersonBySvnr(p1.getSvnr());


			p3 = new Person("1234200155", "Maria", "Berger", d3,
					"m.berger@gmx.at", "0699/1235687",
					"Hauptstraße 5a", 4060, "Leonding", "Linz-Land");
			personRepository.save(p3);
			p3g = personRepository.findPersonBySvnr(p3.getSvnr());

			p4 = new Person("1234251261", "Karl", "Baumgartner", d4,
					"k.baumgartner@gmx.at", "0699/9876581",
					"Hauptstraße 50", 4615, "Marchtrenk", "Wels-Land");
			personRepository.save(p4);
			p4g = personRepository.findPersonBySvnr(p4.getSvnr());
		}

		if (bookedAppointmentRepository.count() == 0) {

			if (p4g.isPresent()) {
				BookedAppointment ba3 = new BookedAppointment("28.06.2023, 18:00:00", p4g.get(),
						"Rathaus Marchtrenk",
						2, "medication", "Molnupiravir", 3,false);
				bookedAppointmentRepository.save(ba3);
			}

			if (p3g.isPresent()) {
				BookedAppointment ba4 = new BookedAppointment("30.06.2023, 19:00:00", p3g.get(),
						"Linzer Markt",
						1, "vaccination", "Vaxzevria (AstraZeneca)", 6,false);
				bookedAppointmentRepository.save(ba4);
			}



		}



	}


}
