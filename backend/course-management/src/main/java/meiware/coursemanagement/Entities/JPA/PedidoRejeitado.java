package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("REJEITADA")
public class PedidoRejeitado extends PedidoFormacao{
    @NotNull
    @Column(columnDefinition = "DATE")
    private LocalDate dataRejeicao;

    private String comentario;

    @ManyToOne
    private Utilizador quemRejeitou;

    public PedidoRejeitado(){

    }

    public PedidoRejeitado(long id, String nome, String descricao, String formador, LocalDate dataInicio, float preco, Utilizador quemFezPedido, LocalDate dataRejeicao){
        super(id, nome, descricao, formador, dataInicio, preco, quemFezPedido);
        this.dataRejeicao = dataRejeicao;
    }

    public LocalDate getDataRejeicao() {
        return dataRejeicao;
    }

    public void setDataRejeicao(LocalDate dataRejeicao) {
        this.dataRejeicao = dataRejeicao;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Utilizador getQuemRejeitou() {
        return quemRejeitou;
    }

    public void setQuemRejeitou(Utilizador quemRejeitou) {
        this.quemRejeitou = quemRejeitou;
    }
}
