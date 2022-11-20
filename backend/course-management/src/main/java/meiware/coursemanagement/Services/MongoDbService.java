package meiware.coursemanagement.Services;

import meiware.coursemanagement.JPA.Anexo;
import meiware.coursemanagement.Repositories.IMongoDbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MongoDbService implements IMongoDbService {
    @Autowired
    private IMongoDbRepository mongoDbRepository;

    @Override
    public List<Anexo> getAnexos() {
        return mongoDbRepository.findAll();
    }

    @Override
    public Anexo getAnexoById(Long id) {
        return mongoDbRepository.findById(id).orElse(null);
    }

    @Override
    public Anexo createAnexo(Anexo newAnexo) {
        return mongoDbRepository.insert(newAnexo);
    }

    @Override
    public void updateAnexo(Anexo updatedAnexo) {
        mongoDbRepository.save(updatedAnexo);
    }

    @Override
    public void removeAnexo(Anexo anexo) {
        mongoDbRepository.delete(anexo);
    }
}
