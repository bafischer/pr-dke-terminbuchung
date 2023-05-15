package dke.terminbuchung.repository;

import dke.terminbuchung.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Integer> {

    Optional<Person> findPersonBySvnr(String svnr);

}
