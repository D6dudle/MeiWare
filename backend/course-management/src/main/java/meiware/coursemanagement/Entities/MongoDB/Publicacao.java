package meiware.coursemanagement.Entities.MongoDB;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("publicacoes")
public class Publicacao {

    @Id
    private String id;
    private String titulo;
    private String conteudo;

    private boolean arquivada;
    private List<Anexo> anexos;
    public Publicacao() {
    }

    public Publicacao(String titulo, String conteudo) {
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.arquivada = false;
    }
    public String getId() {
        return id;
    }


    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public List<Anexo> getAnexos() {
        return anexos;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isArquivada() {
        return arquivada;
    }

    public void setArquivada() {
        this.arquivada = true;
    }

    public void setAnexos(List<Anexo> anexos) {
        this.anexos = anexos;
    }
}
