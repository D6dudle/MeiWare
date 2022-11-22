package meiware.coursemanagement.Repositories.JPA;

import meiware.coursemanagement.Entities.JPA.Anexo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAnexoRepository extends CrudRepository<Anexo, String> {
}
