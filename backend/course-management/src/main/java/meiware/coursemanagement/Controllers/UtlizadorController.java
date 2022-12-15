package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.JPA.Utilizador;
import meiware.coursemanagement.Services.JPA.IPedidoFormacaoService;
import meiware.coursemanagement.Services.JPA.IUtilizadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//TODO: corrigir returns

@RestController
@RequestMapping("/api/utilizador")
public class UtlizadorController {

    @Autowired
    IUtilizadorService utilizadorService;

    @GetMapping(value = "/utilizadores")
    public ResponseEntity<?> getUtilizadores() {
        System.out.println("/utilizadores");
        try{
            utilizadorService.getUtilizadores();
        }catch(Exception e){

        }

        return null;
    }

    @GetMapping(value = "/colaboradores")
    @PreAuthorize("hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getColaboradores() {
        List<Utilizador> listaUtilizadores;

        try{
            listaUtilizadores = utilizadorService.getColaboradores();
            return new ResponseEntity<>(
                    listaUtilizadores,
                    HttpStatus.OK);
            //System.out.println("First user: " + listaUtilizadores.get(0).toJSON());
        }catch(Exception e){
            System.out.println("Exception: " + e.getMessage());
            return new ResponseEntity<>(
                    "Erro ao aceder aos colaboradores.",
                    HttpStatus.OK);
        }

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