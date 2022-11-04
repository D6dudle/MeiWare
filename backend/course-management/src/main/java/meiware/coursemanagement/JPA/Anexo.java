package meiware.coursemanagement.JPA;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;

@Entity
public class Anexo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotNull
    private String path;

    public Anexo() {

    }

    public Anexo(String path) {
        this.path = path;
    }

    public Long getId() {
        return id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "Anexo{" +
                "id=" + id +
                ", path='" + path + '\'' +
                '}';
    }
}
