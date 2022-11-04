package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.Utilizador;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IGestorRepository {
    List<Utilizador> getGestores();
}
