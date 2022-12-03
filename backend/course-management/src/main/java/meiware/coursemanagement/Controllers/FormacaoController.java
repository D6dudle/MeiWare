package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.JPA.PedidoFormacao;
import meiware.coursemanagement.Entities.JPA.Utilizador;
import meiware.coursemanagement.Services.JPA.IPedidoFormacaoService;
import meiware.coursemanagement.Services.MongoDB.IAnexoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping(value = "/getPedidosFormacao")
    public ResponseEntity<?> getPedidosFormacao() {

        try{
            pedidoFormacaoService.getPedidosFormacao();
        }catch(Exception e){

        }
        return null;
    }

    @GetMapping(value = "/getFormacoesAprovadas")
    public ResponseEntity<?> getFormacoesAprovadas() {

        try{
            pedidoFormacaoService.getFormacoesAprovadas();
        }catch(Exception e){

        }
        return null;
    }

    @GetMapping(value = "/getFormacoesRejeitadas")
    public ResponseEntity<?> getFormacoesRejeitadas() {

        try{
            pedidoFormacaoService.getFormacoesRejeitadas();
        }catch(Exception e){

        }
        return null;
    }

    @GetMapping(value = "/getPedidosFormacaoByUtilizador")
    public ResponseEntity<?> getPedidosFormacaoByUtilizador(@RequestBody Utilizador utilizador) {

        try{
            //TODO: PErguntar ao Jordão porque se não faz mais sentido por userId?
            pedidoFormacaoService.getPedidosFormacaoByUtilizador(utilizador);
        }catch(Exception e){

        }
        return null;
    }

    @GetMapping(value = "/getPedidoFormacaoById")
    public ResponseEntity<?> getPedidoFormacaoById(@RequestBody Long id) {

        try{
            pedidoFormacaoService.getPedidoFormacaoById(id);
        }catch(Exception e){

        }
        return null;
    }

    @GetMapping(value = "/getPedidoFormacaoByNome")
    public ResponseEntity<?> getPedidoFormacaoByNome(@RequestBody String nome) {

        try{
            pedidoFormacaoService.getPedidoFormacaoByNome(nome);
        }catch(Exception e){

        }
        return null;
    }

    @GetMapping(value = "/createPedidoFormacao")
    public ResponseEntity<?> createPedidoFormacao(@RequestBody PedidoFormacao pedidoFormacao) {

        try{
            pedidoFormacaoService.createPedidoFormacao(pedidoFormacao);
        }catch(Exception e){

        }
        return null;
    }

    @GetMapping(value = "/updatePedidoFormacao")
    public ResponseEntity<?> updatePedidoFormacao(@RequestBody PedidoFormacao pedidoFormacao) {

        try{
            pedidoFormacaoService.updatePedidoFormacao(pedidoFormacao);
        }catch(Exception e){

        }
        return null;
    }

    @GetMapping(value = "/removePedidoFormacao")
    public ResponseEntity<?> removePedidoFormacao(@RequestBody PedidoFormacao pedidoFormacao) {

        try{
            pedidoFormacaoService.removePedidoFormacao(pedidoFormacao);
        }catch(Exception e){

        }
        return null;
    }
}


