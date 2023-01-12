package meiware.coursemanagement.Services.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface IPublicacaoService {
    List<Publicacao> getPublicacoesPendentes();
    List<Publicacao> getPublicacoesAprovadas();
    Publicacao getPublicacaoById(String id);
    Publicacao createPublicacao(Publicacao newPublicacao, List<MultipartFile> files);
    void aprovarPublicacao(Publicacao publicacao);
    void arquivarPublicacao(Publicacao publicacaoArquivada);
    void removePublicacao(Publicacao publicacao);
    List<String> getExistingTags();
}
