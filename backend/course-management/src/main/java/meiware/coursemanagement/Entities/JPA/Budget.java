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
    private int budget;
    @NotNull
    private int ano;

    public Budget() {

    }

    public Budget(Utilizador user, int budget, int ano) {
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
