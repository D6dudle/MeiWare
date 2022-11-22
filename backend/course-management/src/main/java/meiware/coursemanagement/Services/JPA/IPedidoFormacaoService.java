package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.FormacaoAprovada;
import meiware.coursemanagement.Entities.JPA.FormacaoRejeitada;
import meiware.coursemanagement.Entities.JPA.PedidoFormacao;
import meiware.coursemanagement.Entities.JPA.Utilizador;

import java.util.List;

public interface IPedidoFormacaoService {
    List<PedidoFormacao> getPedidosFormacao();
    List<FormacaoAprovada> getFormacoesAprovadas();
    List<FormacaoRejeitada> getFormacoesRejeitadas();
    List<PedidoFormacao> getPedidosFormacaoByUtilizador(Utilizador utilizador);
    PedidoFormacao getPedidoFormacaoById(Long id);
    PedidoFormacao getPedidoFormacaoByNome(String nome);
    PedidoFormacao createPedidoFormacao(PedidoFormacao newPedidoFormacao);
    void updatePedidoFormacao(PedidoFormacao updatedPedidoFormacao);
    void removePedidoFormacao(PedidoFormacao pedidoFormacao);
}
