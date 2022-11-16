package meiware.coursemanagement.Services;

import meiware.coursemanagement.JPA.FormacaoAprovada;
import meiware.coursemanagement.JPA.FormacaoRejeitada;
import meiware.coursemanagement.JPA.PedidoFormacao;
import meiware.coursemanagement.JPA.Utilizador;
import meiware.coursemanagement.Repositories.IPedidoFormacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoFormacaoService implements IPedidoFormacaoService{

    @Autowired
    private IPedidoFormacaoRepository pedidoFormacaoRepository;
    // TODO: exception handling

    @Override
    public List<PedidoFormacao> getPedidosFormacao() {
        List<PedidoFormacao> pedidosFormacao = new ArrayList<>();
        for (PedidoFormacao pd: pedidoFormacaoRepository.findAll()) {
            if(!pd.isApagada()) {
                pedidosFormacao.add(pd);
            }
        }

        return pedidosFormacao;
    }

    @Override
    public List<FormacaoAprovada> getFormacoesAprovadas() {
        List<FormacaoAprovada> formacoesAprovadas = new ArrayList<>();
        for (PedidoFormacao pd: pedidoFormacaoRepository.findAll()) {
            if(!pd.isApagada() && (pd instanceof FormacaoAprovada)) {
                formacoesAprovadas.add((FormacaoAprovada) pd);
            }
        }

        return formacoesAprovadas;
    }

    @Override
    public List<FormacaoRejeitada> getFormacoesRejeitadas() {
        List<FormacaoRejeitada> formacoesRejeitadas = new ArrayList<>();
        for (PedidoFormacao pd: pedidoFormacaoRepository.findAll()) {
            if(!pd.isApagada() && (pd instanceof FormacaoRejeitada)) {
                formacoesRejeitadas.add((FormacaoRejeitada) pd);
            }
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
        PedidoFormacao pd = pedidoFormacaoRepository.findById(id).orElse(null);

        if(pd != null && !pd.isApagada()) {
            return pd;
        }

        return null;
    }

    @Override
    public PedidoFormacao getPedidoFormacaoByNome(String nome) {
        PedidoFormacao pd = pedidoFormacaoRepository.findByNome(nome);

        if(!pd.isApagada()) {
            return pd;
        }

        return null;
    }

    @Override
    public PedidoFormacao createPedidoFormacao(PedidoFormacao newPedidoFormacao) {
        return pedidoFormacaoRepository.save(newPedidoFormacao);
    }

    @Override
    public void updatePedidoFormacao(PedidoFormacao updatedPedidoFormacao) {
        pedidoFormacaoRepository.save(updatedPedidoFormacao);
    }

    @Override
    public void removePedidoFormacao(PedidoFormacao pedidoFormacao) {
        pedidoFormacao.setApagada(true);
        pedidoFormacao.setApagadaNaData(LocalDate.now());
        this.updatePedidoFormacao(pedidoFormacao);
    }
}
