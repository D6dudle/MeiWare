package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.JPA.Utilizador;
import meiware.coursemanagement.Services.JPA.IPedidoFormacaoService;
import meiware.coursemanagement.Services.JPA.IUtilizadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//TODO: corrigir returns

@RestController
@RequestMapping("/api/utilizador")
public class UtlizadorController {

    @Autowired
    IUtilizadorService utilizadorService;

    @GetMapping(value = "/getUtilizadores")
    public ResponseEntity<?> getUtilizadores() {

        try{
            utilizadorService.getUtilizadores();
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/getColaboradores")
    public ResponseEntity<?> getColaboradores() {

        try{
            utilizadorService.getColaboradores();
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/getGestores")
    public ResponseEntity<?> getGestores() {

        try{
            utilizadorService.getGestores();
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/getAdministradores")
    public ResponseEntity<?> getAdministradores() {

        try{
            utilizadorService.getAdministradores();
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/getManagedUtilizadores")
    public ResponseEntity<?> getManagedUtilizadores(@RequestBody Utilizador manager) {

        try{
            //TODO: perguntar ao Jordão se não deve ser managerId
            utilizadorService.getManagedUtilizadores(manager);
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/getUtilizadorById")
    public ResponseEntity<?> getUtilizadorById(@RequestBody Long id) {

        try{
            utilizadorService.getUtilizadorById(id);
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/getUtilizadorByEmail")
    public ResponseEntity<?> getUtilizadorByEmail(@RequestBody String email) {

        try{
            utilizadorService.getUtilizadorByEmail(email);
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/createUtilizador")
    public ResponseEntity<?> createUtilizador(@RequestBody Utilizador newUtilizador) {

        try{
            utilizadorService.createUtilizador(newUtilizador);
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/updateUtilizador")
    public ResponseEntity<?> updateUtilizador(@RequestBody Utilizador updatedUtilizador) {

        try{
            utilizadorService.updateUtilizador(updatedUtilizador);
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/removeUtilizador")
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