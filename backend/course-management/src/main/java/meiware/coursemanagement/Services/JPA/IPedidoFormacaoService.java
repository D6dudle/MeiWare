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
    PedidoFormacao updatePedidoFormacao(PedidoFormacao updatedPedidoFormacao);
    PedidoFormacao addAnexoToPedidoFormacao(PedidoFormacao pedidoFormacao, MultipartFile file);
    PedidoFormacao removeAnexoFromPedidoFormacao(PedidoFormacao pedidoFormacao, AnexoRef anexoRef);
    void removePedidoFormacao(PedidoFormacao pedidoFormacao);
}
