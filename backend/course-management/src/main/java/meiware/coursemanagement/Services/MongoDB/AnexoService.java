package meiware.coursemanagement.Services.MongoDB;

import meiware.coursemanagement.Entities.JPA.AnexoRef;
import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Repositories.MongoDB.IAnexoRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AnexoService implements IAnexoService {

    @Autowired
    private IAnexoRepository anexoRepository;

    @Override
    public List<Anexo> getAnexos() {
        try {
            return anexoRepository.findAll();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Anexo> getPedidoFormacaoAnexos(List<AnexoRef> anexoRefs) {
        try {
            List<String> paths = new ArrayList<>();
            for (AnexoRef anexoRef: anexoRefs) {
                paths.add(anexoRef.getPath());
            }

            List<Anexo> anexos = new ArrayList<>();
            for (Anexo anexo: anexoRepository.findAllById(paths)) {
                anexos.add(anexo);
            }

            return anexos;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Anexo getAnexoById(String id) {
        Anexo anexo = null;

        try {
           anexo = anexoRepository.findById(id).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return anexo;
    }

    @Override
    public Anexo createAnexo(MultipartFile file) {
        try {
            Anexo anexo = new Anexo(file.getOriginalFilename());
            anexo.setConteudo(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
            return anexoRepository.insert(anexo);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void removeAnexo(String id) {
        try {
            anexoRepository.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
