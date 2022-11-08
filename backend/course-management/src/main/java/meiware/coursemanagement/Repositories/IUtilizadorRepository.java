package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.Utilizador;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUtilizadorRepository extends CrudRepository<Utilizador, Long> {
    Utilizador findByEmail(String email);
    List<Utilizador> findAllByManager(Utilizador manager);
}
