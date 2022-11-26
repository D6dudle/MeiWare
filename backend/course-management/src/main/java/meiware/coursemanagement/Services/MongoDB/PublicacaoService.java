package meiware.coursemanagement.Services.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import meiware.coursemanagement.Repositories.MongoDB.IPublicacaoRepository;
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
    private IAnexoService anexoService;

    @Override
    public List<Publicacao> getPublicacoes() {
        try {
            return publicacaoRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Publicacao getPublicacaoById(String id) {
        Publicacao publicacao = null;
        try {
            publicacao = publicacaoRepository.findById(id).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return publicacao;
    }

    @Override
    public String createPublicacao(Publicacao newPublicacao, List<MultipartFile> files) {
        try {
            if (files.size() > 0) {
                List<Anexo> anexos = new ArrayList<>();
                for (MultipartFile file: files) {
                    anexos.add(anexoService.createAnexo(file));
                }
                newPublicacao.setAnexos(anexos);
            }

            return publicacaoRepository.insert(newPublicacao).getId();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void updatePublicacao(Publicacao updatedPublicacao) {
        try {
            publicacaoRepository.save(updatedPublicacao);
        } catch (Exception e) {

        }
    }

    @Override
    public void removePublicacao(Publicacao publicacao) {
        try {
            for (Anexo anexo: publicacao.getAnexos()) {
                anexoService.removeAnexo(anexo);
            }

            publicacaoRepository.delete(publicacao);
        } catch (Exception e) {

        }
    }
}
