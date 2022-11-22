package meiware.coursemanagement.Repositories.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IPublicacaoRepository extends MongoRepository<Publicacao, Long> {
}
