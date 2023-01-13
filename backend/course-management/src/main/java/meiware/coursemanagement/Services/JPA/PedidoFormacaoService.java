package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.*;
import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Repositories.JPA.IAnexoRefRepository;
import meiware.coursemanagement.Repositories.JPA.IPedidoFormacaoRepository;
import meiware.coursemanagement.Repositories.JPA.IUtilizadorRepository;
import meiware.coursemanagement.Services.MongoDB.IAnexoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
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
    private IUtilizadorRepository utilizadorRepository;
    @Autowired
    private UtilizadorService utilizadorService;
    @Autowired
    private IAnexoRefRepository anexoRefRepository;
    @Autowired
    private IAnexoService anexoService;

    @Autowired
    private ModelMapper mapper;

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<PedidoFormacao> getPedidosFormacao() {
        List<PedidoFormacao> pedidosFormacao = new ArrayList<>();

        try {
            pedidosFormacao = pedidoFormacaoRepository.findPedidoFormacaoByApagadaFalseOrderByDataCriacaoDesc();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return pedidosFormacao;
    }

    @Override
    public List<PedidoFormacao> getPedidosFormacaoEquipa(Utilizador gestor) {
        List<PedidoFormacao> pedidosFormacao = new ArrayList<>();


        try {
            //pedidosFormacao = pedidoFormacaoRepository.findPedidoFormacaoByApagadaFalseAndQuemFezPedidoManagerIdOrderByDataCriacaoDesc(gestorId);
            List<Utilizador> teamList = utilizadorRepository.findAllByManager(gestor);
            for (Utilizador u: teamList) {
                pedidosFormacao.addAll(u.getListFormacoes());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return pedidosFormacao;
    }

    @Override
    public List<PedidoAprovado> getPedidosAprovados() {
        List<PedidoAprovado> formacoesAprovadas = new ArrayList<>();

        try {
            for (PedidoFormacao pd: pedidoFormacaoRepository.findPedidoFormacaoByApagadaFalseOrderByDataCriacaoDesc()) {
                if(pd instanceof PedidoAprovado) {
                    formacoesAprovadas.add((PedidoAprovado) pd);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return formacoesAprovadas;
    }

    @Override
    public List<PedidoRejeitado> getPedidosRejeitados() {
        List<PedidoRejeitado> formacoesRejeitadas = new ArrayList<>();

        try {
            for (PedidoFormacao pd: pedidoFormacaoRepository.findPedidoFormacaoByApagadaFalseOrderByDataCriacaoDesc()) {
                if(pd instanceof PedidoRejeitado) {
                    formacoesRejeitadas.add((PedidoRejeitado) pd);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        return formacoesRejeitadas;
    }

    @Override
    public PedidoFormacao getPedidoFormacaoById(Long id) {
        try {
            PedidoFormacao pd = pedidoFormacaoRepository.findByApagadaFalseAndId(id).orElse(null);

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
            PedidoFormacao pd = pedidoFormacaoRepository.findByApagadaFalseAndNome(nome);
            return pd;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public PedidoFormacao createPedidoFormacao(PedidoFormacao newPedidoFormacao, List<MultipartFile> files, List<Utilizador> formandos) {
        try {
            PedidoFormacao pedidoFormacao = new PedidoFormacao();
            mapper.map(newPedidoFormacao, pedidoFormacao);

            if (files != null && files.size() > 0) {
                Set<AnexoRef> anexoRefs = new HashSet<>();
                for (MultipartFile file: files) {
                    Anexo anexo = anexoService.createAnexo(file);
                    anexoRefs.add(new AnexoRef(anexo.getId(), anexo.getNome(), anexo.getType(), anexo.getSize()));
                }
                anexoRefRepository.saveAll(anexoRefs);
                pedidoFormacao.setListAnexoRefs(anexoRefs);
            }

            for (Utilizador formando : formandos) {
                pedidoFormacao.addFormando(utilizadorService.getUtilizadorById(formando.getId()));
            }

            return pedidoFormacaoRepository.save(pedidoFormacao);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void updatePedidoFormacao(PedidoFormacao updatedPedidoFormacao, List<MultipartFile> addedFiles, List<AnexoRef> removedFiles) {
        try {
            PedidoFormacao pedidoFormacao = this.getPedidoFormacaoById(updatedPedidoFormacao.getId());
            if(pedidoFormacao != null) {
                mapper.map(updatedPedidoFormacao, pedidoFormacao);

                if(addedFiles != null) {
                    this.addAnexosToPedidoFormacao(pedidoFormacao, addedFiles);
                    System.out.println("Added: " + addedFiles);
                }

                if(removedFiles != null) {
                    this.removeAnexosFromPedidoFormacao(pedidoFormacao, removedFiles);
                    System.out.println("Removed: " + removedFiles);
                }

                pedidoFormacaoRepository.save(pedidoFormacao);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public void aprovarPedidoFormacao(Long pedidoFormacaoId, Long utilizadorId) {
        try {
            em.createNativeQuery("UPDATE pedido_formacao SET concluida = false, tipo = ?, quem_aprovou_id = ?, data_aprovacao = ? WHERE id = ?").setParameter(1, "APROVADA").setParameter(2, utilizadorId).setParameter(3, LocalDate.now()).setParameter(4, pedidoFormacaoId).executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public void rejeitarPedidoFormacao(Long pedidoFormacaoId, Long utilizadorId, String comentario) {
        try {
            em.createNativeQuery("UPDATE pedido_formacao SET tipo = ?, quem_rejeitou_id = ?, data_rejeicao = ?, comentario = ? WHERE id = ?").setParameter(1, "REJEITADA").setParameter(2, utilizadorId).setParameter(3, LocalDate.now()).setParameter(4, comentario).setParameter(5, pedidoFormacaoId).executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public void finalizaPedidoFormacao(Long pedidoFormacaoId) {
        try {
            em.createNativeQuery("UPDATE pedido_formacao SET concluida = true, data_conclusao = ? WHERE id = ?").setParameter(1, LocalDate.now()).setParameter(2, pedidoFormacaoId).executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void addAnexosToPedidoFormacao(PedidoFormacao pedidoFormacao, List<MultipartFile> files) {
        try {
            List<AnexoRef> addedAnexos = new ArrayList<>();
            for (MultipartFile f: files) {
                Anexo anexo = anexoService.createAnexo(f);
                AnexoRef anexoRef = new AnexoRef(anexo.getId(), anexo.getNome(), anexo.getType(), anexo.getSize());
                addedAnexos.add(anexoRef);
            }
            anexoRefRepository.saveAll(addedAnexos);
            pedidoFormacao.addAnexoRef(addedAnexos);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removeAnexosFromPedidoFormacao(PedidoFormacao pedidoFormacao, List<AnexoRef> anexoRefs) {
        try {
            List<AnexoRef> removedAnexos = new ArrayList<>();
            for (AnexoRef a: anexoRefs) {
                pedidoFormacao.removeAnexoRef(a);
                anexoService.removeAnexo(a.getPath());
                anexoRefRepository.delete(a);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removePedidoFormacao(PedidoFormacao pedidoFormacao) { // Soft delete
        try {
            pedidoFormacao.setApagada(true);
            pedidoFormacao.setApagadaNaData(LocalDate.now());
            pedidoFormacaoRepository.save(pedidoFormacao);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
