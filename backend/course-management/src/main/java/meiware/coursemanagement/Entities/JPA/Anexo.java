package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
public class Anexo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotNull
    private String path; // Representa o id na base de dados MongoDB

    @NotNull
    private String tipo;

    public Anexo() {

    }

    public Anexo(String path, String tipo) {
        this.path = path;
        this.tipo = tipo;
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

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString() {
        return "Anexo{" +
                "id=" + id +
                ", path='" + path + '\'' +
                '}';
    }
}
