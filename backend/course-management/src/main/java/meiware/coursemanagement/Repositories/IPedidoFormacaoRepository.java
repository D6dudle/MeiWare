package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.PedidoFormacao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPedidoFormacaoRepository extends CrudRepository<PedidoFormacao, Long> {
    PedidoFormacao findByNome(String nome);
}