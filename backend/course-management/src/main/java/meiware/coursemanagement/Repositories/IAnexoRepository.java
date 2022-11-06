package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.Anexo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAnexoRepository extends CrudRepository<Anexo, Long> {
}
