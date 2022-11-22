package meiware.coursemanagement.Services.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Repositories.MongoDB.IAnexoRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class AnexoService implements IAnexoService {

    @Autowired
    private IAnexoRepository anexoRepository;

    @Override
    public List<Anexo> getAnexos() {
        return anexoRepository.findAll();
    }

    @Override
    public Anexo getAnexoById(String id) {
        return anexoRepository.findById(id).get();
    }

    @Override
    public String createAnexo(MultipartFile file) throws IOException {
        Anexo anexo = new Anexo(file.getOriginalFilename());

        anexo.setConteudo(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        anexo = anexoRepository.insert(anexo);

        return anexo.getId();
    }

    @Override
    public void updateAnexo(Anexo updatedAnexo) {
        anexoRepository.save(updatedAnexo);
    }

    @Override
    public void removeAnexo(Anexo anexo) {
        anexoRepository.delete(anexo);
    }
}
