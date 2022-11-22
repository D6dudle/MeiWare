package meiware.coursemanagement.Repositories.JPA;

import meiware.coursemanagement.Entities.JPA.PedidoFormacao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPedidoFormacaoRepository extends CrudRepository<PedidoFormacao, Long> {
    PedidoFormacao findByNome(String nome);
    // TODO: adicionar findAllByQUEMFEZPEDIDO
}