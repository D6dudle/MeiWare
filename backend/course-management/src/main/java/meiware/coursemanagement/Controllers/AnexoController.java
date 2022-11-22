package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.MongoDB.Anexo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class AnexoController {

    //TODO: definir URLS

    @GetMapping(value = "/anexo/{studentId}")
    public Anexo getAllAnexos() {

        return null;
    }

    //https://www.baeldung.com/spring-controllers
    @GetMapping(value = "/anexo/{anexoId}")
    public Anexo getAnexoById(@PathVariable Integer anexoId) {

        return null;
    }

    //https://docs.spring.io/spring-framework/docs/3.0.0.M3/reference/html/ch18s02.html
    //se bem me lembro, assim não é necessário enviar o ID pelo URL, mas sim através de um parâmetro,
    // como por exemplo um JSON object
    @GetMapping(value = "/anexo/getAnexoById2")
    public Anexo getAnexoById2(@RequestBody Integer anexoId) {

        return null;
    }


    @PostMapping
    public boolean postAnexo() {

        return true;
    }
}