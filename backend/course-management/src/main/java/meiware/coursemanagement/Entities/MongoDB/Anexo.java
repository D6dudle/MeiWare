package meiware.coursemanagement.Entities.MongoDB;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.InputStream;

@Document("anexos")
public class Anexo {
    @Id
    private String id;
    private String tipo;
    private InputStream inputStream;

    public Anexo() {

    }

    public String getId() {
        return id;
    }


    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }
}
