package meiware.coursemanagement.Repositories.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPublicacaoRepository extends MongoRepository<Publicacao, String> {
}
