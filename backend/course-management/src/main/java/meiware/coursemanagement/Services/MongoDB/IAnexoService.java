package meiware.coursemanagement.Services.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Anexo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IAnexoService {
    List<Anexo> getAnexos();
    Anexo getAnexoById(String id);
    String createAnexo(MultipartFile file) throws IOException;
    void updateAnexo(Anexo updatedAnexo);
    void removeAnexo(Anexo anexo);
}
