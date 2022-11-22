package meiware.coursemanagement.Services;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import meiware.coursemanagement.Entities.JPA.Anexo;
import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import meiware.coursemanagement.Repositories.JPA.IAnexoRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PublicacaoService implements IPublicacaoService {

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFsOperations operations;

    @Autowired
    private IAnexoRepository anexoRepository;

    @Override
    public String addPublicacao(MultipartFile file) throws IOException {
        DBObject metaData = new BasicDBObject();

        ObjectId id = gridFsTemplate.store(file.getInputStream(), file.getName(), file.getContentType(), metaData);

        Anexo anexo = new Anexo(id.toString(), file.getContentType());
        anexoRepository.save(anexo);

        return id.toString();
    }

    @Override
    public Publicacao getPublicacao(String id) throws IOException {
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(id)));
        Publicacao publicacao = new Publicacao();

        GridFsResource resource = operations.getResource(file);

        publicacao.setId(id);
        publicacao.setStream(resource.getInputStream());
        publicacao.setTipo(resource.getContentType());

        return publicacao;
    }
}
