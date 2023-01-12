package meiware.coursemanagement.Repositories.JPA;

import meiware.coursemanagement.Entities.JPA.PedidoFormacao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IPedidoFormacaoRepository extends CrudRepository<PedidoFormacao, Long> {
    PedidoFormacao findByApagadaFalseAndNome(String nome);
    Optional<PedidoFormacao> findByApagadaFalseAndId(Long id);
    List<PedidoFormacao> findAllByOrderByDataCriacaoDesc();
    List<PedidoFormacao> findPedidoFormacaoByApagadaFalseOrderByDataCriacaoDesc();
    List<PedidoFormacao> findPedidoFormacaoByApagadaFalseAndQuemFezPedidoManagerIdOrderByDataCriacaoDesc(Long managerId);
}