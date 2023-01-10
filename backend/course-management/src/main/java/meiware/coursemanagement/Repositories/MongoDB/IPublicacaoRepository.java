package meiware.coursemanagement.Repositories.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPublicacaoRepository extends MongoRepository<Publicacao, String> {
    List<Publicacao> findAllByArquivadaIsFalseAndAprovadaIsFalseOrderByDataCriacaoDesc();
    List<Publicacao> findAllByArquivadaIsFalseAndAprovadaIsTrueOrderByDataCriacaoDesc();
}
