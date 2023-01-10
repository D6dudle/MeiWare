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
    private Boolean concluida;

    @ManyToOne
    private Utilizador quemAprovou;

    public PedidoAprovado(){

    }

    public PedidoAprovado(Long id, String nome, String descricao, String formador, LocalDate dataInicio, Float preco, Utilizador quemFezPedido, LocalDate dataAprovacao){
        super(id, nome, descricao, formador, dataInicio, preco, quemFezPedido);
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

    public Boolean isConcluida() {
        return concluida;
    }

    public void setConcluida(Boolean concluida) {
        this.concluida = concluida;
    }

    public Utilizador getQuemAprovou() {
        return quemAprovou;
    }

    public void setQuemAprovou(Utilizador quemAprovou) {
        this.quemAprovou = quemAprovou;
    }
}
