package meiware.coursemanagement.Entities.MongoDB;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Document("publicacoes")
public class Publicacao {

    @Id
    private String id;
    private String titulo;
    private String descricao;
    private LocalDate dataCriacao;
    private Set<String> tags;
    private String tituloFormacao;
    private Boolean aprovada;
    private Boolean arquivada;
    private LocalDate arquivadaEm;
    private List<Anexo> anexos;
    public Publicacao() {
    }

    public Publicacao(String titulo, String descricao, Set<String> tags, String tituloFormacao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataCriacao = LocalDate.now();
        this.tags = tags;
        this.tituloFormacao = tituloFormacao;
        this.aprovada = false;
        this.arquivada = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    public String getTituloFormacao() {
        return tituloFormacao;
    }

    public void setTituloFormacao(String tituloFormacao) {
        this.tituloFormacao = tituloFormacao;
    }

    public Boolean isAprovada() {
        return aprovada;
    }

    public void setAprovada(Boolean aprovada) {
        this.aprovada = aprovada;
    }

    public Boolean isArquivada() {
        return arquivada;
    }

    public void setArquivada() {
        this.arquivada = true;
    }

    public void setArquivada(Boolean arquivada) {
        this.arquivada = arquivada;
    }

    public LocalDate getArquivadaEm() {
        return arquivadaEm;
    }

    public void setArquivadaEm(LocalDate arquivadaEm) {
        this.arquivadaEm = arquivadaEm;
    }

    public List<Anexo> getAnexos() {
        return anexos;
    }

    public void setAnexos(List<Anexo> anexos) {
        this.anexos = anexos;
    }

    @Override
    public String toString() {
        return "Publicacao{" +
                "id='" + id + '\'' +
                ", titulo='" + titulo + '\'' +
                ", descricao='" + descricao + '\'' +
                ", dataCriacao=" + dataCriacao +
                ", tags=" + tags +
                ", tituloFormacao='" + tituloFormacao + '\'' +
                ", aprovada=" + aprovada +
                ", arquivada=" + arquivada +
                ", arquivadaEm=" + arquivadaEm +
                ", anexos=" + anexos +
                '}';
    }
}
