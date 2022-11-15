package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.PedidoFormacao;
import meiware.coursemanagement.JPA.Utilizador;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPedidoFormacaoRepository extends CrudRepository<PedidoFormacao, Long> {
    PedidoFormacao findByNome(String nome);
}