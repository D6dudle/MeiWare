package meiware.coursemanagement.ServicesMock.JPA;

import meiware.coursemanagement.Entities.JPA.Budget;
import meiware.coursemanagement.Repositories.JPA.IBudgetRepository;
import meiware.coursemanagement.Services.JPA.BudgetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BudgetServiceMock{

    @Mock
    private IBudgetRepository budgetRepository;

    @InjectMocks
    private BudgetService budgetService;

    List<Budget> budgets = new ArrayList<>();

    @BeforeEach
    public void setup(){
        for(int i = 0; i < 3 ; i++){
            budgets.add(new Budget((long) i, i*500, 2020+i));
        }
    }

    @DisplayName("Junit test 11 - Teste unitário do método getBudgets de BudgetService.")
    @Test
    public void getBudgets() {
        // given - precondition or setup
        given(budgetRepository.findAll()).willReturn(budgets);

        // when - action or behavior that we are going to test
        List<Budget> budgets = budgetService.getBudgets();

        // then
        assertNotNull(budgets);
        assertEquals(budgets, this.budgets);
    }

    @DisplayName("Junit test 12 - Teste unitário do método createBudget de BudgetService.")
    @Test
    public void createBudget() {
        // given - precondition or setup
        Budget newBudget = new Budget(4l, 1000, 2030);
        given(budgetRepository.save(newBudget)).willReturn(newBudget);

        // when - action or behavior that we are going to test
        Budget budget = budgetService.createBudget(newBudget);

        // then
        assertNotNull(budget);
        assertEquals(newBudget, budget);
    }

    @DisplayName("Junit test 13 - Teste unitário do método removeBudget de BudgetService.")
    @Test
    public void removeBudget() {
        // given - precondition or setup

        // when - action or behavior that we are going to test
        budgetService.removeBudget(budgets.get(0));

        // then
        verify(budgetRepository, times(1)).delete(budgets.get(0));
    }

    @DisplayName("Junit test 22 - Teste unitário do método getBudgetById de BudgetService.")
    @Test
    public void getBudgetById() {
        // given - precondition or setup
        given(budgetRepository.findById(0l)).willReturn(Optional.ofNullable(budgets.get(0)));

        // when - action or behavior that we are going to test
        Budget budget = budgetService.getBudgetById(0l);
        Budget budgetNull = budgetService.getBudgetById(1l);

        // then
        assertNotNull(budget);
        assertEquals(budgets.get(0), budget);
        assertNull(budgetNull);
    }

    @DisplayName("Junit test 23 - Teste unitário do método updateBudget de BudgetService.")
    @Test
    public void updateBudget() {
        // given - precondition or setup
        Budget budget = budgets.get(0);
        given(budgetRepository.save(budget)).willReturn(budget);
        budget.setBudget(5000);
        budget.setAno(2002);

        // when -  action or the behaviour that we are going test
        Budget updatedBudget = budgetService.updateBudget(budget);

        // then - verify the output
        assertThat(updatedBudget.getBudget()).isEqualTo(5000);
        assertThat(updatedBudget.getAno()).isEqualTo(2002);
    }
}
