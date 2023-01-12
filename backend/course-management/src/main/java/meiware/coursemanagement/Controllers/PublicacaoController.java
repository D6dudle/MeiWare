package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import meiware.coursemanagement.Services.MongoDB.IPublicacaoService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/publicacao")
@CrossOrigin(origins = {"http://127.0.0.1:5173/", "http://localhost:5173/"})
public class PublicacaoController {
    @Autowired
    private IPublicacaoService publicacaoService;

    @GetMapping(value = "/publicacoesPendentes")
    @PreAuthorize("hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPublicacoesPendentes() {
        try {
            List<Publicacao> publicacoes = publicacaoService.getPublicacoesPendentes();
            return new ResponseEntity<>(
                    publicacoes,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder às publicações pendentes.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/publicacoesAprovadas")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPublicacoesAprovadas() {
        try {
            List<Publicacao> publicacoes = publicacaoService.getPublicacoesAprovadas();
            return new ResponseEntity<>(
                    publicacoes,
                    HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(
                    "Erro ao aceder às publicações aprovadas.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/publicacaoById")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPublicacaoById(@RequestParam("id") String id) {

        try {
            Publicacao publicacao = publicacaoService.getPublicacaoById(id);
            return new ResponseEntity<>(
                    publicacao,
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao aceder à publicação.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/createPublicacao")
    @PreAuthorize("hasRole('COLABORADOR') || hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> createPublicacao(@RequestPart("files") List<MultipartFile> files,
                                                  @RequestPart("publicacao") Publicacao publicacao) {

        try {
            Publicacao newPublicacao = publicacaoService.createPublicacao(publicacao, files);
            return new ResponseEntity<>(
                    newPublicacao,
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao criar a publicacao.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/aprovarPublicacao")
    @PreAuthorize("hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> aprovarPublicacao(@RequestBody String JSONBody) {
        try {
            JSONObject object = new JSONObject(JSONBody);
            String publicacaoId = object.getString("id");
            Publicacao publicacao = publicacaoService.getPublicacaoById(publicacaoId);
            if(publicacao != null) {
                publicacaoService.aprovarPublicacao(publicacao);
                return new ResponseEntity<>(
                        "Publicação aprovada com sucesso.",
                        HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(
                        "Publicação inexistente.",
                        HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao aprovar a publicacao.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/arquivarPublicacao")
    @PreAuthorize("hasRole('GESTOR') || hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> arquivarPublicacao(@RequestBody String JSONBody) {
        try {
            JSONObject object = new JSONObject(JSONBody);
            String publicacaoId = object.getString("id");
            Publicacao publicacao = publicacaoService.getPublicacaoById(publicacaoId);
            if(publicacao != null) {
                publicacaoService.arquivarPublicacao(publicacao);
                return new ResponseEntity<>(
                        "Publicação arquivada com sucesso.",
                        HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(
                        "Publicação inexistente.",
                        HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Erro ao arquivar a publicacao.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
