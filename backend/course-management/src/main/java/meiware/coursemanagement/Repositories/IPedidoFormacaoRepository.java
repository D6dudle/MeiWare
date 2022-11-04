package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.PedidoFormacao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPedidoFormacaoRepository {
    List<PedidoFormacao> findAll();
    PedidoFormacao findById(Long id);
    PedidoFormacao save(PedidoFormacao pf);
    void delete(PedidoFormacao pf);
}