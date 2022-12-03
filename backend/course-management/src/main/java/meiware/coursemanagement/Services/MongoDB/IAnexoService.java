package meiware.coursemanagement.Services.MongoDB;

import meiware.coursemanagement.Entities.JPA.AnexoRef;
import meiware.coursemanagement.Entities.MongoDB.Anexo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IAnexoService {
    List<Anexo> getAnexos();
    List<Anexo> getPedidoFormacaoAnexos(List<AnexoRef> anexoRefs);
    Anexo getAnexoById(String id);
    Anexo createAnexo(MultipartFile file) throws IOException;
    void updateAnexo(Anexo updatedAnexo);
    void removeAnexo(Anexo anexo);
}
