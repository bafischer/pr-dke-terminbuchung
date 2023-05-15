package dke.terminbuchung.service;

import dke.terminbuchung.repository.PersonRepository;
import dke.terminbuchung.entity.Person;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class PersonService {

    private static final List<String> COUNTIES_VALID = Arrays.asList
            (new String[]{"Braunau","Eferding","Freistadt","Gmunden","Grieskirchen","Kirchdorf",
                    "Linz-Land","Perg","Ried","Rohrbach","Schärding","Steyr-Land",
                    "Urfahr-Umgebung","Vöcklabruck","Wels-Land","Wels-Stadt","Steyr-Stadt","Linz-Stadt"});

    @Autowired
    private PersonRepository repository;

    public List<Person> getPersons() {
        return repository.findAll();
    }

    public String deletePerson(int id) {
        Optional<Person> c = repository.findById(id);
        if (c.isPresent()) {
            repository.deleteById(id);
            return "Person deleted: " + id;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"This id does not exist");
        }

    }

    public Person saveNewPerson(Person person) {
        Optional<Person> p = repository.findPersonBySvnr(person.getSvnr());
        Optional<Person> p1 = repository.findById(person.getId());
        if (!(person.getSvnr().matches("[0-9]+") && person.getSvnr().length() == 10)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "SVNR is not valid");
        } else if (!COUNTIES_VALID.contains(person.getCounty())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid County-name");
        } else if (p.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This person or id does already exist");
        } else if (!p.isPresent() && !p1.isPresent()) {
            return repository.save(person);
        } else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Anything else");
    }



    public Person getPersonBySvnr(String svnr) {
        Optional<Person> c = repository.findPersonBySvnr(svnr);
        if (c.isPresent()) {
            return repository.findPersonBySvnr(svnr).orElse(null);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"A person, identified by this svnr does not exist");
        }
    }




}
