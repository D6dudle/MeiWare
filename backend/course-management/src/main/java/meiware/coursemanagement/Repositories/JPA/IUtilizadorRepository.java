package meiware.coursemanagement.Repositories.JPA;

import meiware.coursemanagement.Entities.JPA.Utilizador;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUtilizadorRepository extends CrudRepository<Utilizador, Long> {
    List<Utilizador> findAllByOrderByNomeAsc();
    Utilizador findByEmail(String email);
    List<Utilizador> findAllByManager(Utilizador manager);
    Boolean existsByEmail(String email);
}
