package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.JPA.Utilizador;
import meiware.coursemanagement.Services.JPA.IPedidoFormacaoService;
import meiware.coursemanagement.Services.JPA.IUtilizadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//TODO: corrigir returns

@RestController
@RequestMapping("/api/utilizador")
public class UtlizadorController {

    @Autowired
    IUtilizadorService utilizadorService;

    @GetMapping(value = "/utilizadores")
    public ResponseEntity<?> getUtilizadores() {

        try{
            utilizadorService.getUtilizadores();
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/colaboradores")
    public ResponseEntity<?> getColaboradores() {

        try{
            utilizadorService.getColaboradores();
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/gestores")
    public ResponseEntity<?> getGestores() {

        try{
            utilizadorService.getGestores();
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/administradores")
    public ResponseEntity<?> getAdministradores() {

        try{
            utilizadorService.getAdministradores();
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/managedUtilizadores")
    public ResponseEntity<?> getManagedUtilizadores(@RequestBody Utilizador manager) {

        try{
            //TODO: perguntar ao Jordão se não deve ser managerId
            utilizadorService.getManagedUtilizadores(manager);
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/utilizadorById")
    public ResponseEntity<?> getUtilizadorById(@RequestBody Long id) {

        try{
            utilizadorService.getUtilizadorById(id);
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/utilizadorByEmail")
    public ResponseEntity<?> getUtilizadorByEmail(@RequestBody String email) {

        try{
            utilizadorService.getUtilizadorByEmail(email);
        }catch(Exception e){

        }

        return null;
    }

    @PostMapping(value = "/createUtilizador")
    public ResponseEntity<?> createUtilizador(@RequestBody Utilizador newUtilizador) {

        try{
            utilizadorService.createUtilizador(newUtilizador);
        }catch(Exception e){

        }

        return null;
    }

    @PutMapping(value = "/updateUtilizador")
    public ResponseEntity<?> updateUtilizador(@RequestBody Utilizador updatedUtilizador) {

        try{
            utilizadorService.updateUtilizador(updatedUtilizador);
        }catch(Exception e){

        }

        return null;
    }

    @DeleteMapping(value = "/removeUtilizador")
    public ResponseEntity<?> removeUtilizador(@RequestBody Utilizador utilizador) {

        try{
            //TODO: perguntar ao Jordão se não deve ser utilizadorId
            utilizadorService.removeUtilizador(utilizador);
        }catch(Exception e){

        }

        return null;
    }
}



/*

    void removeUtilizador(Utilizador utilizador);
*
*/