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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.BDDMockito.given;

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

}
