package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo")
public class PedidoFormacao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    private String nome;

    @NotNull
    private String descricao;

    @NotNull
    private String formador;

    @NotNull
    @Column(columnDefinition = "DATE")
    private LocalDate dataInicio;

    @NotNull
    @Column(columnDefinition = "DATE")
    private LocalDate dataFim;

    @NotNull
    private float preco;

    private String justificao;

    private boolean status;

    private boolean cancelada;

    private boolean apagada;

    @Column(columnDefinition = "DATE")
    private LocalDate apagadaNaData;

    @Column(columnDefinition = "DATE")
    private LocalDate dataCriacao;

    @Column(columnDefinition = "DATE")
    private LocalDate dataUltimoUpdate;

    @OneToMany(mappedBy = "id")
    private List<AnexoRef> listAnexoRefs;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    Utilizador quemFezPedido;

    public PedidoFormacao() {

    }

    public PedidoFormacao(String nome, String descricao, String formador, LocalDate dataInicio, float preco) {
        this.nome = nome;
        this.descricao = descricao;
        this.formador = formador;
        this.dataInicio = dataInicio;
        this.preco = preco;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getFormador() {
        return formador;
    }

    public void setFormador(String formador) {
        this.formador = formador;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public float getPreco() {
        return preco;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }

    public String getJustificao() {
        return justificao;
    }

    public void setJustificao(String justificao) {
        this.justificao = justificao;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean isCancelada() {
        return cancelada;
    }

    public void setCancelada(boolean cancelada) {
        this.cancelada = cancelada;
    }

    public Utilizador getQuemFezPedido() {
        return quemFezPedido;
    }

    public void setQuemFezPedido(Utilizador quemFezPedido) {
        this.quemFezPedido = quemFezPedido;
    }

    public boolean isApagada() {
        return apagada;
    }

    public void setApagada(boolean apagada) {
        this.apagada = apagada;
    }

    public LocalDate getApagadaNaData() {
        return apagadaNaData;
    }

    public void setApagadaNaData(LocalDate apagadaNaData) {
        this.apagadaNaData = apagadaNaData;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public LocalDate getDataUltimoUpdate() {
        return dataUltimoUpdate;
    }

    public void setDataUltimoUpdate(LocalDate dataUltimoUpdate) {
        this.dataUltimoUpdate = dataUltimoUpdate;
    }

    public List<AnexoRef> getListAnexoRefs() {
        return listAnexoRefs;
    }

    public void setListAnexoRefs(List<AnexoRef> listAnexoRefs) {
        this.listAnexoRefs = listAnexoRefs;
    }

    @Override
    public String toString() {
        return "PedidoFormacao{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", formador='" + formador + '\'' +
                ", dataInicio=" + dataInicio +
                ", dataFim=" + dataFim +
                ", preco=" + preco +
                ", justificao='" + justificao + '\'' +
                ", status=" + status +
                ", cancelada=" + cancelada +
                ", apagada=" + apagada +
                ", apagadaNaData=" + apagadaNaData +
                ", dataCriacao=" + dataCriacao +
                ", dataUltimoUpdate=" + dataUltimoUpdate +
                ", listAnexoRef=" + listAnexoRefs +
                '}';
    }
}
