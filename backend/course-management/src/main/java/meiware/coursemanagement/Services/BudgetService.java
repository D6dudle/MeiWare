package meiware.coursemanagement.Services;

import meiware.coursemanagement.JPA.Budget;
import meiware.coursemanagement.Repositories.IBudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BudgetService implements IBudgetService{

    @Autowired
    private IBudgetRepository budgetRepository;
    // TODO: exception handling

    @Override
    public List<Budget> getBudgets() {
        List<Budget> budgets = new ArrayList<>();
        for (Budget b: budgetRepository.findAll()) {
            budgets.add(b);
        }

        return budgets;
    }

    @Override
    public Budget getBudgetById(Long id) {
        return budgetRepository.findById(id).orElse(null);
    }

    @Override
    public Budget createBudget(Budget newBudget) {
        return budgetRepository.save(newBudget);
    }

    @Override
    public void updateBudget(Budget updatedBudget) {
        budgetRepository.save(updatedBudget);
    }

    @Override
    public void removeBudget(Budget budget) {
        budgetRepository.delete(budget);
    }
}
