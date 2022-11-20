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

    @Override
    public List<PedidoFormacao> getPedidosFormacao() {
        List<PedidoFormacao> pedidosFormacao = new ArrayList<>();

        try {
            for (PedidoFormacao pd: pedidoFormacaoRepository.findAll()) {
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
    public List<FormacaoAprovada> getFormacoesAprovadas() {
        List<FormacaoAprovada> formacoesAprovadas = new ArrayList<>();

        try {
            for (PedidoFormacao pd: pedidoFormacaoRepository.findAll()) {
                if(!pd.isApagada() && (pd instanceof FormacaoAprovada)) {
                    formacoesAprovadas.add((FormacaoAprovada) pd);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        return formacoesAprovadas;
    }

    @Override
    public List<FormacaoRejeitada> getFormacoesRejeitadas() {
        List<FormacaoRejeitada> formacoesRejeitadas = new ArrayList<>();

        try {
            for (PedidoFormacao pd: pedidoFormacaoRepository.findAll()) {
                if(!pd.isApagada() && (pd instanceof FormacaoRejeitada)) {
                    formacoesRejeitadas.add((FormacaoRejeitada) pd);
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
    public PedidoFormacao createPedidoFormacao(PedidoFormacao newPedidoFormacao) {
        try {
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
