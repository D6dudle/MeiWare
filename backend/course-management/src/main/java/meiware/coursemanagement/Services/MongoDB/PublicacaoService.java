package meiware.coursemanagement.Services.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import meiware.coursemanagement.Repositories.MongoDB.IPublicacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
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
        List<Publicacao> publicacoes = new ArrayList<>();
        try {
            for (Publicacao p: publicacaoRepository.findAllByOrderByDataCriacaoDesc()) {
                if(!p.isArquivada()) {
                    publicacoes.add(p);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return publicacoes;
    }

    @Override
    public Publicacao getPublicacaoById(String id) {
        try {
            Publicacao publicacao = publicacaoRepository.findById(id).orElse(null);

            if(publicacao != null && !publicacao.isArquivada()) {
                return publicacao;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public String createPublicacao(Publicacao newPublicacao, List<MultipartFile> files) {
        try {
            if (files != null && files.size() > 0) {
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
    public void arquivarPublicacao(Publicacao publicacaoArquivada) {
        try {
            Publicacao publicacao = this.getPublicacaoById(publicacaoArquivada.getId());
            if(publicacao != null) {
                publicacao.setArquivada();
                publicacao.setArquivadaEm(LocalDate.now());
                publicacaoRepository.save(publicacao);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removePublicacao(Publicacao publicacao) {
        try {
            if(publicacao.getAnexos() != null) {
                for (Anexo anexo : publicacao.getAnexos()) {
                    anexoService.removeAnexo(anexo.getId());
                }
            }

            publicacaoRepository.delete(publicacao);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
