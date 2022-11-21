package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.Entities.JPA.Anexo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMongoDbRepository extends MongoRepository<Anexo, Long> {
}
