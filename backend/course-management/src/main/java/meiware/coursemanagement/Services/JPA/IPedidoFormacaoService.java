package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IPedidoFormacaoService {
    List<PedidoFormacao> getPedidosFormacao();
    List<PedidoFormacao> getPedidosFormacaoEquipa(Utilizador gestor);
    List<PedidoAprovado> getPedidosAprovados();
    List<PedidoRejeitado> getPedidosRejeitados();
    PedidoFormacao getPedidoFormacaoById(Long id);
    PedidoFormacao getPedidoFormacaoByNome(String nome);
    PedidoFormacao createPedidoFormacao(PedidoFormacao newPedidoFormacao, List<MultipartFile> files, List<Utilizador> formandos);
    void updatePedidoFormacao(PedidoFormacao updatedPedidoFormacao, List<MultipartFile> addedFiles, List<AnexoRef> removedFiles);
    void aprovarPedidoFormacao(Long pedidoFormacaoId, Long utilizadorId);
    void rejeitarPedidoFormacao(Long pedidoFormacaoId, Long utilizadorId, String comentario);
    void addAnexosToPedidoFormacao(PedidoFormacao pedidoFormacao, List<MultipartFile> files);
    void removeAnexosFromPedidoFormacao(PedidoFormacao pedidoFormacao, List<AnexoRef> anexoRef);
    void removePedidoFormacao(PedidoFormacao pedidoFormacao);
    void finalizaPedidoFormacao(Long pedidoFormacaoId);
}
