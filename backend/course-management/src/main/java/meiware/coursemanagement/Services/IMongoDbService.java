package meiware.coursemanagement.Services;

import meiware.coursemanagement.Entities.JPA.Anexo;

import java.util.List;

public interface IMongoDbService {
    List<Anexo> getAnexos();
    Anexo getAnexoById(Long id);
    Anexo createAnexo(Anexo newAnexo);
    void updateAnexo(Anexo updatedAnexo);
    void removeAnexo(Anexo anexo);
}
