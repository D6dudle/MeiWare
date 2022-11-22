package meiware.coursemanagement.Services;

import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IPublicacaoService {
    String addPublicacao(MultipartFile file) throws IOException;
    Publicacao getPublicacao(String id) throws IOException;
}
