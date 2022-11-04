package meiware.coursemanagement.JPA;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotNull
    private int budget;
    @NotNull
    private int ano;

    public Budget() {

    }

    public Long getId() {
        return id;
    }

    public int getBudget() {
        return budget;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }
}
