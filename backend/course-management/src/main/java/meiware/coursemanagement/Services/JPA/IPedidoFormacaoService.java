package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IPedidoFormacaoService {
    List<PedidoFormacao> getPedidosFormacao();
    List<PedidoFormacao> getPedidosFormacaoEquipa(Long gestorId);
    List<PedidoAprovado> getPedidosAprovados();
    List<PedidoRejeitado> getPedidosRejeitados();
    PedidoFormacao getPedidoFormacaoById(Long id);
    PedidoFormacao getPedidoFormacaoByNome(String nome);
    PedidoFormacao createPedidoFormacao(PedidoFormacao newPedidoFormacao, List<MultipartFile> files, List<Utilizador> formandos);
    void updatePedidoFormacao(PedidoFormacao updatedPedidoFormacao);
    void aprovarPedidoFormacao(Long pedidoFormacaoId, Long utilizadorId);
    void rejeitarPedidoFormacao(Long pedidoFormacaoId, Long utilizadorId, String comentario);
    void addAnexoToPedidoFormacao(PedidoFormacao pedidoFormacao, MultipartFile file);
    void removeAnexoFromPedidoFormacao(PedidoFormacao pedidoFormacao, AnexoRef anexoRef);
    void removePedidoFormacao(PedidoFormacao pedidoFormacao);
    void finalizaPedidoFormacao(Long pedidoFormacaoId);
}
