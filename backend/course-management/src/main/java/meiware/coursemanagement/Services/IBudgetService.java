package meiware.coursemanagement.Services;

import meiware.coursemanagement.JPA.Budget;

import java.util.List;

public interface IBudgetService {
    List<Budget> getBudgets();
    Budget getBudgetById(Long id);
    Budget createBudget(Budget newBudget);
    void updateBudget(Budget updatedBudget);
    void removeBudget(Budget budget);
}
