package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@DiscriminatorValue("APROVADA")
public class PedidoAprovado extends PedidoFormacao{
    @NotNull
    @Column(columnDefinition = "DATE")
    private LocalDate dataAprovacao;
    @Column(columnDefinition = "DATE")
    private LocalDate dataConclusao;
    private boolean concluida;

    @ManyToOne
    private Utilizador quemAprovou;

    @ManyToMany
    private Set<Utilizador> formandos;

    public PedidoAprovado(){

    }

    public PedidoAprovado(String nome, String descricao, String formador, LocalDate dataInicio, Utilizador quemFezPedido, float preco, LocalDate dataAprovacao){
        super(nome, descricao, formador, dataInicio, preco, quemFezPedido);
        this.dataAprovacao = dataAprovacao;
    }

    public LocalDate getDataAprovacao() {
        return dataAprovacao;
    }

    public void setDataAprovacao(LocalDate dataAprovacao) {
        dataAprovacao = dataAprovacao;
    }

    public LocalDate getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(LocalDate dataConclusao) {
        dataConclusao = dataConclusao;
    }

    public boolean isConcluida() {
        return concluida;
    }

    public void setConcluida(boolean concluida) {
        this.concluida = concluida;
    }

    public Utilizador getQuemAprovou() {
        return quemAprovou;
    }

    public void setQuemAprovou(Utilizador quemAprovou) {
        this.quemAprovou = quemAprovou;
    }

    public Set<Utilizador> getFormandos() {
        return formandos;
    }

    public void setFormandos(Set<Utilizador> formandos) {
        this.formandos = formandos;
    }
}
