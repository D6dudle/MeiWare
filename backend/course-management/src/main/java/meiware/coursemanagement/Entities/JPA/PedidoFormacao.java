package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.json.JSONObject;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo")
@DiscriminatorValue("PedidoFormacao")
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
    private Float preco;

    private String justificacao;

    private Boolean status = false;

    private Boolean cancelada = false;

    private Boolean apagada = false;

    @Column(columnDefinition = "DATE")
    private LocalDate apagadaNaData;

    @Column(columnDefinition = "DATE")
    private LocalDate dataCriacao;

    @Column(columnDefinition = "DATE")
    private LocalDate dataUltimoUpdate;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<AnexoRef> listAnexoRefs;

    @ManyToOne(optional = false)
    private Utilizador quemFezPedido;

    @ManyToMany
    private Set<Utilizador> formandos;

    public PedidoFormacao() {
    }

    public PedidoFormacao(Long id) {
        this.id = id;
    }

    public PedidoFormacao(String nome, String descricao, String formador, LocalDate dataInicio, Float preco, Utilizador quemFezPedido) {
        this.nome = nome;
        this.descricao = descricao;
        this.formador = formador;
        this.dataInicio = dataInicio;
        this.preco = preco;
        this.dataCriacao = LocalDate.now();
        this.quemFezPedido = quemFezPedido;
    }

    public PedidoFormacao(Long id, String nome, String descricao, String formador, LocalDate dataInicio, Float preco, Utilizador quemFezPedido) {
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

    public Float getPreco() {
        return preco;
    }

    public void setPreco(Float preco) {
        this.preco = preco;
    }

    public String getJustificacao() {
        return justificacao;
    }

    public void setJustificacao(String justificacao) {
        this.justificacao = justificacao;
    }

    public Boolean isStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Boolean isCancelada() {
        return cancelada;
    }

    public void setCancelada(Boolean cancelada) {
        this.cancelada = cancelada;
    }

    public Utilizador getQuemFezPedido() {
        return quemFezPedido;
    }

    public void setQuemFezPedido(Utilizador quemFezPedido) {
        this.quemFezPedido = quemFezPedido;
    }

    public Boolean isApagada() {
        return apagada;
    }

    public void setApagada(Boolean apagada) {
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

    public void addAnexoRef(List<AnexoRef> anexoRefs) {
        for (AnexoRef a: anexoRefs) {
            this.getListAnexoRefs().add(a);
        }
    }

    public void removeAnexoRef(AnexoRef anexoRef) {
        this.getListAnexoRefs().remove(anexoRef);
    }

    public Set<Utilizador> getFormandos() {
        return formandos;
    }

    public void setFormandos(Set<Utilizador> formandos) {
        this.formandos = formandos;
    }

    public void addFormando(Utilizador utilizador) {
        if(this.formandos == null)
            this.formandos = new HashSet<>();
        this.formandos.add(utilizador);
    }

    public void remFormando(Utilizador utilizador) {
        if(this.formandos == null)
            this.formandos = new HashSet<>();
        this.formandos.remove(utilizador);
    }

    public JSONObject toJSON(){
        JSONObject obj = new JSONObject();
        obj.put("idCurso", id);
        obj.put("nomeFormacao", nome);
        obj.put("descricao", descricao);
        obj.put("formador", formador);
        obj.put("dataFormacao", dataInicio);
        obj.put("dataFim", dataFim);
        obj.put("preco", preco);
        obj.put("justificacaoFormacao", justificacao);
        obj.put("status", status);
        obj.put("cancelada", cancelada);
        obj.put("apagada", apagada);
        obj.put("apagadaNaData", apagadaNaData);
        obj.put("dataCriacao", dataCriacao);
        obj.put("dataUltimoUpdate", dataUltimoUpdate);
        obj.put("listAnexoRef", listAnexoRefs);
        obj.put("quemFezPedidoId", quemFezPedido.getId());
        obj.put("quemFezPedidoNome", quemFezPedido.getNome());
        return obj;
    }


    public JSONObject toJSONEquipa(String nomeFormando){
        JSONObject obj = new JSONObject();
        obj.put("idCurso", id);
        obj.put("nomeFormacao", nome);
        obj.put("descricao", descricao);
        obj.put("formador", formador);
        obj.put("dataFormacao", dataInicio);
        obj.put("dataFim", dataFim);
        obj.put("preco", preco);
        obj.put("justificacaoFormacao", justificacao);
        obj.put("status", status);
        obj.put("cancelada", cancelada);
        obj.put("apagada", apagada);
        obj.put("apagadaNaData", apagadaNaData);
        obj.put("dataCriacao", dataCriacao);
        obj.put("dataUltimoUpdate", dataUltimoUpdate);
        obj.put("listAnexoRef", listAnexoRefs);
        obj.put("quemFezPedidoId", quemFezPedido.getId());
        obj.put("quemFezPedidoNome", quemFezPedido.getNome());
        obj.put("username", nomeFormando);
        return obj;
    }


    @Transient
    public String getDiscriminatorValue(){
        DiscriminatorValue val = this.getClass().getAnnotation( DiscriminatorValue.class );

        return val == null ? null : val.value();
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
                ", justificao='" + justificacao + '\'' +
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
