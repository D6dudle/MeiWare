package meiware.coursemanagement.JPA;

import com.sun.istack.NotNull;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("REJEITADA")
public class FormacaoRejeitada extends PedidoFormacao{
    @NotNull
    @Column(columnDefinition = "DATE")
    private LocalDate dataRejeicao;
    private String comentario;

    public FormacaoRejeitada(){

    }

    public FormacaoRejeitada(String nome, String descricao, String formador, LocalDate dataInicio, float preco, LocalDate dataRejeicao){
        super(nome, descricao, formador, dataInicio, preco);
        this.dataRejeicao = dataRejeicao;
    }

}
