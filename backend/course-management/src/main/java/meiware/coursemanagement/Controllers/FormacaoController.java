package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.JPA.*;
import meiware.coursemanagement.Repositories.JPA.IUtilizadorRepository;
import meiware.coursemanagement.Services.JPA.IPedidoFormacaoService;
import meiware.coursemanagement.Services.JPA.IUtilizadorService;
import org.json.JSONArray;
import org.json.JSONObject;
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
@CrossOrigin(origins = {"http://127.0.0.1:5173/", "http://localhost:5173/"})
public class FormacaoController {

    @Autowired
    IPedidoFormacaoService pedidoFormacaoService;

    @Autowired
    IUtilizadorService utilizadorService; // Necessario para buscar as formacoes por utilizador via email
    @Autowired
    IUtilizadorRepository utilizadorRepository;

    // TODO: perguntar ao Jordão como é que ele vai tratar da aceitação/recusa das
    // formações

    @GetMapping(value = "/pedidosFormacao")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPedidosFormacao() {

        try {
            List<PedidoFormacao> pedidosFormacaoList = pedidoFormacaoService.getPedidosFormacao();
            JSONArray arr = new JSONArray();

            for (PedidoFormacao p : pedidosFormacaoList) {
                JSONObject auxP = p.toJSON();

                String username = "";
                int i = 0;
                for (Utilizador u : p.getFormandos()){
                    //Correspondem ao nome das pessoas que vão fazer uma formação
                    auxP.put("username", u.getNome());
                    username += u.getNome();
                    if (i != p.getFormandos().size() - 1)
                        username += ", ";
                    i++;
                }
                auxP.put("username", username);

                //NOTA quem fez o pedido pode não ser a pessoa a quem o curso se destina no caso de ser admin
                //auxP.put("username", p.getQuemFezPedido().getNome());
                if (p.getDiscriminatorValue().equals("PedidoFormacao") && !p.isApagada()) {
                    // A formacao ainda esta pendente
                    auxP.put("tipoFormacao", "PENDENTE");
                } else if (p.getDiscriminatorValue().equals("APROVADA") && !p.isApagada()) {
                    if (p instanceof PedidoAprovado) {
                        PedidoAprovado auxAprovado = (PedidoAprovado) p;
                        if (auxAprovado.isConcluida())
                            auxP.put("tipoFormacao", "TERMINADA");
                        else {
                            auxP.put("tipoFormacao", "CURSO");
                        }

                    }
                } else if (p.getDiscriminatorValue().equals("REJEITADA") && !p.isApagada()) {
                    auxP.put("tipoFormacao", "REJEITADA");
                }
                arr.put(auxP);
            }

            return new ResponseEntity<>(
                    arr.toString(),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/pedidosFormacaoEquipa")
    @PreAuthorize("hasRole('GESTOR')")
    public ResponseEntity<?> getPedidosFormacaoEquipa(@RequestParam("id") String id_str) {
        try {
            Long gestorId = Long.parseLong(id_str);
            Utilizador gestor = utilizadorService.getUtilizadorById(gestorId);
            List<PedidoFormacao> pedidosFormacaoList = pedidoFormacaoService.getPedidosFormacaoEquipa(gestor);
            JSONArray arr = new JSONArray();

            for (PedidoFormacao p : pedidosFormacaoList) {

                for (Utilizador u : p.getFormandos()) {
                    JSONObject auxP = new JSONObject();
                    //Correspondem às pessoas que vão fazer a formacao
                    if (!u.getId().equals(gestor.getId())){
                        auxP = p.toJSONEquipa(u.getNome());
                    }

                    if (p.getDiscriminatorValue().equals("PedidoFormacao") && !p.isApagada()) {
                        // A formacao ainda esta pendente
                        auxP.put("tipoFormacao", "PENDENTE");
                    } else if (p.getDiscriminatorValue().equals("APROVADA") && !p.isApagada()) {
                        if (p instanceof PedidoAprovado) {
                            PedidoAprovado auxAprovado = (PedidoAprovado) p;
                            if (auxAprovado.isConcluida())
                                auxP.put("tipoFormacao", "TERMINADA");
                            else {
                                auxP.put("tipoFormacao", "CURSO");
                            }

                        }
                    } else if (p.getDiscriminatorValue().equals("REJEITADA") && !p.isApagada()) {
                        auxP.put("tipoFormacao", "REJEITADA");
                    }
                    arr.put(auxP);
                }
            }

            return new ResponseEntity<>(
                    arr.toString(),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "pedidosFormacaoByUserId")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getListaFormacaoByUser(@RequestParam("id") String id) {
        try {
            Utilizador utilizador = utilizadorService.getUtilizadorById(Long.valueOf(id));
            JSONObject obj = utilizador.listaFormacaoUsertoJSON(Long.valueOf(id));

            return new ResponseEntity<>(
                    obj.toMap(),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/formacoesAprovadas")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getFormacoesAprovadas() {

        try {
            List<PedidoAprovado> pedidosAprovadosList = pedidoFormacaoService.getPedidosAprovados();

            JSONArray arr = new JSONArray();

            for (PedidoFormacao p : pedidosAprovadosList) {
                arr.put(p.toJSON());
            }

            return new ResponseEntity<>(
                    arr.toString(),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações aprovados.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/formacoesRejeitadas")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getFormacoesRejeitadas() {

        try {
            List<PedidoRejeitado> pedidosRejeitadosList = pedidoFormacaoService.getPedidosRejeitados();

            JSONArray arr = new JSONArray();

            for (PedidoFormacao p : pedidosRejeitadosList) {
                arr.put(p.toJSON());
            }
            return new ResponseEntity<>(
                    arr,
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao aceder aos pedidos de formações rejeitados.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/pedidoFormacaoById")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPedidoFormacaoById(@RequestParam("id") String id_str) {
        Long id = Long.valueOf(id_str);
        try {
            PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoById(id);
            return new ResponseEntity<>(
                    pedidoFormacao.toJSON().toMap(),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao aceder ao pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // ByNomeFormação
    /*
     * @GetMapping(value = "/pedidoFormacaoByNome")
     *
     * @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')"
     * )
     * public ResponseEntity<?> getPedidoFormacaoByNome(@RequestParam String nome) {
     *
     * try{
     * //TODO: verificar se não podem haver formações como o mesmo nome
     * PedidoFormacao pedidoFormacao =
     * pedidoFormacaoService.getPedidoFormacaoByNome(nome);
     * return new ResponseEntity<>(
     * pedidoFormacao,
     * HttpStatus.OK);
     * }catch(Exception e){
     * return new ResponseEntity<>(
     * "Erro ao aceder ao pedido de formação.",
     * HttpStatus.INTERNAL_SERVER_ERROR);
     * }
     * }
     *
     * @PostMapping (value = "/createPedidoFormacao")
     *
     * @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')"
     * )
     * public ResponseEntity<?> createPedidoFormacao(@RequestBody
     * PedidoFormacaoImage pedidoFormacaoImage) {
     *
     * System.out.println("[createPedidoFormacao]pedidoFormacao: " +
     * pedidoFormacaoImage.getPedidoFormacao().toString());
     * if(!pedidoFormacaoImage.getFiles().isEmpty())
     * System.out.println("[createPedidoFormacao]files: " +
     * pedidoFormacaoImage.getFiles().toString());
     * else{
     * throw new RuntimeException("files está vazio ou null");
     * }
     *
     * try{
     * pedidoFormacaoService.createPedidoFormacao(pedidoFormacaoImage.
     * getPedidoFormacao(), pedidoFormacaoImage.getFiles());
     * return new ResponseEntity<>(
     * "Pedido de formação criado com sucesso.",
     * HttpStatus.OK);
     * }catch(Exception e){
     * return new ResponseEntity<>(
     * "Erro ao criar o pedido de formação.",
     * HttpStatus.INTERNAL_SERVER_ERROR);
     * }
     * }
     */

    @PostMapping(value = "/createPedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> createPedidoFormacao(@RequestPart(value = "files", required = false) List<MultipartFile> files,
                                                  @RequestPart("pedidoFormacao") PedidoFormacao pedidoFormacao,
                                                  @RequestPart("formandos") List<Utilizador> formandos){

        try {
            pedidoFormacaoService.createPedidoFormacao(pedidoFormacao, files, formandos);
            return new ResponseEntity<>(
                    "Pedido de formação criado com sucesso.",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao criar o pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/updatePedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> updatePedidoFormacao(@RequestPart(value = "addedFiles", required = false) List<MultipartFile> addedFiles,
                                                  @RequestPart(value = "removedFiles", required = false) List<AnexoRef> removedFiles,
                                                  @RequestPart("pedidoFormacao") PedidoFormacao pedidoFormacao) {
        try {
            System.out.println(pedidoFormacao);
            System.out.println(addedFiles);
            System.out.println(removedFiles);
            pedidoFormacaoService.updatePedidoFormacao(pedidoFormacao, addedFiles, removedFiles);
            return new ResponseEntity<>(
                    "Pedido de formação: " + pedidoFormacao.getNome() + "atualizado com sucesso.",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao atualizar o pedido de formação: " + pedidoFormacao.getNome() + ".",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/finalizarPedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> finalizaPedidoFormacao(@RequestBody String JSONBody) {
        try {
            JSONObject object = new JSONObject(JSONBody);
            Long pedidoFormacaoId = object.getLong("pedidoFormacaoId");
            String nomeFormacao = object.getString("nomeFormacao");

            pedidoFormacaoService.finalizaPedidoFormacao(pedidoFormacaoId);
            return new ResponseEntity<>(
                    "Pedido de formação: " + nomeFormacao + " aprovado com sucesso.",
                    HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    "Erro ao aprovar o pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/aprovarPedidoFormacaoAdmin")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> aprovarPedidoFormacaoAdmin(@RequestBody String JSONBody) {
        try {
            JSONObject object = new JSONObject(JSONBody);
            Long pedidoFormacaoId = object.getLong("pedidoFormacaoId");
            Long adminId = object.getLong("adminId");

            PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoById(pedidoFormacaoId);
            if (pedidoFormacao != null
                    && !((pedidoFormacao instanceof PedidoRejeitado) || (pedidoFormacao instanceof PedidoAprovado))) {
                pedidoFormacaoService.aprovarPedidoFormacao(pedidoFormacaoId, adminId);
                for(Utilizador u : pedidoFormacao.getFormandos()){
                    u.decrementBudget(pedidoFormacao.getPreco());
                    utilizadorRepository.save(u);

                }

                return new ResponseEntity<>(
                        "Pedido de formação: " + pedidoFormacao.getNome() + " aprovado com sucesso.",
                        HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Pedido de formação inexistente ou inválido.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    "Erro ao aprovar o pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/rejeitarPedidoFormacaoAdmin")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> rejeitarPedidoFormacaoAdmin(@RequestBody String JSONBody) {
        try {
            JSONObject object = new JSONObject(JSONBody);
            Long pedidoFormacaoId = object.getLong("pedidoFormacaoId");
            Long adminId = object.getLong("adminId");
            String comentario = object.getString("comentario");

            PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoById(pedidoFormacaoId);
            if (pedidoFormacao != null
                    && !((pedidoFormacao instanceof PedidoRejeitado))) {
                pedidoFormacaoService.rejeitarPedidoFormacao(pedidoFormacaoId, adminId, comentario);
                return new ResponseEntity<>(
                        "Pedido de formação: " + pedidoFormacao.getNome() + " rejeitado com sucesso.",
                        HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Pedido de formação inexistente ou inválido.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    "Erro ao rejeitar o pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/aprovarPedidoFormacaoGestor")
    @PreAuthorize("hasRole('GESTOR')")
    public ResponseEntity<?> aprovarPedidoFormacaoGestor(@RequestBody String JSONBody) {
        try {
            JSONObject object = new JSONObject(JSONBody);
            Long pedidoFormacaoId = object.getLong("pedidoFormacaoId");
            Long gestorId = object.getLong("gestorId");

            PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoById(pedidoFormacaoId);
            if (pedidoFormacao != null
                    && !((pedidoFormacao instanceof PedidoRejeitado) || (pedidoFormacao instanceof PedidoAprovado))) {
                if (pedidoFormacao.getQuemFezPedido().getManager().getId() == gestorId) {
                    pedidoFormacaoService.aprovarPedidoFormacao(pedidoFormacaoId, gestorId);
                    for(Utilizador u : pedidoFormacao.getFormandos()){

                        u.decrementBudget(pedidoFormacao.getPreco());
                        utilizadorRepository.save(u);
                    }
                    return new ResponseEntity<>(
                            "Pedido de formação: " + pedidoFormacao.getNome() + " aprovado com sucesso.",
                            HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(
                            "Não tem permissões para aprovar o pedido: " + pedidoFormacao.getNome() + ".",
                            HttpStatus.FORBIDDEN);
                }
            } else {
                return new ResponseEntity<>("Pedido de formação inexistente ou inválido.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    "Erro ao aprovar o pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/rejeitarPedidoFormacaoGestor")
    @PreAuthorize("hasRole('GESTOR')")
    public ResponseEntity<?> rejeitarPedidoFormacaoGestor(@RequestBody String JSONBody) {
        try {
            JSONObject object = new JSONObject(JSONBody);
            Long pedidoFormacaoId = object.getLong("pedidoFormacaoId");
            Long gestorId = object.getLong("gestorId");
            String comentario = object.getString("comentario");

            PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoById(pedidoFormacaoId);
            if (pedidoFormacao != null
                    && !((pedidoFormacao instanceof PedidoRejeitado) || (pedidoFormacao instanceof PedidoAprovado))) {
                if (pedidoFormacao.getQuemFezPedido().getManager().getId() == gestorId) {
                    pedidoFormacaoService.rejeitarPedidoFormacao(pedidoFormacaoId, gestorId, comentario);
                    return new ResponseEntity<>(
                            "Pedido de formação: " + pedidoFormacao.getNome() + " rejeitado com sucesso.",
                            HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(
                            "Não tem permissões para aprovar o pedido: " + pedidoFormacao.getNome() + ".",
                            HttpStatus.FORBIDDEN);
                }
            } else {
                return new ResponseEntity<>("Pedido de formação inexistente ou inválido.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    "Erro ao rejeitar o pedido de formação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/removePedidoFormacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> removePedidoFormacao(@RequestBody String id_str) {

        try {
            JSONObject obj = new JSONObject(id_str);
            PedidoFormacao p = pedidoFormacaoService.getPedidoFormacaoById(obj.getLong("id"));
            if (p != null) {
                pedidoFormacaoService.removePedidoFormacao(p);
                return new ResponseEntity<>(
                        "Pedido de formação: " + p.getNome() + " eliminado com sucesso.",
                        HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(
                        "Pedido de formação inexistente",
                        HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    "Erro ao eliminar o pedido de formação",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}
