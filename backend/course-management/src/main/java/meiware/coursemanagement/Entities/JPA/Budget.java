package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;
import org.json.JSONObject;

import javax.persistence.*;

@Entity
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    private Utilizador user;
    @NotNull
    private Integer budget;
    @NotNull
    private Integer ano;

    public Budget() {

    }

    public Budget(Utilizador user, Integer budget, Integer ano) {
        this.user = user;
        this.budget = budget;
        this.ano = ano;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utilizador getUser() {
        return user;
    }

    public void setUser(Utilizador user) {
        this.user = user;
    }

    public Integer getBudget() {
        return budget;
    }

    public void setBudget(Integer budget) {
        this.budget = budget;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public JSONObject toJSON(){
        JSONObject obj = new JSONObject();
        obj.put("id", id);
        obj.put("user", user.getId());
        obj.put("budget", budget);
        obj.put("year", ano);
        return obj;
    }

    @Override
    public String toString() {
        return "Budget{" +
                "id=" + id +
                ", user_id=" + user.getId() +
                ", budget=" + budget +
                ", ano=" + ano +
                '}';
    }
}
