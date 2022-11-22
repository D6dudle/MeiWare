package meiware.coursemanagement.Repositories.JPA;

import meiware.coursemanagement.Entities.JPA.AnexoRef;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAnexoRefRepository extends CrudRepository<AnexoRef, Long> {
}
