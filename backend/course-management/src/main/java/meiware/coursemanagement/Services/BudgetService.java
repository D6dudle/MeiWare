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

    @Override
    public List<Budget> getBudgets() {
        List<Budget> budgets = new ArrayList<>();

        try {
            for (Budget b: budgetRepository.findAll()) {
                budgets.add(b);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return budgets;
    }

    @Override
    public Budget getBudgetById(Long id) {
        Budget budget = null;

        try {
            budget = budgetRepository.findById(id).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return budget;
    }

    @Override
    public Budget createBudget(Budget newBudget) {
        try {
            return budgetRepository.save(newBudget);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void updateBudget(Budget updatedBudget) {
        try {
            budgetRepository.save(updatedBudget);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removeBudget(Budget budget) {
        try {
            budgetRepository.delete(budget);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
