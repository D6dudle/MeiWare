package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.JPA.Budget;
import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Services.JPA.IBudgetService;
import meiware.coursemanagement.Services.MongoDB.IAnexoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

//TODO: corrigir returns
@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    @Autowired
    IBudgetService budgetService;

    @GetMapping(value = "/budgets")
    public ResponseEntity<?> getBudgets() {

        try{
            budgetService.getBudgets();
        }catch(Exception e){

        }

        return null;
    }


    //https://docs.spring.io/spring-framework/docs/3.0.0.M3/reference/html/ch18s02.html
    @GetMapping(value = "/budgetById")
    public ResponseEntity<?> getBudgetById(@RequestBody Long budgetId) {

        try{
            budgetService.getBudgetById(budgetId);
        }catch(Exception e){

        }

        return null;
    }


    @PostMapping(value = "/createBudget")
    public boolean createAnexo(@Valid @RequestBody Budget budget) {

        try{
            budgetService.createBudget(budget);
        }catch(Exception e){

        }

        return true;
    }

    @PutMapping(value = "/updateBudget")
    public boolean updateAnexo(@Valid @RequestBody Budget budget) {

        try{
            budgetService.updateBudget(budget);
        }catch(Exception e){

        }

        return true;
    }

    //TODO: Perguntar ao Jordão se não faz mais sentido ser por id
    @DeleteMapping(value = "/removeBudget")
    public boolean removeBudget(@Valid @RequestBody Budget budget) {

        try{
            budgetService.removeBudget(budget);
        }catch(Exception e){

        }

        return true;
    }
}


