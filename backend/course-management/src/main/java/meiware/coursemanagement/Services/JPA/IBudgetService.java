package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.Budget;

import java.util.List;

public interface IBudgetService {
    List<Budget> getBudgets();
    List<Budget> getBudgetByUserId(Long id);
    Budget getBudgetById(Long id);
    Budget createBudget(Budget newBudget);
    void updateBudget(Budget updatedBudget);
    void removeBudget(Budget budget);
}
