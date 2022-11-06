package meiware.coursemanagement.Services;

import meiware.coursemanagement.Repositories.IPedidoFormacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class teste {
    @Autowired
    private IPedidoFormacaoRepository pedidoFormacaoRepository;

    public void Teste() {
        pedidoFormacaoRepository.findAll();
    }
}
