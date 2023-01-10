package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.JPA.Budget;
import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Services.JPA.IBudgetService;
import meiware.coursemanagement.Services.MongoDB.IAnexoService;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:5173/")
public class BudgetController {

    @Autowired
    IBudgetService budgetService;

    @GetMapping(value = "/budgets")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getBudgets() {

        try{
            List<Budget> budgets = budgetService.getBudgets();

            JSONArray arr = new JSONArray();
            for (Budget b : budgets){
                arr.put(b.toJSON());
            }
            return new ResponseEntity<>(
                    arr,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos valores de budgets.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //https://docs.spring.io/spring-framework/docs/3.0.0.M3/reference/html/ch18s02.html
    /* Exemplo Input
        6.0
     */
    @GetMapping(value = "/budgetByUserId")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getBudgetByUserId(@RequestParam("id") String id_str) {

        try{
            Long userId = Long.valueOf(id_str);
            List<Budget> budgetList = budgetService.getBudgetByUserId(userId);

            JSONArray arr = new JSONArray();
            for (Budget b : budgetList){
                arr.put(b.toJSON());
            }
            return new ResponseEntity<>(
                    arr,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder ao budget do utilizador.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/budgetById")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getBudgetById(@RequestParam("id") String id_str) {

        try{
            Long id = Long.valueOf(id_str);
            Budget budget = budgetService.getBudgetById(id);
            return new ResponseEntity<>(
                    budget.toJSON(),
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder ao budget do utilizador.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* Exemplo Input
        {
            "budget": 40000,
            "ano": 2024
        }
     */
    @PostMapping(value = "/createBudget")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> createBudget(@Valid @RequestBody Budget budget) {

        try{
            budgetService.createBudget(budget);
            return new ResponseEntity<>(
                    "Budget criado com sucesso.",
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao criar o budget.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* Exemplo Input
        {
            "id": 6,
            "ano": 2023,
            "budget": "20000"
        }
     */
    @PutMapping(value = "/updateBudget")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> updateBudget(@Valid @RequestBody Budget budget) {

        try{
            budgetService.updateBudget(budget);
            return new ResponseEntity<>(
                    "Budget atualizado com sucesso.",
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao atualizar o budget.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* Exemplo Input
        {
            "id": 6,
            "ano": 2023,
            "budget": "20000"
        }
     */
    @DeleteMapping(value = "/removeBudget")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> removeBudget(@Valid @RequestBody Budget budget) {

        try{
            budgetService.removeBudget(budget);
            return new ResponseEntity<>(
                    "Budget eliminado com sucesso.",
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao eliminar o budget.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


