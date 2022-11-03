package meiware.coursemanagement.JPA;

import com.sun.istack.NotNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.DiscriminatorValue;
import java.time.LocalDate;
import java.util.Date;

@Entity
@DiscriminatorValue("APROVADA")
public class FormacaoAprovada extends PedidoFormacao{
    @NotNull
    @Column(columnDefinition = "DATE")
    private LocalDate dataAprovacao;
    @Column(columnDefinition = "DATE")
    private LocalDate dataConclusao;
    private boolean concluida;

    public FormacaoAprovada(){

    }

    public FormacaoAprovada(String nome, String descricao, String formador, LocalDate dataInicio, float preco, LocalDate dataAprovacao){
        super(nome, descricao, formador, dataInicio, preco);
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
}
