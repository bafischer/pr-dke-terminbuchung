package dke.terminbuchung;

import dke.terminbuchung.entity.Person;
import dke.terminbuchung.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;

import java.sql.Date;
import java.time.LocalDate;

@SpringBootApplication
public class TerminbuchungApplication implements CommandLineRunner {

	@Autowired
	private PersonRepository personRepository;

	public static void main(String[] args) {
		SpringApplication.run(TerminbuchungApplication.class, args);
	}

	public void run(String... args) throws Exception {
		// Cleanup database tables.
		personRepository.deleteAll();

		String dateString1 = String.format("%d-%02d-%02d", 1968, 11, 15);
		Date d1 = Date.valueOf(dateString1);


		Person p1 = new Person("1957151168", "Wolfgang", "Hinterhölzl", d1,
				"wh@gmx.at", "0699/1235687",
				"Barockstraße 9", 4616, "Bergern", "Wels-Land");

		personRepository.save(p1);
	}


}
