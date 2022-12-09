package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.*;
import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Repositories.JPA.IAnexoRefRepository;
import meiware.coursemanagement.Repositories.JPA.IPedidoFormacaoRepository;
import meiware.coursemanagement.Services.MongoDB.IAnexoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PedidoFormacaoService implements IPedidoFormacaoService{

    @Autowired
    private IPedidoFormacaoRepository pedidoFormacaoRepository;
    @Autowired
    private IAnexoRefRepository anexoRefRepository;
    @Autowired
    private IAnexoService anexoService;

    @Override
    public List<PedidoFormacao> getPedidosFormacao() {
        List<PedidoFormacao> pedidosFormacao = new ArrayList<>();

        try {
            for (PedidoFormacao pd: pedidoFormacaoRepository.findAllByOrderByDataCriacaoDesc()) {
                if(!pd.isApagada()) {
                    pedidosFormacao.add(pd);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return pedidosFormacao;
    }

    @Override
    public List<PedidoAprovado> getFormacoesAprovadas() {
        List<PedidoAprovado> formacoesAprovadas = new ArrayList<>();

        try {
            for (PedidoFormacao pd: pedidoFormacaoRepository.findAllByOrderByDataCriacaoDesc()) {
                if(!pd.isApagada() && (pd instanceof PedidoAprovado)) {
                    formacoesAprovadas.add((PedidoAprovado) pd);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        return formacoesAprovadas;
    }

    @Override
    public List<PedidoRejeitado> getFormacoesRejeitadas() {
        List<PedidoRejeitado> formacoesRejeitadas = new ArrayList<>();

        try {
            for (PedidoFormacao pd: pedidoFormacaoRepository.findAllByOrderByDataCriacaoDesc()) {
                if(!pd.isApagada() && (pd instanceof PedidoRejeitado)) {
                    formacoesRejeitadas.add((PedidoRejeitado) pd);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        return formacoesRejeitadas;
    }

    @Override
    public List<PedidoFormacao> getPedidosFormacaoByUtilizador(Utilizador utilizador) {
        // TODO
        return null;
    }

    @Override
    public PedidoFormacao getPedidoFormacaoById(Long id) {
        try {
            PedidoFormacao pd = pedidoFormacaoRepository.findById(id).orElse(null);

            if(pd != null && !pd.isApagada()) {
                return pd;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public PedidoFormacao getPedidoFormacaoByNome(String nome) {

        try {
            PedidoFormacao pd = pedidoFormacaoRepository.findByNome(nome);

            if(!pd.isApagada()) {
                return pd;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public PedidoFormacao createPedidoFormacao(PedidoFormacao newPedidoFormacao, List<MultipartFile> files) {
        try {
            if (files.size() > 0) {
                Set<AnexoRef> anexoRefs = new HashSet<>();
                for (MultipartFile file: files) {
                    Anexo anexo = anexoService.createAnexo(file);
                    anexoRefs.add(new AnexoRef(anexo.getId(), anexo.getNome()));
                }
                anexoRefRepository.saveAll(anexoRefs);
                newPedidoFormacao.setListAnexoRefs(anexoRefs);
            }
            return pedidoFormacaoRepository.save(newPedidoFormacao);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void updatePedidoFormacao(PedidoFormacao updatedPedidoFormacao) {
        try {
            pedidoFormacaoRepository.save(updatedPedidoFormacao);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void addAnexoToPedidoFormacao(PedidoFormacao pedidoFormacao, MultipartFile file) {
        try {
            Anexo anexo = anexoService.createAnexo(file);
            AnexoRef anexoRef = new AnexoRef(anexo.getId(), anexo.getNome());
            anexoRefRepository.save(anexoRef);
            pedidoFormacao.getListAnexoRefs().add(anexoRef);

            pedidoFormacaoRepository.save(pedidoFormacao);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removeAnexoFromPedidoFormacao(PedidoFormacao pedidoFormacao, AnexoRef anexoRef) {
        try {
            pedidoFormacao.getListAnexoRefs().remove(anexoRef);
            pedidoFormacaoRepository.save(pedidoFormacao);
            anexoRefRepository.delete(anexoRef);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removePedidoFormacao(PedidoFormacao pedidoFormacao) {
        try {
            pedidoFormacao.setApagada(true);
            pedidoFormacao.setApagadaNaData(LocalDate.now());
            this.updatePedidoFormacao(pedidoFormacao);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
