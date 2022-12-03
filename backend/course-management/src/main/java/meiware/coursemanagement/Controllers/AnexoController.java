package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Repositories.JPA.IAnexoRefRepository;
import meiware.coursemanagement.Repositories.JPA.IUtilizadorRepository;
import meiware.coursemanagement.Services.MongoDB.IAnexoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

//TODO: corrigir returns

@RestController
@RequestMapping("/api/anexo")
public class AnexoController {

    @Autowired
    IAnexoService anexoService;

    @GetMapping(value = "/getAnexos")
    public ResponseEntity<?> getAnexos() {

        try{
            anexoService.getAnexos();
        }catch(Exception e){

        }

        return null;
    }


    //https://docs.spring.io/spring-framework/docs/3.0.0.M3/reference/html/ch18s02.html
    @GetMapping(value = "/getAnexoById")
    public ResponseEntity<?> getAnexoById(@RequestBody String anexoId) {

        try{
            anexoService.getAnexoById(anexoId);
        }catch(Exception e){

        }

        return null;
    }


    @PostMapping(value = "/createAnexo")
    public boolean createAnexo(@Valid @RequestBody MultipartFile anexo) {

        try{
            anexoService.createAnexo(anexo);
        }catch(Exception e){

        }

        return true;
    }

    @PostMapping(value = "/updateAnexo")
    public boolean updateAnexo(@Valid @RequestBody Anexo anexo) {

        try{
            anexoService.updateAnexo(anexo);
        }catch(Exception e){

        }

        return true;
    }

    //TODO: Perguntar ao Jordão se não faz mais sentido ser por id
    @PostMapping(value = "/removeAnexo")
    public boolean removeAnexo(@Valid @RequestBody Anexo anexo) {

        try{
            anexoService.removeAnexo(anexo);
        }catch(Exception e){

        }

        return true;
    }
}

