package meiware.coursemanagement.Services;

import meiware.coursemanagement.JPA.Anexo;
import meiware.coursemanagement.Repositories.IAnexoRepository;
import meiware.coursemanagement.Repositories.IMongoDbRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface IMongoDbService {
    List<Anexo> getAnexos();
    Anexo getAnexoById(Long id);
    Anexo createAnexo(Anexo newAnexo);
    void updateAnexo(Anexo updatedAnexo);
    void removeAnexo(Anexo anexo);
}
