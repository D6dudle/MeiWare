package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.Anexo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IMongoDbRepository extends MongoRepository<Anexo, Long> {
}
