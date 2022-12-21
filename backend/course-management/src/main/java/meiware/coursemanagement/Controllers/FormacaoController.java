package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.JPA.PedidoAprovado;
import meiware.coursemanagement.Entities.JPA.PedidoFormacao;
import meiware.coursemanagement.Entities.JPA.PedidoRejeitado;
import meiware.coursemanagement.Entities.JPA.Utilizador;
import meiware.coursemanagement.Images.PedidoFormacaoImage;
import meiware.coursemanagement.Services.JPA.IPedidoFormacaoService;
import meiware.coursemanagement.Services.MongoDB.IAnexoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping(value = "/fedidosFormacaoByUtilizador")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPedidosFormacaoByUtilizador(@RequestBody Utilizador utilizador) {

        try{
            List<PedidoFormacao> pedidosFormacao = pedidoFormacaoService.getPedidosFormacaoByUtilizador(utilizador);
            return new ResponseEntity<>(
                    pedidosFormacao,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/pedidoFormacaoById")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPedidoFormacaoById(@RequestBody Long id) {

        try{
            PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoById(id);
            return new ResponseEntity<>(
                    pedidoFormacao,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder ao pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/pedidoFormacaoByNome")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPedidoFormacaoByNome(@RequestBody String nome) {

        try{
            //TODO: verificar se não podem haver formações como o mesmo nome
            PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoByNome(nome);
            return new ResponseEntity<>(
                    pedidoFormacao,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder ao pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*@PostMapping (value = "/createPedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> createPedidoFormacao(@RequestBody PedidoFormacaoImage pedidoFormacaoImage) {

        System.out.println("[createPedidoFormacao]pedidoFormacao: " + pedidoFormacaoImage.getPedidoFormacao().toString());
        if(!pedidoFormacaoImage.getFiles().isEmpty())
            System.out.println("[createPedidoFormacao]files: " + pedidoFormacaoImage.getFiles().toString());
        else{
            throw new RuntimeException("files está vazio ou null");
        }

        try{
            pedidoFormacaoService.createPedidoFormacao(pedidoFormacaoImage.getPedidoFormacao(), pedidoFormacaoImage.getFiles());
            return new ResponseEntity<>(
                    "Pedido de formação criado com sucesso.",
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao criar o pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

    @PostMapping (value = "/createPedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> createPedidoFormacao(@RequestPart("files") List<MultipartFile> files, @RequestPart("pedidoFormacao") PedidoFormacao pedidoFormacao) {

        if(!files.isEmpty())
            System.out.println("[createPedidoFormacao]files: " + files.get(0).getOriginalFilename());
        else{
            throw new RuntimeException("files está vazio ou null");
        }
        System.out.println("[createPedidoFormacao]pedidoFormacao: " + pedidoFormacao.toString());

        try{
            pedidoFormacaoService.createPedidoFormacao(pedidoFormacao, files);
            return new ResponseEntity<>(
                    "Pedido de formação criado com sucesso.",
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao criar o pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping (value = "/updatePedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> updatePedidoFormacao(@RequestBody PedidoFormacao pedidoFormacao) {

        try{
            pedidoFormacaoService.updatePedidoFormacao(pedidoFormacao);
            return new ResponseEntity<>(
                    "Pedido de formação: " + pedidoFormacao.getNome() + "atualizado com sucesso.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao atualizar o pedido de formação: " + pedidoFormacao.getNome() + ".",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/removePedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> removePedidoFormacao(@RequestBody PedidoFormacao pedidoFormacao) {

        try{
            pedidoFormacaoService.removePedidoFormacao(pedidoFormacao);
            return new ResponseEntity<>(
                    "Pedido de formação: " + pedidoFormacao.getNome() + "eliminado com sucesso.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao eliminar o pedido de formação: " + pedidoFormacao.getNome() + ".",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


