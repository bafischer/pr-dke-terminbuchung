package dke.terminbuchung.controller;

import dke.terminbuchung.entity.Person;
import dke.terminbuchung.service.PersonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "*")
public class PersonController {


    @Autowired
    private PersonService service;


    //Neue Person in DB hinzufügen
    @PostMapping("/persons")
    public ResponseEntity<Person> addPerson(@RequestBody Person person)  {
        return ResponseEntity.ok(service.saveNewPerson(person));
    }

    //Abfrage aller in der DB erfassten Personen
    @GetMapping("/persons")
    public List<Person> findAllPerson() {
        List<Person> listPersons =  service.getPersons();
        return listPersons;
    }



    //Abfrage einer in der DB erfassten Person und Identifikation mittels eindeutiger SVNR
    @GetMapping("/persons/{svnr}")
    public Person getPersonById(@PathVariable (value = "svnr") String svnr)  {
        return service.getPersonBySvnr(svnr);
    }



}
