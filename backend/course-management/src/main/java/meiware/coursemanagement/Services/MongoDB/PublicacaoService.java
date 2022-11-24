package meiware.coursemanagement.Services.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import meiware.coursemanagement.Repositories.MongoDB.IAnexoRepository;
import meiware.coursemanagement.Repositories.MongoDB.IPublicacaoRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PublicacaoService implements IPublicacaoService {

    @Autowired
    private IPublicacaoRepository publicacaoRepository;

    @Autowired
    private IAnexoRepository anexoRepository;

    @Autowired
    private IAnexoService anexoService;

    @Override
    public List<Publicacao> getPublicacoes() {
        return publicacaoRepository.findAll();
    }

    @Override
    public Publicacao getPublicacaoById(String id) {
        return publicacaoRepository.findById(id).get();
    }

    @Override
    public String createPublicacao(Publicacao newPublicacao, List<MultipartFile> files) throws IOException {

        if (files.size() > 0) {
            List<Anexo> anexos = new ArrayList<>();
            for (MultipartFile file: files) {
                Anexo anexo = new Anexo(file.getOriginalFilename());
                anexo.setConteudo(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
                anexo = anexoRepository.insert(anexo);
                anexos.add(anexo);
            }
            newPublicacao.setAnexos(anexos);
        }



        return publicacaoRepository.insert(newPublicacao).getId();
    }

    @Override
    public void updatePublicacao(Publicacao updatedPublicacao) {

    }

    @Override
    public void removePublicacao(Publicacao publicacao) {

    }
}
