package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.Budget;

import java.util.List;

public interface IBudgetService {
    List<Budget> getBudgets();
    Budget getBudgetById(Long id);
    Budget createBudget(Budget newBudget);
    Budget updateBudget(Budget updatedBudget);
    void removeBudget(Budget budget);
}
