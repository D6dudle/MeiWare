package meiware.coursemanagement.Services.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IPublicacaoService {
    List<Publicacao> getPublicacoes();
    Publicacao getPublicacaoById(String id);
    String createPublicacao(Publicacao newPublicacao, List<MultipartFile> files) throws IOException;
    void updatePublicacao(Publicacao updatedPublicacao);
    void removePublicacao(Publicacao publicacao);
}
