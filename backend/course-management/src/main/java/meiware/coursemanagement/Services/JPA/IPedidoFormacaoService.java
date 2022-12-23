package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public interface IPedidoFormacaoService {
    List<PedidoFormacao> getPedidosFormacao();
    List<PedidoAprovado> getPedidosAprovados();
    List<PedidoRejeitado> getPedidosRejeitados();
    PedidoFormacao getPedidoFormacaoById(Long id);
    PedidoFormacao getPedidoFormacaoByNome(String nome);
    PedidoFormacao createPedidoFormacao(PedidoFormacao newPedidoFormacao, List<MultipartFile> files);
    void updatePedidoFormacao(PedidoFormacao updatedPedidoFormacao);
    void addAnexoToPedidoFormacao(PedidoFormacao pedidoFormacao, MultipartFile file);
    void removeAnexoFromPedidoFormacao(PedidoFormacao pedidoFormacao, AnexoRef anexoRef);
    void removePedidoFormacao(PedidoFormacao pedidoFormacao);
}
