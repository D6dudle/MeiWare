package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.Budget;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBudgetRepository extends CrudRepository<Budget, Long> {
}