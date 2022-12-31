package meiware.coursemanagement.Repositories.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Anexo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAnexoRepository extends MongoRepository<Anexo, String> {
    void deleteById(String id);
}
