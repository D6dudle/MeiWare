package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.JPA.PedidoAprovado;
import meiware.coursemanagement.Entities.JPA.PedidoFormacao;
import meiware.coursemanagement.Entities.JPA.PedidoRejeitado;
import meiware.coursemanagement.Entities.JPA.Utilizador;
import meiware.coursemanagement.Services.JPA.IPedidoFormacaoService;
import meiware.coursemanagement.Services.MongoDB.IAnexoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//FormacaoAprovadaController
//FormacaoRejeitadaController
//PedidoFormacaoController
@RestController
@RequestMapping("/api/formacao")
public class FormacaoController {

    @Autowired
    IPedidoFormacaoService pedidoFormacaoService;

    //TODO: perguntar ao Jordão como é que ele vai tratar da aceitação/recusa das formações
    //TODO: corrigir returns

    @GetMapping(value = "/pedidosFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPedidosFormacao() {

        try{
            List<PedidoFormacao> pedidosFormacaoList = pedidoFormacaoService.getPedidosFormacao();
            return new ResponseEntity<>(
                    pedidosFormacaoList,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/formacoesAprovadas")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getFormacoesAprovadas() {

        try{
            List<PedidoAprovado> pedidosAprovadosList = pedidoFormacaoService.getFormacoesAprovadas();
            return new ResponseEntity<>(
                    pedidosAprovadosList,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações aprovados.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/formacoesRejeitadas")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getFormacoesRejeitadas() {

        try{

            List<PedidoRejeitado> pedidosRejeitadosList = pedidoFormacaoService.getFormacoesRejeitadas();
            return new ResponseEntity<>(
                    pedidosRejeitadosList,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações rejeitados.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //TODO: fiquei aqui

    @GetMapping(value = "/fedidosFormacaoByUtilizador")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPedidosFormacaoByUtilizador(@RequestBody Utilizador utilizador) {

        try{
            //TODO: PErguntar ao Jordão porque se não faz mais sentido por userId?
            pedidoFormacaoService.getPedidosFormacaoByUtilizador(utilizador);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }

    @GetMapping(value = "/pedidoFormacaoById")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPedidoFormacaoById(@RequestBody Long id) {

        try{
            pedidoFormacaoService.getPedidoFormacaoById(id);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }

    @GetMapping(value = "/pedidoFormacaoByNome")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPedidoFormacaoByNome(@RequestBody String nome) {

        try{
            pedidoFormacaoService.getPedidoFormacaoByNome(nome);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }

    @PostMapping (value = "/createPedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> createPedidoFormacao(@RequestBody PedidoFormacao pedidoFormacao) {

        try{
            //pedidoFormacaoService.createPedidoFormacao(pedidoFormacao);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }

    @PutMapping (value = "/updatePedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> updatePedidoFormacao(@RequestBody PedidoFormacao pedidoFormacao) {

        try{
            pedidoFormacaoService.updatePedidoFormacao(pedidoFormacao);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }

    @DeleteMapping(value = "/removePedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> removePedidoFormacao(@RequestBody PedidoFormacao pedidoFormacao) {

        try{
            pedidoFormacaoService.removePedidoFormacao(pedidoFormacao);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }
}


