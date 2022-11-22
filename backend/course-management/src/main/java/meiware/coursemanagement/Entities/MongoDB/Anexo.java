package meiware.coursemanagement.Entities.MongoDB;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.InputStream;

@Document("anexos")
public class Anexo {
    @Id
    private String id;
    private String nome;
    private Binary conteudo;

    public Anexo() {

    }

    public Anexo(String nome) {
        this.nome = nome;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Binary getConteudo() {
        return conteudo;
    }

    public void setConteudo(Binary conteudo) {
        this.conteudo = conteudo;
    }
}
