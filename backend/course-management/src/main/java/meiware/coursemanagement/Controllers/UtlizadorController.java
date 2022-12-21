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
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getUtilizadores() {

        try{
            List<Utilizador> listaUtilizadores = utilizadorService.getUtilizadores();
            return new ResponseEntity<>(
                    listaUtilizadores,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos utilizadores.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/colaboradores")
    @PreAuthorize("hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getColaboradores() {

        try{
            List<Utilizador> listaUtilizadores = utilizadorService.getColaboradores();
            return new ResponseEntity<>(
                    listaUtilizadores,
                    HttpStatus.OK);
            //System.out.println("First user: " + listaUtilizadores.get(0).toJSON());
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos colaboradores.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/gestores")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getGestores() {

        try{
            List<Utilizador> listaUtilizadores = utilizadorService.getGestores();
            return new ResponseEntity<>(
                    listaUtilizadores,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos gestores.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/administradores")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getAdministradores() {

        try{
            List<Utilizador> listaUtilizadores = utilizadorService.getAdministradores();
            return new ResponseEntity<>(
                    listaUtilizadores,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos administradores.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* Input Example:
        {
            "id": "1",
            "email": "jose@email.com",
            "nome": "José"
        }
     */
    @GetMapping(value = "/managedUtilizadores")
    public ResponseEntity<?> getManagedUtilizadores(@RequestBody Utilizador manager) {

        try{
            List<Utilizador> listaUtilizadores = utilizadorService.getManagedUtilizadores(manager);
            return new ResponseEntity<>(
                    listaUtilizadores,
                    HttpStatus.OK);
        }catch(Exception e){
            if(manager.isAdministrador())
                return new ResponseEntity<>(
                        "Erro ao aceder aos utilizadores geridos pelo administrador: " + manager.getNome() + ".",
                        HttpStatus.INTERNAL_SERVER_ERROR);
            else if(manager.isGestor())
                return new ResponseEntity<>(
                        "Erro ao aceder aos utilizadores geridos pelo gestor: " + manager.getNome() + ".",
                        HttpStatus.INTERNAL_SERVER_ERROR);
            else
                return new ResponseEntity<>(
                        "O utilizador: " + manager.getNome() + "não pode gerir utilizadores.",
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* Input Example:
        1
     */
    @GetMapping(value = "/utilizadorById")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getUtilizadorById(@RequestBody Long id) {

        try{
            Utilizador utilizador = utilizadorService.getUtilizadorById(id);
            return new ResponseEntity<>(
                    utilizador,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos utilizador.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*Input Example
        {
            "email": "jose@email.com"
        }
     */
    @GetMapping(value = "/utilizadorByEmail")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getUtilizadorByEmail(@RequestBody String email) {

        try{
            Utilizador utilizador = utilizadorService.getUtilizadorByEmail(email);
            return new ResponseEntity<>(
                    utilizador,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos utilizador.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //TODO: perguntar na reunião se deve devolver uma nova lista de utilizadores
    // ou o utilizador atualizado

    /* Input Example:
        {
            "id": "1",
            "email": "jose@email.com",
            "nome": "Jossé"
        }
     */
    @PutMapping(value = "/updateUtilizador")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> updateUtilizador(@RequestBody Utilizador updatedUtilizador) {

        try{
            utilizadorService.updateUtilizador(updatedUtilizador);
            return new ResponseEntity<>(
                    "Utilizador atualizado com sucesso",
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao atualizar o utilizador: " + updatedUtilizador.getNome(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/removeUtilizador")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> removeUtilizador(@RequestBody Utilizador utilizador) {

        try{
            utilizadorService.removeUtilizador(utilizador);
            return new ResponseEntity<>(
                    "Utilizador removido com sucesso",
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao remover o utilizador: " + utilizador.getNome(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}



/*

    void removeUtilizador(Utilizador utilizador);
*
*/