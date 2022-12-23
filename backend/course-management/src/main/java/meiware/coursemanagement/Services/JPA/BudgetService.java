package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.Budget;
import meiware.coursemanagement.Repositories.JPA.IBudgetRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BudgetService implements IBudgetService{

    @Autowired
    private IBudgetRepository budgetRepository;

    @Autowired
    private ModelMapper modelMapper;

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
            Budget budget = this.getBudgetById(updatedBudget.getId());
            if (budget != null) {
                modelMapper.map(updatedBudget, budget);
                budgetRepository.save(budget);
            }

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
