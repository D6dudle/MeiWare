package meiware.coursemanagement.Entities.MongoDB;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.bson.types.Binary;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.InputStream;

@Document("anexos")
public class Anexo {
    @Id
    private String id;
    private String nome;
    private String type;
    private String size;
    @JsonIgnore
    private Binary conteudo;

    public Anexo() {

    }

    public Anexo(String nome, String type, String size) {
        this.nome = nome;
        this.type = type;
        this.size = size + " KB";
    }

    /*public Anexo(String id, String nome) {
        this.id = id;
        this.nome = nome;
    }*/

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Binary getConteudo() {
        return conteudo;
    }

    public void setConteudo(Binary conteudo) {
        this.conteudo = conteudo;
    }

    @Override
    public String toString() {
        return "Anexo{" +
                "id='" + id + '\'' +
                ", nome='" + nome + '\'' +
                ", type='" + type + '\'' +
                ", size='" + size + '\'' +
                ", conteudo=" + conteudo +
                '}';
    }
}
