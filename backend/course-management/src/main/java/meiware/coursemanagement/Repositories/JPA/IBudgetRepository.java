package meiware.coursemanagement.Repositories.JPA;

import meiware.coursemanagement.Entities.JPA.Budget;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBudgetRepository extends CrudRepository<Budget, Long> {
}