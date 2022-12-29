package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    private boolean apagada = false;

    @Column(columnDefinition = "DATE")
    private LocalDate apagadaNaData;

    @Column(columnDefinition = "DATE")
    private LocalDate dataCriacao;

    @Column(columnDefinition = "DATE")
    private LocalDate dataUltimoUpdate;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<AnexoRef> listAnexoRefs = new HashSet<>();

    @ManyToOne(optional = false)
    private Utilizador quemFezPedido;

    public PedidoFormacao() {

    }

    public PedidoFormacao(long id) {
        this.id = id;
    }

    public PedidoFormacao(String nome, String descricao, String formador, LocalDate dataInicio, float preco, Utilizador quemFezPedido) {
        this.nome = nome;
        this.descricao = descricao;
        this.formador = formador;
        this.dataInicio = dataInicio;
        this.preco = preco;
        this.dataCriacao = LocalDate.now();
        this.quemFezPedido = quemFezPedido;
    }

    public PedidoFormacao(long id, String nome, String descricao, String formador, LocalDate dataInicio, float preco, Utilizador quemFezPedido) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.formador = formador;
        this.dataInicio = dataInicio;
        this.preco = preco;
        this.dataCriacao = LocalDate.now();
        this.quemFezPedido = quemFezPedido;
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

    public Set<AnexoRef> getListAnexoRefs() {
        return listAnexoRefs;
    }

    public void setListAnexoRefs(Set<AnexoRef> listAnexoRefs) {
        this.listAnexoRefs = listAnexoRefs;
    }

    public void addAnexoRef(AnexoRef anexoRef) {
        this.getListAnexoRefs().add(anexoRef);
    }

    public void removeAnexoRef(AnexoRef anexoRef) {
        this.getListAnexoRefs().remove(anexoRef);
    }

    public JSONObject toJSON(){
        JSONObject obj = new JSONObject();
        obj.put("id", id);
        obj.put("nome", nome);
        obj.put("descricao", descricao);
        obj.put("formador", formador);
        obj.put("dataInicio", dataInicio);
        obj.put("dataFim", dataFim);
        obj.put("preco", preco);
        obj.put("justificao", justificao);
        obj.put("status", status);
        obj.put("cancelada", cancelada);
        obj.put("apagada", apagada);
        obj.put("apagadaNaData", apagadaNaData);
        obj.put("dataCriacao", dataCriacao);
        obj.put("dataUltimoUpdate", dataUltimoUpdate);
        obj.put("listAnexoRef", listAnexoRefs);
        obj.put("quemFezPedido", quemFezPedido.getId());

        return obj;
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
